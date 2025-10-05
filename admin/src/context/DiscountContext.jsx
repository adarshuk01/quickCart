import React, { createContext, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { message } from 'antd';
import axios from 'axios';

export const DiscountContext = createContext();

export const DiscountProvider = ({ children }) => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDiscounts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/discounts');
      setDiscounts(res.data);
    } catch (error) {
      message.error('Failed to fetch discounts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 const addDiscount = async (formData) => {
    try {
      const res = await axiosInstance.post('/discounts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDiscounts(prev => [...prev, res.data]);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to add discount',
      };
    }
  }; 

  const updateDiscount = async (id, data) => {
    try {
      const res = await axiosInstance.put(`/discounts/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return { success: true, data: res.data };
    } catch (error) {
      console.error(error);
      return { success: false, error: error?.response?.data?.message || 'Error updating discount' };
    }
  };

  const deleteDiscount = async (id) => {
    try {
      await axiosInstance.delete(`/discounts/${id}`);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: error?.response?.data?.message || 'Error deleting discount' };
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
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};


  const generateDiscountImage = async (title) => {
    try {
      const res = await axios.post('http://localhost:5000/api/gemini/generate-image', {
      prompt: `Generate a high-quality, eye-catching promotional graphic image in landscape mode with a fixed size of 454 × 288 pixels for an offer titled "${title}". 
The design should visually reflect the theme or context of the title — whether it's a festival, product, category, or seasonal offer. 
Include relevant elements such as product visuals, festive symbols, or category icons to make the image more appealing. 
You may creatively enhance or slightly modify the title text in the design to improve visual impact.` })


      const parts = res.data.parts;

      const firstPart = parts.find(part => part.inlineData);
      if (!firstPart) return null;

      const { mimeType, data } = firstPart.inlineData;
      const blob = b64toBlob(data, mimeType);
      const file = new File([blob], `discount-ai.png`, { type: mimeType });

      return {
        uid: 'discount-ai',
        name: file.name,
        status: 'done',
        originFileObj: file,
        url: URL.createObjectURL(file),
      };
    } catch (err) {
      console.error('AI discount image generation failed:', err);
      return null;
    }
  };



  return (
    <DiscountContext.Provider
      value={{
        discounts,
        fetchDiscounts,
        addDiscount,
        updateDiscount,
        deleteDiscount,
        loading,
        generateDiscountImage
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
};
