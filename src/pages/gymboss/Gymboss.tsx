import {useEffect, useState} from "react";
import {getDataGoogleSheet} from '../../api/gymboss.js'
import {IExercise, ITrain} from "./interfaces";
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
      exercise: index,
      result: item
    })).filter((item) => !(item.result === ''))
        .map(item => ({...item, result: parseTrain(item.result)}))
  }))
}

const getExercises = (arr: Array<string>) =>
    arr.slice(1).map((item, index) => ({id: index + 1, name: item}))


export const Gymboss = () => {

  // const [data, setData] = useState<Array<string>>([]);
  const [allExercises, setAllExercises] = useState<Array<IExercise>>([])
  const [trains, setTrains] = useState<Array<ITrain>>([])
  const [exercisesChart, setExercisesChart] = useState([])

  console.log(trains)
  console.log(exercisesChart)
  const getData = async () => {
    const result = await getDataGoogleSheet('2023!A1:ZZ')
    setAllExercises(getExercises(result.values[0]))
    setTrains(parseTrains(result.values.slice(1)))
  }


  useEffect(() => {
    getData()
  }, [])


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
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
              width={500}
              height={300}
              data={trains}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </>
  )
}