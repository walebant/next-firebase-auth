import { useState } from 'react';
import { useAuth } from '../context/auth';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Text,
} from '@chakra-ui/react';
import Container from '../components/Container';
import Link from 'next/link';

export default function ResetPassword() {
  const { user, isLoading, resetPassword } = useAuth();
  const [email, setEmail] = useState('');

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
        <Link href='/login'>
          <a>Login</a>
        </Link>
      </Stack>

      <Button
        isLoading={isLoading}
        my={2}
        loadingText='Loading'
        colorScheme='teal'
        disabled={isLoading || !email || user.email !== email}
        onClick={() => resetPassword(email)}>
        RESET
      </Button>
    </Container>
  );
}
