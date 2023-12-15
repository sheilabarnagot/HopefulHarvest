import { useState } from 'react';
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react';

interface RegistrationData {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  address: string;
  phone_number: number;
}

const UserRegistration: React.FC = () => {
  const [name, setname] = useState<string>('');
  const [lastname, setlastName] = useState<string>('');
  const [username, setusername] = useState<string>('');
  const [email, setemail] = useState<string>('');
  const [password, setpassword] = useState<string>('');
  const [address, setaddress] = useState<string>('');
  const [phone_number, setphone_number] = useState<number>();
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const handleRegistration = async e => {
    e.preventDefault();
    setShowErrors(true);

    try {
      if (
        !name ||
        !lastname ||
        !username ||
        !email ||
        !password ||
        !address ||
        !phone_number
      ) {
        throw new Error('All fields are required');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Enter a valid email address');
      }

      // fake email validation
      const isEmailVerified = await sendVerificationEmail(email);

      if (!isEmailVerified) {
        throw new Error(
          'You must verify your email address to complete registration'
        );
      }

      const hashedPassword = await hashPassword(password);

      // fake
      const registrationData: RegistrationData = {
        name,
        lastname,
        username,
        email,
        password: hashedPassword,
        address,
        phone_number,
      };
      registrationData;
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        ('User registered successfully.');
      } else {
        const errorData = await response.json();
        throw new Error(`Error during registration: ${errorData.message}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error during registration', error.message);
      } else {
        console.error('Unexpectected error during registration', error);
      }
    }
  };

  //stulen -.- by Sheila.
  const sendVerificationEmail = async (email: string): Promise<boolean> => {
    `Sending verification email to ${email}`;
    // (SendGrid o Nodemailer)

    return true;
  };

  const hashPassword = async (password: string): Promise<string> => {
    ('Hashing password...');
    return password;
    // Vet du om  bcrypt Pontus?
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg">
        <VStack spacing={4}>
          <Heading as="h2" size="lg">
            Registration
          </Heading>
          <form onSubmit={handleRegistration}>
            <FormControl id="firstName" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e => setname(e.target.value)}
              />
              {showErrors && !name && (
                <Text color="red" fontSize="sm">
                  Please enter your name.
                </Text>
              )}
            </FormControl>
            <FormControl id="lastname" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your last name"
                value={lastname}
                onChange={e => setlastName(e.target.value)}
              />
              {showErrors && !lastname && (
                <Text color="red" fontSize="sm">
                  Please enter your last name
                </Text>
              )}
            </FormControl>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => setusername(e.target.value)}
              />
              {showErrors && !username && (
                <Text color="red" fontSize="sm">
                  Please enter your username
                </Text>
              )}
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setemail(e.target.value)}
              />
              {showErrors && !email && (
                <Text color="red" fontSize="sm">
                  Please enter your email.
                </Text>
              )}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setpassword(e.target.value)}
              />
              {showErrors && !password && (
                <Text color="red" fontSize="sm">
                  Please enter your password.
                </Text>
              )}
            </FormControl>
            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                type="address"
                placeholder="Enter your address"
                value={address}
                onChange={e => setaddress(e.target.value)}
              />
              {showErrors && !address && (
                <Text color="red" fontSize="sm">
                  Please enter your address.
                </Text>
              )}
            </FormControl>
            <FormControl id="passphone_numberword" isRequired>
              <FormLabel>phone_number</FormLabel>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phone_number}
                onChange={e => setphone_number(parseInt(e.target.value, 10))}
              />
              {showErrors && !phone_number && (
                <Text color="red" fontSize="sm">
                  Please enter your phone_number.
                </Text>
              )}
            </FormControl>
            <Button colorScheme="teal" type="submit">
              Register
            </Button>
          </form>
          <Text>
            Already have an account? <a href="/login">Log in</a>
          </Text>
        </VStack>
      </Box>
    </div>
  );
};

export default UserRegistration;
