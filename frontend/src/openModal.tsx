import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

interface BasicUsageProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function BasicUsage({ isOpen, onClose }: BasicUsageProps) {
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms and Conditions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Welcome to our website. By registering, logging in, and making
              purchases on this site, you agree to the following terms and
              conditions.
            </p>
            <p>
              {' '}
              Registration and Login: By registering on our website, you agree
              to provide accurate and complete information. You are responsible
              for maintaining the confidentiality of your account and password.
              You must not share your login credentials with third parties.
              Notify us immediately if you suspect that your account has been
              compromised.
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={onClose} variant="ghost">
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BasicUsage;
