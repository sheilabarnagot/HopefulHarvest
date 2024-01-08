import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Result {
  username: string;
  email: string;
  image_ref: string;
  description: string;
  price: number;
}

export default function UploadedProducts() {
  const [result, setResult] = useState<Result[]>([]);
  const getProducts = async () => {
    const res = await fetch('http://localhost:3000/get-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    const data = await res.json();
    setResult(data);
    return data;
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-4 text-xl">My products</h2>
      {result.map((item, index) => {
        return (
          <div className="product-card mb-4" key={item.image_ref + index}>
            <p>{item.username}</p>
            <img
              src={`http://localhost:3000/images/${item.image_ref}`}
              alt="product"
            />
            <p className="text-left">Pris: {item.price}</p>
            <p className="text-center">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}
