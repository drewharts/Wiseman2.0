import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
  Text,
  VStack,
  Box,
  Link // Import the Link component
} from "@chakra-ui/react";

interface AboutMeModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const AboutMeModal = ({ isOpen, onClose }: AboutMeModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="xl" fontWeight="bold" textAlign="center">About Drew</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <Box borderRadius="lg" overflow="hidden">
              <Image src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/AboutMePhoto.JPG" alt="Drew Hartsfield" />
            </Box>
            <Text fontSize="md">
              I'm currently a senior studying Computer Science at BYU. I am also pursuing minors in Spanish and Business. 
              I skate, mostly transition which means anything that slopes. I absolutely love to cook. 
              Lately I've been especially interested in Vietnamese cuisine and fermentation.
              <br/>
              <br/>
              I find purpose in solving hard problems, and breaking tasks down to their first principles. I even wrote an article
              on it <Link href="https://medium.com/@drewharts8/how-to-incentivize-learning-from-first-principles-ae59446df41c" isExternal color="blue.500">here</Link>.
            </Text>
            {/* Social media links can go here */}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AboutMeModal;
