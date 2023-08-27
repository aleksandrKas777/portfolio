import {useEffect, useState} from "react";
import {getDataGoogleSheet} from '../../api/gymboss.js'
import {IApproach, IExercise, IExerciseTrain, ITrain} from "./interfaces";
import Select from "react-select";
import {CartesianGrid, Legend, Line, ResponsiveContainer, XAxis, YAxis, LineChart, Tooltip} from "recharts";

const checkWeight = (str: string) => {

  if (str.slice(-1) === 'п') {
    return ({type: str.slice(-1), weight: +str.slice(0, -1)})
  }
  return ({type: str.slice(-2), weight: +str.slice(0, -2)})
}
const parseTrain = (trainString: string) => {

  return trainString.split('--').map(item => {
    const arr = item.split('/')

    return {...checkWeight(arr[0]), count: +arr[1].slice(0, -1)}
  })
}

const parseTrains = (arr: Array<Array<string>>) => {

  return arr.map((item: Array<string>) => ({
    date: item[0],
    train: item.slice(1).map((item: string, index: number) => ({
      exercise: index + 2,
      result: item
    })).filter((item) => !(item.result === ''))
        .map(item => ({...item, result: parseTrain(item.result)}))
  }))
}

const getExercises = (arr: Array<string>) =>
    arr.slice(1).map((item, index) => ({id: index + 2, name: item}))


export const Gymboss = () => {
  const colors = ['black', 'blue', 'red']
  // const [data, setData] = useState<Array<string>>([]);
  const [allExercises, setAllExercises] = useState<Array<IExercise>>([])
  const [trains, setTrains] = useState<Array<ITrain>>([])
  const [dataChart, setDataChart] = useState([])
  const [exercisesChart, setExercisesChart] = useState([])
  console.log(allExercises)
  // console.log(trains)
  // console.log(exercisesChart)
  const getData = async () => {
    const result = await getDataGoogleSheet('2023!A1:ZZ')
    setAllExercises(getExercises(result.values[0]))
    setTrains(parseTrains(result.values.slice(1)))
  }

  const getMaxResult = (arr: Array<IApproach>) => {
    // console.log(arr)
    let maxResult = 0

    arr.forEach(_item => {
      maxResult = Math.max(_item.type === 'кг' ? _item.weight : _item.weight * 5, maxResult)
    })

    return maxResult
  }

  const getTrainsForChart = (arr: Array<IExerciseTrain>) => {
    const obj = {}
    arr.forEach(item => {
      obj[`${item.exercise}-max`] = getMaxResult(item.result)
    })
    return obj
  }

  useEffect(() => {
    getData()
  }, [])
  // console.log(dataChart)
  useEffect(() => {
    if (exercisesChart.length > 0) {
      const res = trains.filter(item => {
        return item.train.some(_item => exercisesChart.includes(_item.exercise))
      })
      const result = res.map(item => ({date: item.date, ...getTrainsForChart(item.train)}))

      setDataChart(result)
    } else {
      setDataChart([])
    }
  }, [exercisesChart, trains])


  return (
      <>
        <h1>Gymboss</h1>
        <Select isMulti
                options={allExercises}
                onChange={(options) => {
                  setExercisesChart(options.map(item => item.id))
                }}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
        />
        <ResponsiveContainer className={'bg-white'} width="100%" aspect={2}>
          <LineChart
              width={500}
              height={300}
              data={dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date"/>
            <YAxis/>
            <Tooltip/>
            <Legend formatter={(value => allExercises[value.split('-')?.[0] - 2].name)}/>
            {exercisesChart.map((item, index) => {
              return (
                  <Line connectNulls={true} key={item} type="monotone" dataKey={`${item}-max`} stroke={colors[index]}
                        activeDot={{r: 8}}/>
              )
            })}

            {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
          </LineChart>
        </ResponsiveContainer>
      </>
  )
}