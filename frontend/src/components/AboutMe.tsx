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
  Link,
  HStack
} from "@chakra-ui/react";
import {FaLinkedin, FaInstagram, FaTwitter, FaTiktok} from 'react-icons/fa'

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
              Currently, I'm a software engineer at Octus, a finance platform. I recently graduated BYU with a Computer Science degree and a business minor.
              I also studied Spanish and speak fluently. I'm a deeply interested person, and I believe in being a disciple of experiment.
              I often remind myself to produce more than I consume.

              I skate, mostly transition which means anything that slopes. I absolutely love to cook. 
              Lately I've been especially interested in Vietnamese cuisine and fermentation. Walter Isaacson’s my favorite author—his Benjamin Franklin biography is top-notch. 
              I’ve got a bit of a friendly grudge with Sapiens, though—I’m all in on technology making life better.
              <br/>
              <br/>
              I find purpose in solving hard problems, and breaking tasks down to their first principles. I even wrote an article
              on it <Link href="https://medium.com/@drewharts8/how-to-incentivize-learning-from-first-principles-ae59446df41c" isExternal color="blue.500">here</Link>.
            </Text>
            {/* Social media links can go here */}
            <HStack spacing={4}>
              <Link href="https://www.linkedin.com/in/drewhartsfield" isExternal>
                <FaLinkedin size="24px" />
              </Link>
              <Link href="https://www.instagram.com/drewhartss" isExternal>
                <FaInstagram size="24px" />
              </Link>
              <Link href="https://twitter.com/drewharts" isExternal>
                <FaTwitter size="24px" />
              </Link>
              <Link href="https://www.tiktok.com/@drewhartsss" isExternal>
                <FaTiktok size="24px" />
              </Link>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AboutMeModal;
