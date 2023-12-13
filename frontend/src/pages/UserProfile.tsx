import { Button, useDisclosure } from '@chakra-ui/react';

import EditUserProfileModal from '../components/Modals/EditUserProfileModal';

export default function UserProfile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <h1>User Profile</h1>
      <h2>hello</h2>

      <Button id="edit-user-info-button" colorScheme="blue" onClick={onOpen}>
        Open Modal
      </Button>
      <EditUserProfileModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
