import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useShoppingCartItems } from '../zustand/customHooks';
import UserProducts from '../components/Products/UserProducts';
interface Product {
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

  image: string;
}

export default function ProductPage() {
  const [result, setResult] = useState<Product[] | undefined>(undefined);
  const setTest = useShoppingCartItems(
    (state: any) => state.updateShoppingCart
  );

  const removeTest = useShoppingCartItems((state: any) => state.removeFromCart);

  const getProducts = async () => {
    try {
      const response = await fetch(
        'http:///185.112.144.228:8000/get-all-products',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      const result = await response.json();
      setResult(result);
      return result;
    } catch (error) {
      console.error(
        'Error: Could not load products. Are you logged in?',
        error
      );
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {result &&
        result.map(product => {
          return (
            <div
              key={product.product_id}
              className="my-5 flex flex-col items-center">
              <div>
                <h1 className="text-2xl">{product.product_name}</h1>
                <img
                  src={`http:///185.112.144.228:8000/images/${product.image_ref}`}
                  width={300}
                  height={300}
                  onLoad={() => URL.revokeObjectURL(product.image)}
                />
                <UserProducts
                  product={product}
                  removeTest={removeTest}
                  setTest={setTest}
                />
              </div>
            </div>
          );
        })}
    </>
  );
}
