import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SimpleGrid,
  useToast,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';

const AttestationsDetail = () => {
  const { schemaUID } = useParams(); // Retrieve schemaUID from the URL
  const [attestations, setAttestations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const size = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' }); // Responsive text sizes

  useEffect(() => {
    const fetchAttestations = async () => {
      try {
        const response = await axios.get(`https://attestellar-backend-yzl9.onrender.com/attestations/${schemaUID}`);
        // console.log(response)
        if (response.status === 404) {
          setError('No data found for the given schemaUID');
        } else {
          setAttestations(response.data);
        }
        setLoading(false);
      } catch (err) {
        setError('No Attestations found for the given schemaUID');
        setLoading(false);
      }
    };

    fetchAttestations();
  }, [schemaUID]);

  if (loading) return <Spinner color="teal.300" size="xl" />;
  if (error) return (
    <Alert status="error" mt={6}>
      <AlertIcon />
      <Box>
        <AlertTitle>Error:</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Box>
    </Alert>
  );

  return (
    <Container maxW="container.xl" mt={8} p={6} bg="gray.800" color="white" borderRadius="md" boxShadow="lg">
      <Heading as="h1" mb={6} textAlign="center" color="teal.200" fontSize={size === 'lg' ? '4xl' : '3xl'}>
        Attestations for Schema UID: {schemaUID}
      </Heading>
      <SimpleGrid columns={[1, null, 2]} spacing={6}>
        {attestations.map((attestation) => (
          <Box
            key={attestation._id}
            p={6}
            bg="gray.700"
            borderRadius="md"
            boxShadow="lg"
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            _hover={{
              transform: 'scale(1.02)',
              boxShadow: '2xl',
              cursor: 'pointer'
            }}
          >
            {Object.keys(attestation).map((header) => (
              <Box key={header} mb={4}>
                <Text as="strong" color="teal.100" fontSize="lg">{header}:</Text> 
                <Text as="span" fontSize="lg" color="whiteAlpha.800">
                  {String(attestation[header])}
                </Text>
              </Box>
            ))}
          </Box>
        ))}
      </SimpleGrid>
      <Box textAlign="center" mt={6}>
        <Button colorScheme="teal" size="lg" onClick={() => toast({ title: 'Refreshing data...', status: 'info' })}>
          Refresh
        </Button>
      </Box>
    </Container>
  );
};

export default AttestationsDetail;
