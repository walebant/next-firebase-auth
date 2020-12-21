import { Flex } from '@chakra-ui/react';

export default function Container({ children }) {
  return (
    <Flex justify='center' direction='column' p={12} m={12}>
      {children}
    </Flex>
  );
}
