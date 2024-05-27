import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BlogProvider from "./store/blog-provider";
import { ChakraProvider } from '@chakra-ui/react';
import Footer from './components/Footer';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BlogProvider>
      <ChakraProvider>
        <App />
        <Footer />
      </ChakraProvider>
    </BlogProvider>
  </React.StrictMode>
);
