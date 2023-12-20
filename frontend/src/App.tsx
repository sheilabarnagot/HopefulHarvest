import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from "./Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
