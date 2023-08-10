import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  Icon,
  Image,
  LinkBox,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GrFormClose } from 'react-icons/gr';
import NextLink from 'next/link';
import { formatPrice } from '../OrderCheckout';

interface ICheckoutItemDetailsProps {
  item: any;
}

const CheckoutItemDetails = ({ item }: ICheckoutItemDetailsProps) => (
  <>
    <Flex justify='space-between'>
      <Stack direction='row' spacing='5'>
        <LinkBox display='block' as={NextLink} href='#'>
          <AspectRatio ratio={1} maxW='100%' width='92px' height='92px'>
            <Image
              src={item.imageUrl}
              alt={item.name}
              fallback={<Skeleton />}
              rounded='lg'
              maxW='100%'
              display='block'
              className='object-contain'
            />
          </AspectRatio>
        </LinkBox>
        <Stack spacing='3'>
          <Stack spacing='1'>
            <Text fontWeight='semibold'>{item.name}</Text>
          </Stack>
          <Box color='gray.700'>
            <Flex alignItems='flex-end'>
              1
              <Icon color='gray.700' as={GrFormClose} boxSize={5} />
            </Flex>
          </Box>
        </Stack>
      </Stack>
      <Stack spacing='1'>
        <Text fontWeight='meduim' color='gray.700'>
          {formatPrice(item.price)}
        </Text>
      </Stack>
    </Flex>
    <Divider />
  </>
);

export default CheckoutItemDetails;
