import { Button, useDisclosure } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import EditUserProfileModal from '../components/Modals/EditUserProfileModal';
import { useEffect } from 'react';

export default function UserProfile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = Cookies.get('token');
  const handleGetUser = async () => {
    const response = await fetch('http:///185.112.144.228:8000/protected', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    data;
  };

  useEffect(() => {
    handleGetUser();
  }, []);

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
