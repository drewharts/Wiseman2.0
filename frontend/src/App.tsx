import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Social from './pages/Social';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path ='/' element={<Homepage /> } />
          <Route path='/social' element={<Social />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;