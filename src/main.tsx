import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './App/store.tsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import ProductDetails from './Main/Components/ProductDetails.tsx'
import Maindisplay from './Maindisplay/Maindisplay.tsx'
import CardDetailsList from './Components/CardDetailsList.tsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
       <Route index element={<Maindisplay/>}/>
       <Route path='/:title' element={<ProductDetails/>}/>
       <Route path='CardDetailList' element={<CardDetailsList/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
