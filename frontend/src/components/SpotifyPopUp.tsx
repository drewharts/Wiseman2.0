import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Box } from '@chakra-ui/react';

// Define a type for individual song
interface Song {
  artist: string;
  title: string;
}

// Define a type for the component props
interface RecentMusicPopupProps {
  isOpen: boolean;
  onClose: () => void;
  songs: Song[];
}

const RecentMusicPopup: React.FC<RecentMusicPopupProps> = ({ isOpen, onClose, songs }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Recently Played Songs</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {songs && songs.map((song, index) => (
            <Box key={index} p={3} borderBottom="1px" borderColor="gray.200">
              <Text fontWeight="bold">{song.artist}</Text>
              <Text>{song.title}</Text>
            </Box>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default RecentMusicPopup;
