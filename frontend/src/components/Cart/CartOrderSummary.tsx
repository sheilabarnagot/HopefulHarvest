import { Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { useShoppingCartItems } from '../../zustand/customHooks';
type OrderSummaryItemProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium">{label}</Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export default function CartOrderSummary() {
  const cartDataPrice = useShoppingCartItems((state: any) => state.data);

  // const priceArray = cartDataPrice.map((item: any) => Number(item.data.price));
  const clearCart = useShoppingCartItems((state: any) => state.clear);
  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value="597" />
        <OrderSummaryItem label="Shipping + Tax">
          <Link href="#" textDecor="underline">
            Calculate shipping
          </Link>
        </OrderSummaryItem>
        <OrderSummaryItem label="Coupon Code">
          <Link href="#" textDecor="underline">
            Add coupon code
          </Link>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {/* {priceArray.length > 0
              ? priceArray.reduce((a: number, b: number) => a + b)
              : 0} */}
          </Text>
        </Flex>
      </Stack>
      <Button
        id="checkout-button"
        colorScheme="blue"
        onClick={() => clearCart()}
        size="lg"
        fontSize="md"
        // rightIcon={<FaArrowRight />}
      >
        Checkout
      </Button>
    </Stack>
  );
}
