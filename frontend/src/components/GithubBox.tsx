import React, { useEffect, useState } from 'react';
import { Box, Text, Link } from '@chakra-ui/react'; // Import the Link component from Chakra UI

const GitHubProjectsBox = () => {
  const [repos, setRepos] = useState([]);
  const pinnedRepos = ['wiseman', 'Wiseman2.0','CoordinationEnergyML']; // Replace with your actual pinned repo names

  useEffect(() => {
    Promise.all(pinnedRepos.map(repoName =>
      fetch(`https://api.github.com/repos/drewharts/${repoName}`)
        .then(response => response.json())
    ))
    .then(setRepos)
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Box 
      position="absolute"
      top="200px"
      right="250px"
      w={["300px", "300px", "300px"]}  // Responsive width
      h="auto"                         // Height adjusts to content
      bg="whiteAlpha.800"
      p={4}
      borderRadius="md"
      boxShadow="md"
      overflowY="auto"
      maxH="400px"
    >
      <Text fontSize="lg" fontWeight="bold">GitHub Projects</Text>
      <Box mt={4}>
        {repos.map(repo => (
          <Box key={repo.id} mb={5}>
            <Link href={repo.html_url} isExternal>  {/* Add the Link component */}
              <Text fontWeight="bold" noOfLines={1}>{repo.name}</Text>
            </Link>
            <Text fontSize="sm" noOfLines={2}>{repo.description}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GitHubProjectsBox;
