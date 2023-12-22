import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const token = 'your_access_token';

    fetch('https://fakestoreapi.com/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      <div>
        {products?.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: '100px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
