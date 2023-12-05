import { useEffect, useState } from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

// Define the structure of a GitHub repository as per your needs
interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  // Add any other relevant properties from the GitHub API
}

const GitHubProjectsBox = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const pinnedRepos = ['wiseman', 'Wiseman2.0', 'CoordinationEnergyML']; // Replace with your actual pinned repo names

  useEffect(() => {
    Promise.all(pinnedRepos.map(repoName =>
      fetch(`https://api.github.com/repos/drewharts/${repoName}`)
        .then(response => response.json())
        .then(data => {
          // Assuming 'data' is already in the shape of Repo, otherwise map it accordingly
          return data as Repo;
        })
    ))
    .then(reposData => {
      setRepos(reposData);
    })
    .catch(error => {
      console.error('Error fetching repos:', error);
    });
  }, []);  // Dependency array

  return (
    <Box>
      {repos.map(repo => (
        <Box key={repo.id} mb={4}>
          <Text fontWeight="bold">{repo.name}</Text>
          <Text>{repo.description}</Text>
          <Link href={repo.html_url} isExternal>
            View on GitHub
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default GitHubProjectsBox;
