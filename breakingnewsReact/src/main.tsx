import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import { GlobalStyle } from './GlobalStyle';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.tsx';
import Home from './pages/Home/Home.tsx'; 
import { SearchNews } from './pages/Search/SearchNews.tsx';

const AppRouter = createBrowserRouter([{

    path: '/home',
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
}


]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle/>
    <RouterProvider router={AppRouter}/>
    <App />
  </StrictMode>,
)
