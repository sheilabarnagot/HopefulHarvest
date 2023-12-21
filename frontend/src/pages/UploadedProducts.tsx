import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Result {
  username: string;
  email: string;
  image_ref: string;
  description: string;
  price: number;
}

interface StateGeneric {
  data: Result;
  image: string;
}

export default function UploadedProducts() {
  const [product, setProduct] = useState<StateGeneric[]>([]);
  const [objectURLs, setObjectURLs] = useState<string[]>([]);
  const getProducts = async () => {
    const res = await fetch('http://185.112.144.228:8000/get-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    const data = await res.json();

    return data;
  };

  console.log(objectURLs);
  useEffect(() => {
    getProducts().then(async resultPromise => {
      const products = await Promise.all(
        resultPromise.map(async (item: Result) => {
          const res = await fetch(
            `http://185.112.144.228:8000/get-image/${item.image_ref}`,
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

          setObjectURLs([objectURL]);

          return { data: item, image: objectURL };
        })
      );

      setProduct(products);
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2>My products</h2>
      {product.map((item, index) => {
        // Create a Blob URL for the image
        // const imageBlobUrl = URL.createObjectURL(item.image);
        console.log(item.image);
        return (
          <div className="product-card mb-4" key={item.data.image_ref + index}>
            <p>{item.data.username}</p>
            <img
              src={item.image}
              alt="product"
              onLoad={() => URL.revokeObjectURL(item.image)}
            />
            <p className="text-left">Pris: {item.data.price}</p>
            <p className="text-center">{item.data.description}</p>
          </div>
        );
      })}
    </div>
  );
}
