import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center fixed bottom-0 w-full">
      <div className="flex justify-center space-x-4">
        <a href="/about" className="hover:text-gray-500">
          About
        </a>
        <a href="/shop" className="hover:text-gray-500">
          Shop
        </a>
        <a href="/blog" className="hover:text-gray-500">
          Blog
        </a>
        <a href="/contact" className="hover:text-gray-500">
          Contact Us
        </a>
        <a href="/terms" className="hover:text-gray-500">
          Terms
        </a>
        <a href="/privacy" className="hover:text-gray-500">
          Privacy
        </a>
      </div>
      <p className="mt-4">&copy; 2023 Hopeful Harvest. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

// import React from 'react';
// import { Box, Text } from '@chakra-ui/react';

// const Footer: React.FC = () => {
//   return (
//     <Box p={4} bg="gray.200">
//       <Text>Copyright © 2023. All rights reserved.</Text>
//     </Box>
//   );
// };

// export default Footer;
