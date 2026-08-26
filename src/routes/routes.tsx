import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App'


export const route = createBrowserRouter([
    {path: "/", element : <App/>,
        children:[
            
        ]
    }
])



