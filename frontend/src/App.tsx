import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
