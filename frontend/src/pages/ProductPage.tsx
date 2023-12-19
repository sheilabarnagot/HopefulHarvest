import { Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useShoppingCartItems } from '../zustand/customHooks';
interface Product {
  data: {
    category_id: string;
    description: string;
    image_id: number;
    image_ref: number;
    product_id: number;
    price: number;
    product_name: string;
    stock_quantity: number;
    upload_date: string;
    user_id: number;
    username: string;
  };
  image: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[] | undefined>([]);

  const setTest = useShoppingCartItems(
    (state: any) => state.updateShoppingCart
  );
  const getTest = useShoppingCartItems((state: any) => state.data);
  const removeTest = useShoppingCartItems((state: any) => state.removeFromCart);
  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/get-all-products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(
        'Error: Could not load products. Are you logged in?',
        error
      );
    }
  };

  console.log(getTest);

  useEffect(() => {
    getProducts().then(async result => {
      const products = await Promise.all(
        result.map(async (item: any) => {
          const res = await fetch(
            `http://localhost:3000/get-image/${item.image_ref}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
              },
            }
          );
          const result = await res.blob();
          const objectURL = URL.createObjectURL(result);

          return { data: item, image: objectURL };
        })
      );
      setProducts(products);
    });
  }, []);
  // console.log(cartItems);

  return (
    <>
      {products &&
        products.map(product => {
          return (
            <div
              key={product.data.product_id}
              className="my-5 flex flex-col items-center">
              <div>
                <h1 className="text-2xl">{product.data.product_name}</h1>
                <img
                  src={product.image}
                  width={300}
                  onLoad={() => URL.revokeObjectURL(product.image)}
                />
                <div>
                  <div className="flex my-3 justify-between">
                    <p>{product.data.username}</p>
                    <p>{product.data.upload_date.split('T')[0]}</p>
                  </div>
                  <div className="w-80 text-justify">
                    <p>Description</p>
                    <p className="font-serif">{product.data.description}</p>
                  </div>
                  <div className="flex mt-3 justify-between">
                    <p>Price: €{product.data.price}</p>
                    <p>
                      In stock:{' '}
                      <span className="font-bold">
                        {product.data.stock_quantity}
                      </span>
                    </p>
                  </div>
                  <Button
                    onClick={() => removeTest(product.data.product_id)}
                    colorScheme="blue">
                    Remove from cart
                  </Button>
                  <Button onClick={() => setTest(product)} colorScheme="blue">
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
