import { createContext, useEffect, useState } from "react";
import { productData } from "../assets/Data/productData";
import axios from "axios";
import useAxios from "../Hooks/useAxios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [compareData, setCompareData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
   const axios = useAxios();


  const [categories, setcategories] = useState([])

  // fetch category 
  const fetchcategory = async () => {
    try {
      const res = await axios.get('/categories')
      setcategories(res.data)

    } catch (error) {
      console.log(error);

    }
  }

  const [products, setproducts] = useState([]);
  const [singleProduct,setsingleProduct]=useState('')

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products')
      console.log(res);

      setproducts(res.data)

    } catch (error) {
      console.log(error);

    }
  }

  const fetchProductsbyid = async (id) => {
    try {
      const res = await axios.get(`/products/${id}`)
      console.log(res);

      setsingleProduct(res.data)

    } catch (error) {
      console.log(error);

    }
  }
  console.log("products", products);





  const compareProducts = (id) => {
    console.log('compareid', id);

    // Check if the product already exists
    const alreadyExists = compareData.some((item) => item._id === id);
    if (!alreadyExists) {
      const productToAdd = products.find((item) => item._id === id);
      if (productToAdd) {
        setCompareData((prev) => [...prev, productToAdd]);
      }
    }
  };

  const removeproduct = (id) => {
    setCompareData(prev => prev.filter(items => items._id != id))
  }

  const handleFilterProduct = (category, subCategory, sortdata, priceRange, availability) => {
    console.log(category, subCategory, sortdata, priceRange, availability);

    let filtered = products;
    console.log('filtered', filtered);


    // Filter by category
    if (category) {
      filtered = filtered.filter(item => item.category?.name === category);

    }

    // Filter by subcategory
    if (subCategory) {
      filtered = filtered?.filter(item => item.subcategory === subCategory);
    }

    // Filter by price range
    const [minPrice, maxPrice] = priceRange;
    filtered = filtered?.filter(item => item.price >= minPrice && item.price <= maxPrice);

    // Filter by availability
    filtered = filtered?.filter(item => {
      if (availability.inStock && item.stock > 0) return true;
      if (availability.outOfStock && item.stock === 0) return true;

      return false;
    });



    // Sorting
    switch (sortdata) {
      case 'ratingInc':
        filtered = filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'ratingDec':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'priceInc':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDec':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredData(filtered);
  };




  console.log(filteredData);

  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchDiscounts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/discounts/active');
      console.log(res);

      setDiscounts(res.data);
    } catch (error) {
      message.error('Failed to fetch discounts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [discount, setDiscount] = useState([]);


  const fetchDiscountbyid = async (id) => {
    console.log('id',id);
    
    setLoading(true);
    try {
      const res = await axios.get(`/discounts/${id}`);
      console.log(res);

      setDiscount(res.data);
    } catch (error) {
     
      console.error(error);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    fetchcategory()
    fetchProducts()
    fetchDiscounts()

  }, [])




  return (
    <ProductContext.Provider value={{ compareData, compareProducts, removeproduct, handleFilterProduct, filteredData, categories, products, fetchProducts, discounts,discount ,fetchDiscountbyid,fetchProductsbyid,singleProduct}}>
      {children}
    </ProductContext.Provider>
  );
};
