// SpotifyBox.tsx

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import TopArtistList from './TopArtistList';

const SpotifyBox = () => {
  return (
    <Box 
      position="absolute"
      top="300px" // Adjust positioning as needed
      left="200px"
      bg="whiteAlpha.800"
      p={4}
      borderRadius="md"
      boxShadow="md"
    >
      <Text fontSize="lg" fontWeight="bold">What I've Been Listening To</Text>
      <TopArtistList /> {/* Include the TopArtistList component */}
    </Box>
  );
};

export default SpotifyBox;
