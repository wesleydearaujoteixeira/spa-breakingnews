import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/FooterContainer';

function App() {
  return (
  
    <>
      <Outlet />
      <Footer/> 
    </>

  );
}

export default App
