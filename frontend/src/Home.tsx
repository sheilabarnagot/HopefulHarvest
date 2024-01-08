import { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Text, Image } from '@chakra-ui/react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box p={4} maxW="800px">
        <Box mb={4} mt={4} py={2} textAlign="center">
          <Heading>Shop</Heading>
        </Box>
        <SimpleGrid columns={2} gap={24}>
          {products?.map((product) => (
            <Box key={product.id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={product.image} alt={product.title} maxW="100%" />
              <Box p="6">
                <Heading as="h2" size="md" mb={2}>
                  {product.title}
                </Heading>
                <Text fontSize="sm" mb={2}>
                  {product.description}
                </Text>
                <Text fontWeight="bold">${product.price}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default Home;
