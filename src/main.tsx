import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { route } from "./routes/routes"
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)


