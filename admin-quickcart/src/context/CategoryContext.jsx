// context/ProductContext.js
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';


export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {

    const [categories, setcategories] = useState([])
    const [singleCategories, setsingleCategories] = useState([])


    const fetchCategory = async () => {
        try {
            const res = await axiosInstance.get('/categories')
            console.log(res.data);
            setcategories(res.data)

        } catch (error) {
            console.log(error);

        }
    }

    const fetchCategorybyid = async (id) => {
        try {
            const res = await axiosInstance.get(`/category/${id}`)
            console.log(res.data);
            setsingleCategories(res.data)

        } catch (error) {
            console.log(error);

        }
    }

    const addCategory = async (formData) => {
        try {
            const res = await axiosInstance.post('/category', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            console.log(res);
            fetchCategory()

        } catch (error) {
            console.log(error);

        }
    }


    const addSubcategory = async (categoryId, name) => {
        try {
            await axiosInstance.post(`/category/${categoryId}/subcategory`, { name });

            fetchCategory()
            fetchCategorybyid(categoryId);
        } catch (err) {
            console.log(err?.response?.data?.message || 'Failed to add subcategory');
        }
    };


    const editCategory = async (categoryId, formData) => {
        console.log(categoryId);

        try {

            const res = await axiosInstance.patch(`/category/${categoryId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            console.log(res);


        } catch (error) {
            console.log(error);

        }
    }


    const deleteSubcategory = async (categoryId, subcategoryId) => {
        try {
            await axiosInstance.delete(`/category/${categoryId}/subcategory/${subcategoryId}`);
            fetchCategory()
            fetchCategorybyid(categoryId);
        } catch (err) {
            console.log(err?.response?.data?.message || 'Failed to add subcategory');
        }
    };

    const editSubcategory = async (categoryId, subcategoryId, name) => {
        try {
            await axiosInstance.patch(`/category/${categoryId}/subcategory/${subcategoryId}`, { name });
            fetchCategory()
            fetchCategorybyid(categoryId);
        } catch (err) {
            console.log(err?.response?.data?.message || 'Failed to add subcategory');
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            await axiosInstance.delete(`/category/${categoryId}`);
            fetchCategory(); // refresh
        } catch (err) {
            console.log(err?.response?.data?.message || 'Failed to add subcategory');
        }
    };


    return (
        <CategoryContext.Provider
            value={{ addCategory, fetchCategory, editCategory, categories, fetchCategorybyid, singleCategories, addSubcategory, editSubcategory, deleteSubcategory,deleteCategory }}
        >
            {children}
        </CategoryContext.Provider>
    );
};
