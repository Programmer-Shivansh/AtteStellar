import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  Text,
  useToast,
} from '@chakra-ui/react';

const AttestModal = ({ newSchema, onClose, onSubmit }) => {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateInput = (value, type) => {
    switch (type) {
      case "Bool":
        return value === "true" || value === "false";
      case "Symbol (32 char)":
        return /^[a-zA-Z0-9_]{1,32}$/.test(value);
      case "32-bit Integers (signed)":
        return /^-?\d{1,10}$/.test(value);
      case "32-bit Integers (unsigned)":
        return /^\d{1,10}$/.test(value);
      case "64-bit Integers (signed)":
        return /^-?\d{1,19}$/.test(value);
      case "64-bit Integers (unsigned)":
        return /^\d{1,19}$/.test(value);
      case "128-bit Integers (signed)":
        return /^-?\d{1,38}$/.test(value);
      case "128-bit Integers (unsigned)":
        return /^\d{1,38}$/.test(value);
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    const newErrors = {};

    newSchema.forEach((field) => {
      const value = fields[field.field] || '';
      if (!value.trim()) {
        newErrors[field.field] = 'This field is required.';
      } else if (!validateInput(value, field.type)) {
        newErrors[field.field] = `Invalid input for type ${field.type}.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(fields);
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader>Attest Schema</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {newSchema && newSchema.length > 0 ? (
            newSchema.map((field, index) => (
              <Box key={index} mb={4}>
                <FormControl isInvalid={errors[field.field]}>
                  <FormLabel>{field.field} ({field.type})</FormLabel>
                  {field.type === "Bool" ? (
                    <Select
                      name={field.field}
                      value={fields[field.field] || ''}
                      onChange={handleChange}
                      placeholder="Select true or false"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </Select>
                  ) : (
                    <Input
                      type="text"
                      name={field.field}
                      value={fields[field.field] || ''}
                      onChange={handleChange}
                    />
                  )}
                  {errors[field.field] && (
                    <Text mt={2} color="red.500">{errors[field.field]}</Text>
                  )}
                </FormControl>
              </Box>
            ))
          ) : (
            <Text>No fields available</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AttestModal;
