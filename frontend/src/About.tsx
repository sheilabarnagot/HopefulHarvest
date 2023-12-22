import React from 'react';
import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <Box maxW="800px" m="auto" p="4">
      <Heading as="h1" mb="4">
        About Us
      </Heading>
      <Text>
        Welcome to HopefulHarvest, a project founded by two passionate web
        programming students, Pontus and Sheila. Our journey began with a shared
        vision to create a platform that makes a positive impact on the lives of
        individuals facing challenges in selling their unique products.
      </Text>
      <Heading as="h2" mt="4" mb="2" fontWeight="bold">
        Our Mission
      </Heading>
      <Text>
        At HopefulHarvest, our mission is rooted in the belief that everyone
        deserves the opportunity to showcase and sell their creations,
        regardless of the obstacles they may encounter. We aim to empower
        individuals who, for various reasons, find it challenging to navigate
        the traditional avenues of product sales.
      </Text>
      <Heading as="h2" mt="4" mb="2" fontWeight="bold">
        Facilitating Sales with Ease
      </Heading>
      <Text>
        HopefulHarvest acts as a bridge, connecting talented creators with
        potential buyers. Whether you're an artist, crafter, or entrepreneur,
        our platform is designed to streamline the selling process, making it
        simple and accessible for all.
      </Text>
      <Heading as="h2" mt="4" mb="2" fontWeight="bold">
        How It Works
      </Heading>
      <Text>
        1. Create Your Storefront: Easily set up your personalized storefront on
        HopefulHarvest, showcasing your products with detailed descriptions and
        images.
      </Text>
      <Text>
        2. Connect with Buyers: Engage with a community of buyers who appreciate
        the value of unique, handcrafted items. Build relationships and grow
        your customer base.
      </Text>
      <Text>
        3. Secure Transactions: Our platform ensures secure and hassle-free
        transactions, providing peace of mind to both sellers and buyers.
      </Text>
      <Text mt="4">
        Thank you for being a part of our journey!
      </Text>
      <Text mt="4">
        By becoming a part of HopefulHarvest, you're not just joining a
        platform; you're joining a community of like-minded individuals who
        share a passion for creativity and entrepreneurship. Together, we can
        make a difference in the lives of those striving to bring their
        creations to the world.
      </Text>
      <Text mt="4">
        Thank you for being a vital part of our journey. We look forward to
        seeing your unique creations and contributing to the success of
        HopefulHarvest. P&S Founder & co-founder, HopefulHarvest
      </Text>
    </Box>
  );
};

export default About;
