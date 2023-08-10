import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface IShippingInfoProps {
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
}

const ShippingInfo = ({ notes, setNotes }: IShippingInfoProps) => (
  <Box
    flex='1'
    px={{ base: '6', lg: '12', md: '8' }}
    pt={{ base: '6', lg: '12', md: '8' }}
    pb={{ base: '6', lg: '16' }}
    bg='white'>
    <Stack spacing='10'>
      <Stack spacing='8'>
        <Heading size='md' as='h2'>
          Shipping address
        </Heading>
        <Stack spacing={4}>
          <FormControl id='city' isRequired>
            <FormLabel>city</FormLabel>
            <Input
              type='text'
              autoFocus
              required
              placeholder='city'
              isRequired
            />
          </FormControl>
          <FormControl id='street' isRequired>
            <FormLabel>street</FormLabel>
            <Input
              type='text'
              placeholder='street'
              className='p-inline-start-1 p-inline-end-0'
              required
              isRequired
            />
          </FormControl>
          <FormControl id='phone' isRequired>
            <FormLabel>phone</FormLabel>
            <Input
              type='text'
              placeholder='street'
              className='p-inline-start-1 p-inline-end-0'
              required
              isRequired
            />
          </FormControl>
        </Stack>
      </Stack>
      <Box>
        <FormControl id='notes'>
          <FormLabel fontWeight='bold' fontSize='lg'>
            notes
          </FormLabel>
          <Textarea
            placeholder='add your notes'
            value={notes}
            onChange={(event) => setNotes(event.currentTarget.value)}
          />
        </FormControl>
      </Box>
    </Stack>
  </Box>
);

export default ShippingInfo;
