import { Box, Image, Modal, ModalOverlay, ModalContent, ModalHeader, Text } from '@chakra-ui/react';

interface UxUiModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UxUi = ({isOpen, onClose}: UxUiModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>UX / UI</ModalHeader>
                <Text fontSize="xl" fontWeight="light" mb={4} ml="25px">Heard</Text> {/* Increased margin-bottom for space */}
                <Box 
                    bg="whiteAlpha.800"
                    p={4}
                    borderRadius="md"
                    boxShadow="md"
                >
                    <Image src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/HeardMockup.jpg" alt="Heard Mockup" borderRadius="lg" />
                    <Text fontSize="lg" fontWeight="light" mt={4}>{`This is Heard. Heard makes sharing songs with friends frictionless, no matter
                    their streaming preference. You can showcase your all-time favorite albums and artists. Heard makes it effortless to share and discover music with your 
                    friends. Every day, it prompts you to share what you're currently listening to and provides previews showcasing 
                    the songs your friends are currently enjoying.`}</Text>
                </Box>
            </ModalContent>
        </Modal>
    );
};

export default UxUi;
