import { Button } from '@chakra-ui/react';
import { useRef } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
export default function UserProfile() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  return (
    <>
      <h1>User Profile</h1>
      <h2>hello</h2>

      <>
        <Button id="edit-user-info-button" colorScheme="blue" onClick={onOpen}>
          Open Modal
        </Button>
        <Button ml={4} ref={finalRef}>
          I'll receive focus on close
        </Button>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update account information</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form id="edit-user-profile-form">
                <FormControl>
                  <FormLabel>First name</FormLabel>
                  <Input ref={initialRef} placeholder="First name" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Last name</FormLabel>
                  <Input placeholder="Last name" />
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
      </>
    </>
  );
}
