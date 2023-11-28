import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import TopArtistList from './components/TopArtistList'

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopArtistList />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;