import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import TopArtistList from './components/TopArtistList'
import Homepage from './pages/Homepage';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopArtistList />} />
          <Route path ='/home' element={<Homepage /> } />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;