import { useState } from 'react';
import { useAuth } from '../context/auth';
import {
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
} from '@chakra-ui/react';
import Container from '../components/Container';
import Link from 'next/link';

export default function Register() {
  const { signup, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Text>REGISTER</Text>
      <FormControl id='email' isRequired my={10}>
        <FormLabel>Email address</FormLabel>
        <Input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <FormHelperText>Choose a strong one.</FormHelperText>
      </FormControl>

      <Flex>
        <Link href='/login'>
          <a>Login </a>
        </Link>
        <Link href='/forgot-password'>
          <a>Forgot Password</a>
        </Link>
      </Flex>

      <Button
        isLoading={isLoading}
        my={9}
        loadingText='Loading'
        colorScheme='teal'
        disabled={isLoading || !email || !password}
        onClick={e => {
          e.preventDefault();
          signup(email, password);
        }}>
        REGISTER
      </Button>
    </Container>
  );
}
