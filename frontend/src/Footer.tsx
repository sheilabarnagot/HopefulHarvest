import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onTermsClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onTermsClick }) => {
  const handleClick = () => {
    console.log("Terms clicked");
    onTermsClick();
  };

  return (
    <footer className="bg-gray-800 text-white p-4 text-center fixed bottom-0 w-full">
      <div className="flex justify-center space-x-4">
        <Link to="/about" className="hover:text-gray-500">
          About
        </Link>
        <Link to="/shop" className="hover:text-gray-500">
          Shop
        </Link>
        <Link to="/blog" className="hover:text-gray-500">
          Blog
        </Link>
        <Link to="/contact" className="hover:text-gray-500">
          Contact Us
        </Link>
        <Link to="/terms" className="hover:text-gray-500" onClick={handleClick}>
          Terms
        </Link>
        <Link to="/privacy" className="hover:text-gray-500">
          Privacy
        </Link>
      </div>
      <p className="mt-4">&copy; 2023 Hopeful Harvest. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
