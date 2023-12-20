import {
  CloseButton,
  Flex,
  Link,
  Select,
  SelectProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { PriceTag } from './PriceTag';
import { CartProductMeta } from './CartProductMeta';
import { useShoppingCartItems } from '../../zustand/customHooks';

type CartItemProps = {
  data: {
    isGiftWrapping?: boolean;
    name: string;
    description: string;
    quantity: number;
    price: number;
    currency: string;
    imageUrl: string;
  };
  imageUrl: string;
  productId: number;
  onChangeQuantity?: (quantity: number) => void;
  onClickGiftWrapping?: () => void;
  onClickDelete?: () => void;
};

const QuantitySelect = (props: SelectProps) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  );
};

export const CartItem = ({ data, imageUrl, productId }: CartItemProps) => {
  const cartDataDelete = useShoppingCartItems(
    (state: any) => state.removeFromCart
  );

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center">
      <CartProductMeta
        name={data.name}
        description={data.description}
        image={imageUrl}
        isGiftWrapping={false}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: 'none', md: 'flex' }}>
        <PriceTag price={data.price} currency={data.currency} />
        <CloseButton
          aria-label={`Delete ${data.name} from cart`}
          onClick={() => cartDataDelete(productId)}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}>
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={data.quantity}
          // onChange={e => {
          //   // onChangeQuantity?.(+e.currentTarget.value);
          // }}
        />
        <PriceTag price={data.price} currency={data.currency} />
      </Flex>
    </Flex>
  );
};
