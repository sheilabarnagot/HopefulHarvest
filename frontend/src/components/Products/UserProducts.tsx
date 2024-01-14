import { Button } from '@chakra-ui/react';

interface Product {
  product_id: number;
  username: string;
  description: string;
  price: number;
  stock_quantity: number;
  upload_date: string;
}

interface ProductProps {
  product: Product;
  removeTest: (product_id: number) => void;
  setTest: (product: Product) => void;
}

export default function UserProducts({
  removeTest,
  setTest,
  product,
}: ProductProps) {
  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="flex my-3 justify-between">
          <p>{product.username}</p>
          <p>{product.upload_date.split('T')[0]}</p>
        </div>
        <div className="w-80 text-justify">
          <p>Description</p>
          <p className="font-serif">{product.description}</p>
        </div>
        <div className="flex mt-3 justify-between">
          <p>Price: €{product.price}</p>
          <p>
            In stock:{' '}
            <span className="font-bold">{product.stock_quantity}</span>
          </p>
        </div>
        <Button
          id="remove-item"
          onClick={() => removeTest(product.product_id)}
          colorScheme="blue">
          Remove from cart
        </Button>
        <Button
          id="add-item"
          onClick={() => setTest(product)}
          colorScheme="blue">
          Add to cart
        </Button>
      </div>
    </div>
  );
}
