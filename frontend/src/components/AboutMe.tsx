import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    VStack,
  } from "@chakra-ui/react";
  import React from "react";
  
  // Define the props interface
  interface AboutMeModalProps {
    isOpen: boolean;
    onClose: () => void; // Adjust this if your onClose function has a different signature
  }
  
  const AboutMeModal: React.FC<AboutMeModalProps> = ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="xl" fontWeight="bold" textAlign="center">
            About Drew
          </ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              {/* Your existing component content */}
            </VStack>
          </ModalBody>
          {/* ... rest of your component */}
        </ModalContent>
      </Modal>
    );
  };
  
  export default AboutMeModal;
  