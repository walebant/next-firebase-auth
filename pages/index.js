import Head from 'next/head';
import { useAuth } from '../context/auth';
import Container from '../components/Container';
import { Heading, Text, Button, Avatar } from '@chakra-ui/react';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Heading py={4}>
        Welcome{user?.displayName && `, ${user.displayName}`}
      </Heading>

      <Avatar size='xl' name={user?.displayName} src={user?.photoURL} />

      <Text>Your email is: {user?.email}</Text>
      <Text>Your UID is: {user?.uid}</Text>

      <Button py={3} onClick={() => logout()}>
        LOGOUT
      </Button>
    </Container>
  );
}
