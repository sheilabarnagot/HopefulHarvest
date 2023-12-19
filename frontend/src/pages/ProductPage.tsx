import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface Product {
  product_category: string;
  product_id: number;
  product_image: string;
  product_name: string;
  description: string;
  image_ref: number;
  username: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<any | undefined>([]);
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
      setProducts(result);
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  console.log(products);
  return (
    <>
      <h1>Product Page</h1>
    </>
  );
}
