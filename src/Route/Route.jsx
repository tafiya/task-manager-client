import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../page/home/Home";
import ErrorPage from "../page/ErrorPage/ErrorPage";

import Login from "../page/login/Login";
import Signup from "../page/Signup/Signup";
import Create from "../page/create/Create";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
       {
        path:'login',
        element:<Login></Login>
       },
       {
        path:'signup',
        element:<Signup></Signup>
       },
        {
          path:'create',
          element:<Create></Create>
        },
      
      ]
    },
    
  ]);