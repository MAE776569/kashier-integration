import { Stack, Text, TextProps } from '@chakra-ui/react';

interface IOrderAmountRowProps {
  attribute: string;
  value: string;
  attributeProps?: TextProps;
  valueProps?: TextProps;
}

const OrderAmountRow = ({
  attribute,
  value,
  attributeProps,
  valueProps,
}: IOrderAmountRowProps) => (
  <Stack direction='row' justify='space-between'>
    <Text color='gray.600' {...attributeProps}>
      {attribute}
    </Text>
    <Text color='black' {...valueProps}>
      {value}
    </Text>
  </Stack>
);

export default OrderAmountRow;
