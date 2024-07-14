import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Flex,
  Box,
  Button,
  Heading,
  Text,
  List,
  ListItem,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { viewIPFSData } from './call_schemaUID';
import { openModal } from './ConnectBlockchain';
import AttestModal from './AttestModal';
import FileUploadModal from './fileUpload';

const SchemaDetail = () => {
  const { id } = useParams();
  const [schema, setSchema] = useState(null);
  const [attestationCount, setAttestationCount] = useState(0);
  const [offChainAttestationCount, setOffChainAttestationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSchema, setNewSchema] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [isSelectModeOpen, setIsSelectModeOpen] = useState(false);
  const toast = useToast();
  // const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const schemaResponse = await axios.get(`https://atte-stellar-hv1fgowwyh-programmer-shivanshs-projects.vercel.app/data/${id}`);
        setSchema(schemaResponse.data);

        // const attestationResponse = await axios.get(`http://localhost:5003/attestations/${schemaResponse.data.schemaUID}`);
        // setAttestationCount(attestationResponse.data.length || 0);

        // Fetch off-chain attestation count (dummy endpoint for example)
        setOffChainAttestationCount(0);

        setLoading(false);
      } catch (err) {
        console.error('Fetch schema error:', err);
        setError('Unable to fetch schema details.');
        setLoading(false);
      }
    };

    fetchSchema();
  }, [id]);

  const handleAttest = () => {
    setIsSelectModeOpen(true);
  };

  const handleSelectOnChain = async () => {
    setIsSelectModeOpen(false);
    try {
      const fetchedSchema = await viewIPFSData(schema.schemaUID);
      if (Array.isArray(fetchedSchema) && fetchedSchema.length > 0) {
        setNewSchema(fetchedSchema);
        setIsModalOpen(true);
      } else {
        toast({
          title: 'No fields available in the fetched schema.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Error during attestation',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSelectOffChain = () => {
    setIsSelectModeOpen(false);
    setIsFileUploadOpen(true);
  };

  const handleFileUpload = async (file) => {
    // Handle file upload logic here
    // Implement the file sharing or uploading logic

    try {
      // Example: sending file to backend
      await axios.post('https://atte-stellar-hv1fgowwyh-programmer-shivanshs-projects.vercel.app/upload', { file });

      // Increment off-chain attestation count
      setOffChainAttestationCount(offChainAttestationCount + 1);
      setIsFileUploadOpen(false);
    } catch (err) {
      toast({
        title: 'File upload error',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewSchema(null);
  };

  const handleModalSubmit = async (fields) => {
    const arr = Object.entries(fields);
    await openModal(schema.schemaUID, arr);

    // Increment on-chain attestation count
    setAttestationCount(attestationCount + 1);

    handleModalClose();
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      {error}
    </Alert>
  );

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.900"
      p={5}
    >
      <Container maxW="container.lg">
        <Box
          bg="gray.800"
          color="white"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          maxW="600px"
          width="100%"
        >
          <Heading mb={4} textAlign="center">Schema Details</Heading>
          {schema ? (
            <Box>
              <Box mb={2}>
                <Text><strong>Schema UID:</strong> {schema.schemaUID}</Text>
              </Box>
              <Box mb={2}>
                <Text><strong>Document ID:</strong> {schema._id}</Text>
              </Box>
              <Box mb={2}>
                <Text><strong>Timestamp:</strong> {new Date(schema.timestamp).toLocaleString()}</Text>
              </Box>
              <Stack spacing={3} mb={4} textAlign="center">
                <Link to={`/attestations/${schema.schemaUID}`} style={{ textDecoration: 'none' }}>
                  <Text
                    as="span"
                    fontWeight="bold"
                    cursor="pointer"
                    _hover={{ textDecoration: 'underline', color: 'teal.300' }}
                    color="teal.400"
                  >
                    <strong>Number of On-Chain Attestations: </strong>{attestationCount}
                  </Text>
                </Link>
                <Link to={`/off-chain-attestations/${schema.schemaUID}`} style={{ textDecoration: 'none' }}>
                  <Text
                    as="span"
                    fontWeight="bold"
                    cursor="pointer"
                    _hover={{ textDecoration: 'underline', color: 'teal.300' }}
                    color="teal.400"
                  >
                    <strong>Number of Off-Chain Attestations: </strong>{offChainAttestationCount}
                  </Text>
                </Link>
              </Stack>
              <Box mb={4}>
                <Text><strong>Fields:</strong></Text>
                {schema.fields && schema.fields.length > 0 ? (
                  <List spacing={2}>
                    {schema.fields.map((field, index) => (
                      <ListItem key={index}>
                        <Text><strong>Field:</strong> {field.field}, <strong>Type:</strong> {field.type}</Text>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Text>No fields available</Text>
                )}
              </Box>
              <Button 
                colorScheme="teal" 
                size="lg" 
                onClick={handleAttest} 
                width="full"
                _hover={{ bg: 'teal.400' }}
                _active={{ bg: 'teal.500' }}
              >
                Attest
              </Button>
            </Box>
          ) : (
            <Text>No schema found</Text>
          )}
          {isModalOpen && (
            <AttestModal
              newSchema={newSchema}
              onClose={handleModalClose}
              onSubmit={handleModalSubmit}
            />
          )}
          {isFileUploadOpen && (
            <FileUploadModal
              onClose={() => setIsFileUploadOpen(false)}
              onFileUpload={handleFileUpload}
            />
          )}
          {isSelectModeOpen && (
            <Box
              bg="gray.800"
              color="white"
              p={8}
              borderRadius="md"
              boxShadow="lg"
              maxW="600px"
              width="100%"
              textAlign="center"
            >
              <Heading mb={4}>Select Attestation Mode</Heading>
              <Stack spacing={4} direction="column" align="center">
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={handleSelectOnChain}
                  width="full"
                  _hover={{ bg: 'blue.400' }}
                  _active={{ bg: 'blue.500' }}
                >
                  On-Chain Attestation
                </Button>
                <Button
                  colorScheme="purple"
                  size="lg"
                  onClick={handleSelectOffChain}
                  width="full"
                  _hover={{ bg: 'purple.400' }}
                  _active={{ bg: 'purple.500' }}
                >
                  Off-Chain Attestation
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Container>
    </Flex>
  );
};

export default SchemaDetail;
