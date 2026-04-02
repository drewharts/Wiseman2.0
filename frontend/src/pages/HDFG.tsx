import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HDFG = () => {
    const navigate = useNavigate();

    return (
        <Box
            minH="100vh"
            bg="black"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            p={8}
        >
            <VStack spacing={6}>
                <Heading fontSize="6xl" fontFamily="monospace" letterSpacing="widest">
                    HDFG
                </Heading>
                <Text fontSize="2xl" fontStyle="italic">
                    A Cult of High Agency
                </Text>
                <Text
                    fontSize="sm"
                    cursor="pointer"
                    opacity={0.5}
                    _hover={{ opacity: 1 }}
                    onClick={() => navigate('/')}
                >
                    &larr; back
                </Text>
            </VStack>
        </Box>
    );
};

export default HDFG;
