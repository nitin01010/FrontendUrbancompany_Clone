import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from 'react-router-dom';
import { appRoutes } from './routes/appRoutes';
import './style/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRoutes} />
  <ToastContainer />
  </StrictMode>,
)
