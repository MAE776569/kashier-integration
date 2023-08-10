'use client';

import { Flex } from '@chakra-ui/react';
import ShippingInfo from './shipping-info/ShippingInfo';
import OrderSummary from './order-summary/OrderSummary';
import { useMemo, useState } from 'react';
import * as _ from 'lodash';
import { products } from './data';

export type FormatPriceOptions = { locale?: string; currency?: string };

export function formatPrice(
  value: number,
  opts: { locale?: string; currency?: string } = {}
) {
  const { locale = 'en-US', currency = 'EGP' } = opts;
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

interface IOrderCheckoutProps {
  kashierMid: string;
  kashierApiKey: string;
  kashierApiUrl: string;
  kashierRedirectUrl: string;
  kashierWebhookUrl: string;
}

const OrderCheckout = ({
  kashierMid,
  kashierApiKey,
  kashierApiUrl,
  kashierRedirectUrl,
  kashierWebhookUrl,
}: IOrderCheckoutProps) => {
  const selectedProduts = products.slice(0, 2);
  const shippingCost = 10;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  const subTotal = useMemo(
    () => _.sumBy(selectedProduts, ({ price }) => price ?? 0),
    [selectedProduts]
  );

  const total = useMemo(() => subTotal + shippingCost, [subTotal]);

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      maxW='8xl'
      mx='auto'
      minH='100vh'
      borderTopWidth='1px'
      borderTopColor='gray.200'>
      <ShippingInfo notes={notes} setNotes={setNotes} />
      <OrderSummary
        orderItems={selectedProduts}
        subTotal={subTotal}
        shippingCost={shippingCost}
        total={total}
        isSubmitting={isSubmitting}
        kashierMid={kashierMid}
        kashierApiKey={kashierApiKey}
        kashierApiUrl={kashierApiUrl}
        kashierRedirectUrl={kashierRedirectUrl}
        kashierWebhookUrl={kashierWebhookUrl}
      />
    </Flex>
  );
};

export default OrderCheckout;
