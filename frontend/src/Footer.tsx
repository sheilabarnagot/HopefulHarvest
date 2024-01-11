import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './openModal';
import { useDisclosure } from '@chakra-ui/react';

const Footer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="flex justify-center space-x-4">
        <Link id="about-link" to="/about" className="hover:text-gray-500">
          About
        </Link>
        <Link id="shop-link" to="/shop" className="hover:text-gray-500">
          Shop
        </Link>
        <Link id="blog-link" to="/about" className="hover:text-gray-500">
          Blog
        </Link>
        <Link id="contact-link" to="/contact" className="hover:text-gray-500">
          Contact Us
        </Link>
        <span id="terms-link" onClick={onOpen} className="hover:text-gray-500">
          Terms & privacy
        </span>

        <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </div>
      <p className="mt-4">&copy; 2023 Hopeful Harvest. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
