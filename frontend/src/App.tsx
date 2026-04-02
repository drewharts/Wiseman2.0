import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import HDFG from './pages/HDFG';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path ='/' element={<Homepage /> } />
          <Route path='/hdfg' element={<HDFG />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;