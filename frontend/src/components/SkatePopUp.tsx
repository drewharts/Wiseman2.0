import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  VStack,
  Center
} from "@chakra-ui/react";
import YouTube from "react-youtube";

const SkatePopUp = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                <Center style={{ fontWeight: 'bold', fontSize: '24px', color: '#333' }}>Skate</Center>
            </ModalHeader>
            <ModalBody>
                <VStack spacing={4}> {/* Adjust spacing as needed */}
                    <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', color: '#555', marginTop: '20px' }}>
                        A video showcasing some of my latest skate clips.
                    </div>

                    <YouTube videoId="XklWcpyGQt8" opts={{ height: '315', width: '560', playerVars: { autoplay: 0 } }} />
                    
                    <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', color: '#555', marginTop: '20px' }}>
                        I threw a skate party in an abandoned pool. Here are some videos about it.
                    </div>

                    <YouTube videoId="PHKfHtpbO7c" opts={{ height: '315', width: '560', playerVars: { autoplay: 0 } }} />
                    <YouTube videoId="7fonivZmy40" opts={{ height: '315', width: '560', playerVars: { autoplay: 0 } }} />
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>

  );
};

export default SkatePopUp;
