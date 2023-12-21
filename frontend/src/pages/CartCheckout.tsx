import { Box, Flex, Heading, HStack, Link, Stack } from '@chakra-ui/react';
import CartOrderSummary from '../components/Cart/CartOrderSummary';
import { useShoppingCartItems } from '../zustand/customHooks';
import { CartItem } from '../components/Cart/CartItem';

type CartItemProps = {
  id: string;
  data: {
    isGiftWrapping?: boolean;
    product_id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    currency: string;
    image_ref: string;
    imageUrl: string;
  };

  onChangeQuantity?: (quantity: number) => void;
  onClickGiftWrapping?: () => void;
  onClickDelete?: () => void;
};
export default function CartCheckout() {
  const cartData = useShoppingCartItems((state: any) => state.data);

  return (
    <>
      <Box
        maxW={{ base: '3xl', lg: '7xl' }}
        mx="auto"
        px={{ base: '4', md: '8', lg: '12' }}
        py={{ base: '6', md: '8', lg: '12' }}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          align={{ lg: 'flex-start' }}
          spacing={{ base: '8', md: '16' }}>
          <Stack spacing={{ base: '8', md: '10' }} flex="2">
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart (<span id="items-in-cart"> {cartData.length} </span>
              )
            </Heading>

            <Stack spacing="6">
              {cartData &&
                cartData.map((item: CartItemProps) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    productId={item.data.product_id}
                    imageUrl={`http://185.112.144.228:8000/images/${item.data.image_ref}`}
                  />
                ))}
            </Stack>
          </Stack>
          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link>Continue shopping</Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </>
  );
}
