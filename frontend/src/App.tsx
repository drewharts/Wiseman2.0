import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path ='/' element={<Homepage /> } />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;