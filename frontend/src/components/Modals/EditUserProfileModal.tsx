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
import Cookies from 'js-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

interface EditUserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IFormInput {
  email: string;
  username: string;
  user_id: number;
}

export default function EditUserProfileModal({
  isOpen,
  onClose,
}: EditUserProfileModalProps) {
  const initialRef = useRef(null);
  const [userInfo, setUserInfo] = useState<IFormInput | undefined>();
  const [triggerRender, setTriggerRender] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const notifySuccess = () =>
    toast('User information updated sucessfully!', {
      position: 'top-center',
      autoClose: 5000,
      toastId: 'toast-success',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const onSubmit: SubmitHandler<IFormInput> = async (values: IFormInput) => {
    if (values.username === userInfo?.username) {
      setError('username', {
        type: 'validate',
        message: 'username is the same as before',
      });

      return null;
    }

    if (values.email === userInfo?.email) {
      setError('email', {
        type: 'validate',
        message: 'Email is the same as before',
      });
      return null;
    }

    await fetch('http:///185.112.144.228:8000/update-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({
        username: values.username || userInfo?.username,
        email: values.email || userInfo?.email,
        user_id: Cookies.get('userId'),
      }),
    });
    setTriggerRender(!triggerRender);
    reset();
    notifySuccess();
  };

  const getUserInformation = async () => {
    const response = await fetch('http:///185.112.144.228:8000/protected', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    const result = await response.json();
    setUserInfo(result.user);
    result;
  };

  useEffect(() => {
    errors.email;
  }, [setError]);

  useEffect(() => {
    getUserInformation();
  }, [triggerRender]);

  useEffect(() => {
    errors;
  }, [errors.email?.message, errors.username?.message]);

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
                <FormErrorMessage id="edit-user-username-error">
                  {errors.username && errors.username.message}
                </FormErrorMessage>
                <Input
                  id="edit-user-username"
                  placeholder={userInfo && userInfo.username}
                  {...register('username', {
                    minLength: {
                      value: 2,
                      message: 'Minimum length should be 2',
                    },
                  })}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.email} mt={4}>
                <FormLabel>Update email</FormLabel>
                <FormErrorMessage>
                  <p id="edit-user-email-error">
                    {errors.email && errors.email.message}
                  </p>
                </FormErrorMessage>
                <Input
                  id="edit-user-email"
                  placeholder={userInfo && userInfo.email}
                  {...register('email', {
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email format',
                    },
                  })}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={isSubmitting}
                type="submit"
                className="edit-user-modal-save"
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
