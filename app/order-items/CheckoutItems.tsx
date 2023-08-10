import { Stack } from '@chakra-ui/react';
import CheckoutItemDetails from './CheckoutItemDetails';

interface ICheckoutItemsProps {
  orderItems: any[];
}

const CheckoutItems = ({ orderItems }: ICheckoutItemsProps) => (
  <Stack spacing='6'>
    {orderItems.map((item) => (
      <CheckoutItemDetails key={item.id} item={item} />
    ))}
  </Stack>
);

export default CheckoutItems;
