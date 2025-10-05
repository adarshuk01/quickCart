// context/ProductContext.js
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { message } from 'antd';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryError, setCategoryError] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const handleInputChange = (e) => {
        setCategoryName(e.target.value);
        setCategoryError(null);
    };

    const fetchCategories = async () => {
        try {
            const res = await axiosInstance.get('/categories');
            setCategories(res.data || []);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const handleAddCategory = async () => {
        if (!categoryName.trim()) {
            setCategoryError('Category name is required');
            return false;
        }

        setConfirmLoading(true);
        try {
            await axiosInstance.post('/category', { name: categoryName });
            setCategoryName('');
            setCategoryError(null);
            fetchCategories(); // refresh
            return true;
        } catch (err) {
            setCategoryError(err?.response?.data?.message || 'Failed to add category');
            return false;
        } finally {
            setConfirmLoading(false);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            await axiosInstance.delete(`/category/${categoryId}`);
            message.success('Category deleted successfully');
            fetchCategories(); // refresh
        } catch (err) {
            message.error(err?.response?.data?.message || 'Failed to delete category');
        }
    };


    const [subcategoryInputs, setSubcategoryInputs] = useState({});

    const handleSubcategoryInputChange = (categoryId, value) => {
        setSubcategoryInputs((prev) => ({ ...prev, [categoryId]: value }));
    };

    const addSubcategory = async (categoryId) => {
        const name = subcategoryInputs[categoryId]?.trim();
        if (!name) return;

        try {
            await axiosInstance.post(`/category/${categoryId}/subcategory`, { name });
            message.success('Subcategory added');
            setSubcategoryInputs((prev) => ({ ...prev, [categoryId]: '' }));
            fetchCategories();
        } catch (err) {
            message.error(err?.response?.data?.message || 'Failed to add subcategory');
        }
    };

    const deleteSubcategory = async (categoryId, subcategoryId) => {
        try {
            await axiosInstance.delete(`/category/${categoryId}/subcategory/${subcategoryId}`);
            message.success('Subcategory removed');
            fetchCategories();
        } catch (err) {
            message.error(err?.response?.data?.message || 'Failed to delete subcategory');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider
            value={{
                categoryName,
                categoryError,
                confirmLoading,
                handleInputChange,
                handleAddCategory,
                deleteCategory,
                categories,
                subcategoryInputs,
                handleSubcategoryInputChange,
                addSubcategory,
                deleteSubcategory,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};
