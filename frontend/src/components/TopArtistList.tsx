import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArtistResponse } from '../models/ArtistResponse';
import { Box, Text, Image, SimpleGrid, Link, HStack } from '@chakra-ui/react';

const ArtistList = () => {
  const [data, setData] = useState<ArtistResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ArtistResponse>('http://ec2-54-196-229-34.compute-1.amazonaws.com:3000/my-top-artists');
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <SimpleGrid columns={2} spacing={10}>
      {data?.items.map(artist => (
        <HStack key={artist.id} p={3} borderBottom="1px" borderColor="gray.200">
          {artist.images && artist.images.length > 0 && (
            <Image
              borderRadius="full"
              boxSize="50px"
              src={artist.images[0].url}
              alt={artist.name}
            />
          )}
          <Box flex="1">
            <Link href={artist.spotifyUrl} isExternal>
              <Text fontWeight="bold">{artist.name}</Text>
            </Link>
            {/* Include other artist details here */}
          </Box>
        </HStack>
      ))}
    </SimpleGrid>
  );
};

export default ArtistList;
