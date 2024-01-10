import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Text,
  Checkbox,
  Textarea,
} from '@chakra-ui/react';

// interface ContactData {
//   name: string;
//   email: string;
//   message: string;
//   acceptTerms: boolean;
// }

const ContactPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const handleContactSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowErrors(true);

    try {
      if (!name || !email || !message || !acceptTerms) {
        throw new Error('All fields are required');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Enter a valid email address');
      }

      setSubmissionSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error during contact submission', error.message);
      } else {
        console.error('Unexpected error during contact submission', error);
      }
    }
  };

  return (
    <VStack spacing={4} align="center" justify="center" minHeight="100vh">
      <Box
        p={8}
        width={{ base: '90%', md: '50%' }}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        marginTop={8}
        marginBottom={8}
      >
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="lg" textAlign="center">
            Contact Us
          </Heading>
          {submissionSuccess ? (
            <Text color="green" fontSize="md">
              Thank you for contacting us. We will get back to you soon!
            </Text>
          ) : (
            <form onSubmit={handleContactSubmission}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {showErrors && !name && (
                  <Text color="red" fontSize="sm">
                    Please enter your name.
                  </Text>
                )}
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {showErrors && !email && (
                  <Text color="red" fontSize="sm">
                    Please enter a valid email address.
                  </Text>
                )}
              </FormControl>
              <FormControl id="message" isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  placeholder="Type your message (minimum 10 characters)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                {showErrors && message.length < 10 && (
                  <Text color="red" fontSize="sm">
                    Please enter a message with at least 10 characters.
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <Checkbox
                  isChecked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                >
                  I accept the terms and conditions
                </Checkbox>
                {showErrors && !acceptTerms && (
                  <Text color="red" fontSize="sm">
                    Please accept the terms and conditions to proceed.
                  </Text>
                )}
              </FormControl>
              <Button colorScheme="teal" type="submit">
                Submit
              </Button>
            </form>
          )}
        </VStack>
      </Box>
    </VStack>
  );
};

export default ContactPage;
