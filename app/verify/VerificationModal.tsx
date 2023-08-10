'use client';

import {
  Box,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

interface IVerificationModalProps {
  isValidSignature: boolean;
}

const VerificationModal = ({ isValidSignature }: IVerificationModalProps) => (
  <Box height='100vh'>
    <Modal
      isOpen={true}
      onClose={() => void 0}
      size='2xl'
      blockScrollOnMount={false}
      trapFocus={false}>
      <ModalOverlay />
      <ModalContent borderRadius='2xl' mx='4'>
        <ModalBody>
          <Stack
            maxW='xs'
            mx='auto'
            py={{ base: '12', md: '16' }}
            spacing={{ base: '6', md: '10' }}>
            <Stack
              spacing='3'
              justify='center'
              align='center'
              textAlign='center'>
              <Box>
                <Icon
                  color={isValidSignature ? 'green.500' : 'red.500'}
                  fontSize='5xl'
                  as={
                    isValidSignature
                      ? AiOutlineCheckCircle
                      : AiOutlineCloseCircle
                  }
                />
              </Box>
              <Text
                color='gray.500'
                fontWeight='extrabold'
                fontSize='3xl'
                textTransform='uppercase'
                transform='scale(1.2)'>
                {isValidSignature
                  ? 'successfull signature'
                  : 'invalid signature'}
              </Text>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  </Box>
);

export default VerificationModal;
