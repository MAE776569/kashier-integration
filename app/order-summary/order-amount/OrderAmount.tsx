import { Divider, Stack } from '@chakra-ui/react';
import OrderAmountRow from './OrderAmountRow';
import { formatPrice } from '@/app/OrderCheckout';

interface IOrderAmountProps {
  subTotal: number;
  shippingCost: number;
  total: number;
}

const OrderAmount = ({ subTotal, shippingCost, total }: IOrderAmountProps) => (
  <Stack spacing='6'>
    <Stack spacing='3'>
      <OrderAmountRow attribute='subtotal' value={formatPrice(subTotal)} />
      <OrderAmountRow
        attribute='shipping cost'
        value={formatPrice(shippingCost)}
      />
    </Stack>
    <Divider />
    <OrderAmountRow
      attribute='total'
      value={formatPrice(total)}
      attributeProps={{
        color: 'gray.700',
        fontSize: 'lg',
        fontWeight: 'semibold',
      }}
      valueProps={{
        color: 'black',
        fontSize: 'xl',
        fontWeight: 'semibold',
      }}
    />
  </Stack>
);

export default OrderAmount;
