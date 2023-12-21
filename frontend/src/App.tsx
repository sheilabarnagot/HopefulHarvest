import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from "./Footer";
import { useDisclosure } from '@chakra-ui/react';

function App() {
  const { onOpen } = useDisclosure();
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer onTermsClick={onOpen}/>
    </>
  );
}

export default App;
