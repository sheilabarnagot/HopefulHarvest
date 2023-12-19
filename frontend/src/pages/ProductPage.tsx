import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface Product {
  data: {
    category_id: string;
    description: string;
    image_id: number;
    image_ref: number;
    product_id: number;
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

  return (
    <>
      <h1>Product Page</h1>
      {products &&
        products.map(product => {
          return (
            <div className="mb-5" key={product.data.product_id}>
              <h2>{product.data.product_name}</h2>
              <img
                src={product.image}
                onLoad={() => URL.revokeObjectURL(product.image)}
              />
              <p>{product.data.description}</p>
              <p>{product.data.username}</p>
              <p>{product.data.upload_date}</p>
            </div>
          );
        })}
    </>
  );
}
