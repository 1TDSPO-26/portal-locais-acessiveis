import { createBrowserRouter } from "react-router-dom"
import App from '../App'
import Home from '../pages/Home/Home'
import Locais from '../pages/Locais/Locais'
import Cadastro from '../pages/Cadastro/Cadastro'
import Sobre from '../pages/Sobre/Sobre'

export const route = createBrowserRouter([
    {path: "/", element : <App/>,
        children:[
            { index: true, element: <Home/> },
            { path: "locais", element: <Locais/> },
            { path: "cadastrar", element: <Cadastro/> },
            { path: "sobre", element: <Sobre/> },
        ]
    }
])