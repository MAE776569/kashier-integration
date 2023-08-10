import { Button, Stack } from '@chakra-ui/react';
import Script from 'next/script';
import '@/styles/checkout.css';
import * as crypto from 'crypto';

interface ICheckoutActionsProps {
  isSubmitting: boolean;
  kashierMid: string;
  kashierApiKey: string;
  kashierApiUrl: string;
  kashierRedirectUrl: string;
  kashierWebhookUrl: string;
}

function generateKashierOrderHash(order: any) {
  const { mid, amount, currency, id, secret } = order;
  const path = `/?payment=${mid}.${id}.${amount}.${currency}`;
  const hash = crypto.createHmac('sha256', secret).update(path).digest('hex');
  return hash;
}

const CheckoutActions = ({
  isSubmitting,
  kashierMid,
  kashierApiKey,
  kashierApiUrl,
  kashierRedirectUrl,
  kashierWebhookUrl,
}: ICheckoutActionsProps) => {
  const handlePay = () => {
    const button = document.getElementById('el-kashier-button');
    button?.click();
  };

  const order = {
    mid: kashierMid,
    secret: kashierApiKey,
    amount: '410',
    currency: 'EGP',
    id: Date.now(),
  };
  const hash = generateKashierOrderHash(order);

  return (
    <Stack spacing='8'>
      <Button
        size='lg'
        colorScheme='blue'
        isLoading={isSubmitting}
        onClick={handlePay}>
        place order
        <Script
          id='kashier-iFrame'
          src={kashierApiUrl}
          data-amount={order.amount}
          data-hash={hash}
          data-currency={order.currency}
          data-orderId={order.id}
          data-merchantId={order.mid}
          data-merchantRedirect={kashierRedirectUrl}
          data-serverWebhook={kashierWebhookUrl}
          data-mode='test'
          data-metaData='{"metaData":"myData"}'
          data-description='ORDER-DESCRIPTION'
          data-redirectMethod='get'
          data-failureRedirect='false'
          data-allowedMethods='card,bank_installments,wallet'
          data-type='external'
          data-brandColor='#00bcbc'
          data-display='en'></Script>
      </Button>
    </Stack>
  );
};

export default CheckoutActions;
