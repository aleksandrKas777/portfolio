import './assets/styles/app.css';
import {RouterProvider} from "react-router-dom";
import {Router} from "./router/Router";
import {Layout} from "./layout/Layout";


export const App = () => {
  return (
      <Layout>
        <RouterProvider router={Router}/>
      </Layout>
  )
}
