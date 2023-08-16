import {Home} from '../../pages'
import {RouteObject} from "react-router-dom";
import {Gymboss} from "../../pages/gymboss/Gymboss";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home/> ,
  },
  {
    path: '/gymboss',
    element: <Gymboss/>,
  },
]