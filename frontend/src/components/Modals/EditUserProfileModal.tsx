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
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditUserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IFormInput {
  email: string;
  username: string;
}

export default function EditUserProfileModal({
  isOpen,
  onClose,
}: EditUserProfileModalProps) {
  const initialRef = useRef(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });
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
  const onSubmit: SubmitHandler<IFormInput> = async (values: IFormInput) => {
    console.log(values);
    console.log(errors);
    // const respons = await fetch('http://localhost:8080/api/auth/signin', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: values.username,
    //     password: values.email,
    //   }),
    // });
    notify();
  };

  useEffect(() => {
    console.log(errors);
    if (errors.email?.message === 'Invalid email format') {
      notify();
    }
  }, [errors.email?.message]);

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)} id="edit-user-profile-form">
          <ModalContent>
            <ModalHeader>Update account information</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Update username</FormLabel>
                <Input
                  id="edit-user-usernamel"
                  placeholder="username"
                  {...register('username', {
                    required: 'This is required',
                    minLength: {
                      value: 2,
                      message: 'Minimum length should be 2',
                    },
                  })}
                />
                <FormErrorMessage id="edit-user-username-error">
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email} mt={4}>
                <FormLabel>Update email</FormLabel>
                <Input
                  id="edit-user-email"
                  placeholder="email"
                  {...register('email', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email format',
                    },
                  })}
                />
                <FormErrorMessage id="edit-user-email-error">
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={isSubmitting}
                type="submit"
                colorScheme="blue"
                mr={3}>
                Save
              </Button>
              <Button id="edit-user-modal-close" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}
