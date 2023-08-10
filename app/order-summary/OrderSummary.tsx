import { Box, Heading, Stack } from '@chakra-ui/react';
import CheckoutItems from '../order-items/CheckoutItems';
import OrderAmount from './order-amount/OrderAmount';
import CheckoutActions from './checkout-actions/CheckoutActions';

interface IOrderSummaryProps {
  subTotal: number;
  shippingCost: number;
  total: number;
  orderItems: any[];
  isSubmitting: boolean;
  kashierMid: string;
  kashierApiKey: string;
  kashierApiUrl: string;
  kashierRedirectUrl: string;
  kashierWebhookUrl: string;
}

const OrderSummary = ({
  orderItems,
  subTotal,
  shippingCost,
  total,
  isSubmitting,
  kashierMid,
  kashierApiKey,
  kashierApiUrl,
  kashierRedirectUrl,
  kashierWebhookUrl,
}: IOrderSummaryProps) => (
  <Box
    minW={{ md: '24', lg: 'lg', xl: 'xl' }}
    px={{ base: '6', lg: '12', md: '8' }}
    pt={{ base: '6', lg: '12', md: '8' }}
    pb={{ base: '6', lg: '16' }}>
    <Stack spacing={{ base: '6', md: '10' }}>
      <Heading size='md' as='h2'>
        order summary
      </Heading>
      <Stack spacing='8'>
        <CheckoutItems orderItems={orderItems} />
        <OrderAmount
          subTotal={subTotal}
          shippingCost={shippingCost}
          total={total}
        />
      </Stack>
      <CheckoutActions
        isSubmitting={isSubmitting}
        kashierMid={kashierMid}
        kashierApiKey={kashierApiKey}
        kashierApiUrl={kashierApiUrl}
        kashierRedirectUrl={kashierRedirectUrl}
        kashierWebhookUrl={kashierWebhookUrl}
      />
    </Stack>
  </Box>
);

export default OrderSummary;
