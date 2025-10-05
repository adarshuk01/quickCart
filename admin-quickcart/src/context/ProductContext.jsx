// context/ProductContext.js
import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null); // For edit mode


  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add product with images (FormData)
  const addProduct = async (formData) => {
    try {
      const res = await axiosInstance.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProducts(prev => [...prev, res.data]);
      return { success: true };
    } catch (err) {
      console.error('Error adding product:', err);
      return {
        success: false,
        error: err.response?.data?.error || 'Something went wrong',
      };
    }
  };


  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const updateProduct = async (id, formData) => {
    try {
      const res = await axiosInstance.put(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProducts(prev =>
        prev.map(p => (p._id === id ? res.data : p))
      );

      return { success: true };
    } catch (err) {
      console.error('Update error:', err);
      return { success: false, error: err.response?.data?.error || 'Update failed' };
    }
  };

  const [aiDescription, setaiDescription] = useState('');



  const fetchDescription = async (prompt) => {
    setLoading(true)
    try {
      const res = await axiosInstance.post('http://localhost:5000/api/gemini', {
        prompt: `only give 4 detailed points about features of ${prompt}, no other text required give response as ul li format`,
      });
      return res.data.response; // return this instead of setting to context
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false)
    }
  };

  function buildImagePrompt(productName) {
    const lower = productName.toLowerCase();

    let detailInstructions;

    if (/(apple|banana|orange|grape|fruit|mango|berry)/.test(lower)) {
      // Fruits
      detailInstructions = `
    First image: A basket or bowl overflowing with ${productName}s.
    Second image: A single ${productName} isolated on a clean background.
    Third image: The ${productName} sliced or arranged to show its interior.
    `.trim();
    } else if (/(phone|laptop|camera|tv|electronics|headphone|speaker|tablet)/.test(lower)) {
      // Electronics
      detailInstructions = `
    First image: Front view showing the main controls and branding.
    Second image: Side/profile view highlighting thickness and shape.
    Third image: Rear or ports view to show connectivity.
    `.trim();
    } else if (/(bread|milk|cereal|grocery|snack|beverage|ingredient)/.test(lower)) {
      // Groceries
      detailInstructions = `
    First image: Packaged product on a countertop.
    Second image: The item removed from its packaging.
    Third image: Several of them arranged as if in a grocery basket.
    `.trim();
    } else if (/(chair|sofa|table|bed|furniture|couch|desk|cabinet)/.test(lower)) {
      // Furniture
      detailInstructions = `
    First image: The ${productName} staged in a simple room setting.
    Second image: A close‑up detail of the material or craftsmanship.
    Third image: A different angle showing overall form.
    `.trim();
    } else {
      // Default: 3‑angle studio shots
      detailInstructions = `
    First image: Front view with good lighting.
    Second image: Side view to show depth and profile.
    Third image: Rear or angled view showing any back details.
    `.trim();
    }

    return `
Generate three high‑quality images of “${productName}” on a clean, neutral background:
${detailInstructions}
Ensure consistent, natural lighting and realistic shadows across all images.
  `.trim();
  }


  const [generatedImages, setGeneratedImages] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  const fetchGeneratedImages = async (prompt) => {
    console.log('product name', prompt);

    setImageLoading(true);
    try {
      const res = await axiosInstance.post('http://localhost:5000/api/gemini/generate-image', {
        prompt: `Generate three high-quality background removed images of a ${prompt} placed on a clean, neutral background.

First image: A single product in a front view, clearly showing the main design and control buttons.

Second image: A group of the same products arranged together to showcase quantity or variety.

Third image: A side view of a single product, highlighting its depth and shape.

Ensure consistent lighting and realistic shadows for all angles.`,
      });

      const parts = res.data.parts;

      const imageFiles = parts
        .filter(part => part.inlineData)
        .map((part, index) => {
          const { mimeType, data } = part.inlineData;
          const blob = b64toBlob(data, mimeType);
          const file = new File([blob], `ai-image-${index}.png`, { type: mimeType });
          return {
            uid: `ai-${index}`,
            name: file.name,
            status: 'done',
            originFileObj: file,
            url: URL.createObjectURL(file),
          };
        });

      setGeneratedImages(imageFiles);
      return imageFiles;
    } catch (error) {
      console.error('AI Image generation failed:', error);
      throw error;
    } finally {
      setImageLoading(false);
    }
  };

  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const [filteredProduct,setfilteredProduct]=useState([])

  const searchAndFilter =async(name)=>{
    try {
      const res=await axiosInstance.get(`/products/search?name=${name}`)
      console.log(res.data);
      setfilteredProduct(res.data)
      
    } catch (error) {
      console.log(error);
      
      
    }
  }



  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, loading, updateProduct, fetchProducts, fetchDescription, aiDescription, fetchGeneratedImages, generatedImages, imageLoading, setProductToEdit, productToEdit,searchAndFilter,filteredProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
