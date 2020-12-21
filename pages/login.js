import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import { Button, Input, FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import Container from '../components/Container';
import Link from 'next/link';

export default function Login() {
  const { login, isLoading, loginInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Stack my={9}>
        <FormControl id='email' isRequired py={2}>
          <FormLabel>Email address</FormLabel>
          <Input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id='password' isRequired py={2}>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <Link href='/register'>
          <a>Don't have an account? Register</a>
        </Link>
      </Stack>

      <Button
        isLoading={isLoading}
        my={2}
        loadingText='Loading'
        colorScheme='teal'
        type='submit'
        disabled={isLoading || !email || !password}
        onClick={e => {
          e.preventDefault();
          login(email, password);
        }}>
        LOGIN
      </Button>

      <Button
        leftIcon={<Icon as={FcGoogle} />}
        onClick={() => loginInWithGoogle()}>
        LOGIN WITH GOOGLE
      </Button>
    </Container>
  );
}
