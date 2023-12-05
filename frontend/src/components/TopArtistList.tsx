import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArtistResponse } from '../models/ArtistResponse';

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
    <div>
      {data?.items.map(artist => (
        <div key={artist.id}>
          <h2>{artist.name}</h2>
          {/* Other artist details */}
        </div>
      ))}
    </div>
  );
};

export default ArtistList;
