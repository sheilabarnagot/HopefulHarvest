import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Result {
  username: string;
  email: string;
  image_ref: string;
}

interface StateGeneric {
  data: Result;
  image: Blob;
}

export default function UploadedProducts() {
  const [images, setImages] = useState<StateGeneric[]>([]);

  const getProducts = async () => {
    const res = await fetch('http://localhost:3000/get-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    getProducts().then(resultPromise => {
      resultPromise.map(async (item: Result) => {
        console.log(item);
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

        setImages(oldProducts => [
          ...oldProducts,
          { data: item, image: result },
        ]);
      });
    });
  }, []);
  console.log(images);
  return (
    <div>
      <h1>UploadedProducts</h1>
    </div>
  );
}
