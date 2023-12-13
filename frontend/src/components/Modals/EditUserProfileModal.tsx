import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { FormEvent, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditUserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditUserProfileModal({
  isOpen,
  onClose,
}: EditUserProfileModalProps) {
  const initialRef = useRef(null);

  const notify = () =>
    toast('Invalid email format', {
      position: 'top-right',
      autoClose: 5000,
      toastId: 'toast-error',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    notify();
    console.log(e);
  };
  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update account information</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handelSubmit} id="edit-user-profile-form">
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  id="edit-user-email"
                  ref={initialRef}
                  placeholder="Email"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input id="edit-user-username" placeholder="Last name" />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button id="edit-user-modal-close" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
}
