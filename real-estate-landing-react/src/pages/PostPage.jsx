// src/pages/PostPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyForm from './PropertyForm';

export default function PostPage() {
   return (
      <>
        <Navbar />        
        <PropertyForm />       
        <Footer />
      </>
    );
  }