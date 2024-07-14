import React, { useState } from 'react';
import { Container, Box, Heading, FormControl, FormLabel, Input, Textarea, Button, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, useToast } from '@chakra-ui/react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    try {
      // Replace with your API endpoint
      const result = await fetch('https://your-api-endpoint/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!result.ok) {
        throw new Error('Failed to send message');
      }

      const data = await result.json();
      setResponse(data);
      setError(null);
      setName('');
      setEmail('');
      setMessage('');

      toast({
        title: 'Message sent.',
        description: 'Your message has been sent successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setResponse(null);
      setError(err.message);

      toast({
        title: 'An error occurred.',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" mt={8} p={4} bg="gray.800" color="white" borderRadius="md">
      <Heading as="h1" mb={6} textAlign="center">
        Contact Us
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            bg="gray.700"
            borderColor="gray.600"
            color="white"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg="gray.700"
            borderColor="gray.600"
            color="white"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="message">Message</FormLabel>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            bg="gray.700"
            borderColor="gray.600"
            color="white"
          />
        </FormControl>
        <Stack spacing={4} mt={4}>
          <Button type="submit" colorScheme="teal">
            Send Message
          </Button>
        </Stack>
      </form>

      {error && (
        <Alert status="error" mt={6}>
          <AlertIcon />
          <Box>
            <AlertTitle>Error:</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
        </Alert>
      )}

      {response && (
        <Alert status="success" mt={6}>
          <AlertIcon />
          <Box>
            <AlertTitle>Success:</AlertTitle>
            <AlertDescription>{response.message}</AlertDescription>
          </Box>
        </Alert>
      )}
    </Container>
  );
};

export default ContactUs;
