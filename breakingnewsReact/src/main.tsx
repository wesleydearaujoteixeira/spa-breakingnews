import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import { GlobalStyle } from './GlobalStyle';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.tsx';
import Home from './pages/Home/Home.tsx'; 
import { SearchNews } from './pages/Search/SearchNews.tsx';
import { UseContextProvider } from '../src/contextAPI/ContextAPI.tsx';
import { Login } from './components/authenticate/Login.tsx';
import { Register } from './components/authenticate/Register.tsx';


const AppRouter = createBrowserRouter([{

    path: '/home',
    errorElement: <div> Something went wrong </div>,
    element: <Navbar/>,
    children: [
        {
          path: '/home',
          element: <Home/>,
        }
    ],   

},

{
  path: '/search',
  element:  <SearchNews/>,
},

{
  path: '/login',
  element: <Login/>,
  errorElement: <div> Something went wrong </div>,
},

{
  path: '/register',
  element: <Register/>,
}


]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UseContextProvider>
      <GlobalStyle/>
      <RouterProvider router={AppRouter}/>
      <App />
    </UseContextProvider>
  </StrictMode>,
)
