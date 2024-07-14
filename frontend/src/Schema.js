import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Spinner,
  Alert,
  AlertIcon,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import './background.css'; // Ensure this imports your CSS with the background image class

const Schema = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://atte-stellar-hv1fgowwyh-programmer-shivanshs-projects.vercel.app/data');
        const sortedData = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setData(sortedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Unable to fetch schema data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cardBgColor = useColorModeValue('gray.700', 'gray.600'); // Card background color
  const textColor = useColorModeValue('gray.300', 'gray.200'); // Default text color
  const neonColor = useColorModeValue('cyan.300', 'teal.300'); // Neon color for schemaUID
  const hoverBgColor = useColorModeValue('gray.600', 'gray.500'); // Hover background color

  if (loading) return <Spinner size="xl" color={neonColor} />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      {error}
    </Alert>
  );

  return (
    <Container maxW="container.xl" p={5} className="background-container">
      <Heading as="h1" mb={6} textAlign="center" color={neonColor}>
        Schema Data
      </Heading>
      <Box
        bg={cardBgColor}
        color={textColor}
        p={6}
        borderRadius="md"
        boxShadow="lg"
      >
        {data.length > 0 ? (
          data.map((item) => (
            <Box
              key={item._id}
              bg={cardBgColor}
              p={4}
              borderRadius="md"
              mb={4}
              boxShadow="md"
              transition="background-color 0.3s ease"
              _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
            >
              <Link to={`/schema/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box mb={4}>
                  <Heading as="h2" size="md" _hover={{ color: neonColor }}>
                    Schema UID: <Text as="span" color={neonColor}>{item.schemaUID}</Text>
                  </Heading>
                  <Text fontSize="sm" color="gray.400">
                    Document ID: {item._id}
                  </Text>
                </Box>
                <Stack spacing={3}>
                  <Box>
                    <Text fontWeight="bold" color={neonColor}>Fields:</Text>
                    {item.fields && item.fields.length > 0 ? (
                      <List spacing={2}>
                        {item.fields.map((field, index) => (
                          <ListItem key={index}>
                            <Text color={textColor}>
                              <strong>Field:</strong> {field.field}, <strong>Type:</strong> {field.type}
                            </Text>
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Text color={textColor}>No fields available</Text>
                    )}
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color={neonColor}>Description:</Text>
                    <Text color={textColor}>{item.description || 'No description provided'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color={neonColor}>Timestamp:</Text>
                    <Text color={textColor}>{new Date(item.timestamp).toLocaleString()}</Text>
                  </Box>
                </Stack>
              </Link>
            </Box>
          ))
        ) : (
          <Text color={textColor}>No data available</Text>
        )}
      </Box>
    </Container>
  );
};

export default Schema;
