import React from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import SearchFilter from '../components/SearchFilter';
import CategorySlider from '../components/CategorySlider';
import PropertyList from '../components/PropertyList';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <SearchFilter />
      <CategorySlider />
      <PropertyList />
      <Footer />
    </>
  );
}