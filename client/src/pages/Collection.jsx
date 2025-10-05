import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Minus,
  Plus,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/common/ProductCard';
import 'rc-slider/assets/index.css';
import { Range } from 'react-range';

const sizes = ['Small', 'Large', 'Extra Large'];

function Collection() {
  const { category, subCategory } = useParams();
  const { filteredData, handleFilterProduct, products, categories } = useContext(ProductContext);
  const [sortdata, setsortData] = useState('');
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    size: true,
    availability: true,
  });
  const [openCategories, setOpenCategories] = useState({});
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [availability, setAvailability] = useState({
    inStock: true,
    outOfStock: true,
  });
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    handleFilterProduct(category, subCategory, sortdata, priceRange, availability);
  }, [category, subCategory, sortdata, priceRange, availability, products]);

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleCategory = (name) => {
    setOpenCategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Number(value);
    setPriceRange(newRange);
  };

  const toggleAvailability = (type) => {
    setAvailability((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // ✅ Transform categories and product data for dynamic sidebar
  const categoriesData = useMemo(() => {
    return categories.map((cat) => {
      const categoryProducts = products.filter(
        (product) => product.category?.name === cat.name || product.category === cat._id
      );

      const subcategoryCounts = {};
      categoryProducts.forEach((product) => {
        const sub = product.subcategory?.name || product.subcategory;
        if (sub) {
          subcategoryCounts[sub] = (subcategoryCounts[sub] || 0) + 1;
        }
      });

      return {
        name: cat.name,
        count: categoryProducts.length,
        children: cat.subcategories.map((sub) => ({
          name: sub.name,
          count: subcategoryCounts[sub.name] || 0,
        })),
      };
    });
  }, [categories, products]);

  return (
    <div>
      <Breadcrumb page="collection" label={category} />

      {/* Mobile Toggle Button */}
      <div className="md:hidden flex justify-between items-center px-4 mt-4">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? <X size={24} /> : <SlidersHorizontal size={24} />}
        </button>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-7 gap-4 mt-5">
        {/* Sidebar */}
        <div
          className={`md:col-span-2 border border-gray-300 p-4 space-y-6 text-sm bg-white z-10 md:static h-fit ${
            showSidebar ? 'block' : 'hidden'
          } md:block`}
        >
          {/* Categories */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold uppercase">Categories</h2>
              <button onClick={() => toggleSection('categories')}>
                {openSections.categories ? <Minus size={16} /> : <Plus size={16} />}
              </button>
            </div>
            {openSections.categories && (
              <ul className="space-y-2">
                {categoriesData.map((cat) => (
                  <li key={cat.name}>
                    <Link
                      to={`/${cat.name}`}
                      onClick={() => toggleCategory(cat.name)}
                      className="w-full capitalize flex justify-between items-center text-left hover:text-blue-600"
                    >
                      <span className={`${cat.count > 0 ? 'text-black' : 'text-gray-500'}`}>
                        {cat.name} ({cat.count})
                      </span>
                      {cat.children.length > 0 &&
                        (openCategories[cat.name] ? (
                          <ChevronDown size={14} />
                        ) : (
                          <ChevronRight size={14} />
                        ))}
                    </Link>

                    {cat.children.length > 0 && openCategories[cat.name] && (
                      <ul className="ml-4 mt-1 capitalize space-y-1 text-gray-600">
                        {cat.children.map((sub) => (
                          <li key={sub.name}>
                            <Link to={`/${cat.name}/${sub.name}`}>
                              {sub.name} ({sub.count})
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price Filter */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold uppercase">Price</h2>
              <button onClick={() => toggleSection('price')}>
                {openSections.price ? <Minus size={16} /> : <Plus size={16} />}
              </button>
            </div>
            {openSections.price && (
              <div className="space-y-2">
                <Range
                  step={20}
                  min={0}
                  max={1000}
                  values={priceRange}
                  onChange={(values) => setPriceRange(values)}
                  renderTrack={({ props, children }) => (
                    <div {...props} className="h-1 bg-gray-300 relative">
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div {...props} className="h-4 w-4 bg-blue-600 rounded-full" />
                  )}
                />
                <div className="flex items-center gap-2 md:flex-col lg:flex-row">
                  <input
                    type="number"
                    min={0}
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(0, e.target.value)}
                    className="border px-2 py-1 w-20 text-sm border-gray-300 focus:outline-none"
                  />
                  <span>To</span>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max={1000}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(1, e.target.value)}
                    className="border px-2 py-1 w-20 text-sm border-gray-300 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Size Filter */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold uppercase">Size</h2>
              <button onClick={() => toggleSection('size')}>
                {openSections.size ? <Minus size={16} /> : <Plus size={16} />}
              </button>
            </div>
            {openSections.size && (
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`border border-gray-300 px-2 py-1 text-xs ${
                      selectedSizes.includes(size)
                        ? 'bg-black text-white'
                        : 'text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold uppercase">Availability</h2>
              <button onClick={() => toggleSection('availability')}>
                {openSections.availability ? <Minus size={16} /> : <Plus size={16} />}
              </button>
            </div>
            {openSections.availability && (
              <div className="space-y-1">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={availability.inStock}
                    onChange={() => toggleAvailability('inStock')}
                  />
                  In stock
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={availability.outOfStock}
                    onChange={() => toggleAvailability('outOfStock')}
                  />
                  Out of stock
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Product Display */}
        <div className="md:col-span-5">
          <div className="flex justify-between border border-gray-300 py-3 px-4">
            <div className="text-gray-600 font-light text-sm">
              <span>Sort by: </span>
              <select
                value={sortdata}
                onChange={(e) => setsortData(e.target.value)}
                className="border border-gray-300 focus:outline-none p-2"
              >
                <option value="">Featured</option>
                <option value="popular">Popularity</option>
                <option value="priceInc">Price, low to high</option>
                <option value="priceDec">Price, high to low</option>
                <option value="ratingInc">Rating, low to high</option>
                <option value="ratingDec">Rating, high to low</option>
              </select>
            </div>
            <div className="text-gray-600 font-light text-sm">
              <span>Show: </span>
              <select className="border border-gray-300 focus:outline-none p-2">
                <option value="">5</option>
                <option value="">15</option>
                <option value="">25</option>
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap- mt-5">
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div key={index}>
                  <ProductCard productData={item} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
