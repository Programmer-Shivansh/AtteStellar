import React from 'react';
import { Box, Flex, Heading, Link, Spacer, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('cyan.500', 'teal.300'); // Neon color for text
  const hoverColor = useColorModeValue('cyan.700', 'teal.500'); // Hover effect color

  return (
    <Box bg={bgColor} px={4} py={2} shadow="md">
      <Flex align="center" maxW="container.xl" mx="auto">
        <Heading size="lg" color={textColor} ml={4} _hover={{ color: hoverColor }}>
          ATTESTELLAR
        </Heading>
        <Spacer />
        <Link
          as={RouterLink}
          to="/"
          mx={4}
          fontSize="lg"
          fontWeight="bold"
          color={textColor}
          _hover={{ color: hoverColor }}
        >
          Home
        </Link>
        <Link
          as={RouterLink}
          to="/schema"
          mx={4}
          fontSize="lg"
          fontWeight="bold"
          color={textColor}
          _hover={{ color: hoverColor }}
        >
          Schema
        </Link>
        <Link
          as={RouterLink}
          to="/contact-us"
          mx={4}
          fontSize="lg"
          fontWeight="bold"
          color={textColor}
          _hover={{ color: hoverColor }}
        >
          Contact Us
        </Link>
        <Button onClick={toggleColorMode} ml={4} variant="outline" color={textColor} _hover={{ borderColor: hoverColor, color: hoverColor }}>
          {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
