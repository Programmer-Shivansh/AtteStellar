import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useToast,
  Text
} from '@chakra-ui/react';

const FileUploadModal = ({ onClose, onFileUpload }) => {
  const [file, setFile] = useState(null);
  const toast = useToast();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      onFileUpload(file);
    } else {
      toast({
        title: 'No file selected',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload File for Off-Chain Attestation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="file"
            onChange={handleFileChange}
            mb={4}
          />
          {file && (
            <Text>Selected file: {file.name}</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleUpload}>
            Upload
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FileUploadModal;
