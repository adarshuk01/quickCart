import React, { useState, useContext, useEffect } from 'react';
import Button from '../../common/Button';
import InputField from '../../common/InputField';
import { DiscountContext } from '../../context/DiscountContext';
import { ProductContext } from '../../context/ProductContext';

function AddCoupons({ editId,onSaveSuccess  }) {
    const {
        addDiscount,
        updateDiscount,
        generateDiscountImage,
        fetchdiscountbyid,
        singleDiscount
    } = useContext(DiscountContext);

    const { searchAndFilter, filteredProduct } = useContext(ProductContext);

    const [couponType, setCouponType] = useState('Fixed Discount');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [noDuration, setNoDuration] = useState(false);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [appliesTo, setAppliesTo] = useState('');
    const [usageLimit, setUsageLimit] = useState('');
    const [noLimit, setNoLimit] = useState(false);
    const [aiImage, setAiImage] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productName, setProductname] = useState('');

    const couponToEdit = Boolean(editId);

    useEffect(() => {
        if (editId) {
            fetchdiscountbyid(editId);
        }
    }, [editId]);

    useEffect(() => {
        if (singleDiscount && couponToEdit) {
            setCode(singleDiscount.code || '');
            setName(singleDiscount.title || '');
            setCouponType(singleDiscount.type || 'Fixed Discount');
            setValue(singleDiscount.value || '');
            setAppliesTo(singleDiscount.appliesTo || '');
            setStartDate(singleDiscount.startDate ? singleDiscount.startDate.split('T')[0] : '');
            setEndDate(singleDiscount.endDate ? singleDiscount.endDate.split('T')[0] : '');
            setUsageLimit(singleDiscount.usageLimit || '');
            setSelectedProducts(singleDiscount.products || []);
            if (singleDiscount.image) {
                setAiImage({ url: singleDiscount.image });
            }
        }
    }, [singleDiscount]);

    useEffect(() => {
        searchAndFilter(productName);
    }, [productName]);

    const couponTypes = [
        { label: 'fixed', icon: '💰' },
        { label: 'percentage', icon: '📦' },
        { label: 'Free Shipping', icon: '🚚' },
        { label: 'Price Discount', icon: '🏷️' },
    ];

    const handleGenerateImage = async () => {
        if (!name) return alert('Enter a discount name first');
        setLoadingImage(true);
        const image = await generateDiscountImage(name);
        if (image) {
            setAiImage(image);
        }
        setLoadingImage(false);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        const formattedProducts = selectedProducts.map(p => p._id || p);

        formData.append('code', code);
        formData.append('title', name);
        formData.append('type', couponType);
        formData.append('value', value);

        formattedProducts.forEach(id => {
            formData.append('products[]', id);
        });

        formData.append('appliesTo', appliesTo);
        formData.append('isActive', true);
        formData.append('startDate', noDuration ? '' : startDate);
        formData.append('endDate', noDuration ? '' : endDate);
        formData.append('usageLimit', noLimit ? '' : usageLimit);

        if (aiImage?.originFileObj) {
            formData.append('image', aiImage.originFileObj);
        }

        let res;
        if (couponToEdit) {
            res = await updateDiscount(editId, formData);
        } else {
            res = await addDiscount(formData);
        }

       if (res.success) {
      alert(`Discount ${couponToEdit ? 'updated' : 'added'} successfully!`);
      if (onSaveSuccess) onSaveSuccess(); // 👈 go back to table
    } else {
      alert(res.error);
    }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-[24px] font-bold">
                    {couponToEdit ? 'Edit Discount' : 'Create Discount'}
                </h1>
                <div className="flex gap-2">
                    <Button label="Cancel" variant="outlined" />
                    <Button label="Save" variant="filled" onClick={handleSubmit} />
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-7 gap-3'>
                {/* Coupon Information */}
                <div className='bg-white space-y-8 px-8 py-6 rounded-xl shadow-sm col-span-4 h-fit'>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Discount Code" placeholder="Shipfree20" value={code} onChange={e => setCode(e.target.value)} />
                        <InputField label="Discount Name" placeholder="Free Shipping" value={name} onChange={e => setName(e.target.value)} />
                    </div>

                    {/* Coupon Type */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Discount Type</h3>
                        <p className="text-sm text-gray-500">Type of coupon you want to create</p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {couponTypes.map((type) => (
                                <button
                                    key={type.label}
                                    className={`border rounded-lg py-4 text-center text-sm font-medium ${couponType === type.label ? 'border-blue-500 text-blue-600' : 'border-gray-300 text-gray-600'}`}
                                    onClick={() => setCouponType(type.label)}
                                >
                                    <div className="text-2xl mb-2">{type.icon}</div>
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Discount value and applicability */}
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Discount Value" placeholder="Amount" value={value} onChange={e => setValue(e.target.value)} />
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Applies to</label>
                            <select
                                className="border border-gray-300 rounded px-3 py-3 focus:outline-none text-sm"
                                value={appliesTo}
                                onChange={(e) => setAppliesTo(e.target.value)}
                            >
                                <option value="">Choose</option>
                                <option value="all">All Products</option>
                                <option value="category">Specific Category</option>
                            </select>
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label={'Start Date'} type="date" disabled={noDuration} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <InputField label={'End Date'} type="date" disabled={noDuration} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <div className="flex items-center gap-2 col-span-2">
                            <input type="checkbox" id="no-duration" checked={noDuration} onChange={() => setNoDuration(!noDuration)} />
                            <label htmlFor="no-duration" className="text-sm text-gray-600">Don't set duration</label>
                        </div>
                    </div>

                    {/* Image & Usage Limit */}
                    <div className=' gap-4 items-center'>
                        <div>
                            {aiImage?.url && (
                                <img src={aiImage.url} alt="Generated Poster" className="mb-2 rounded w-full h-full object-cover" />
                            )}
                            <Button
                                label={loadingImage ? 'Generating...' : 'GENERATE POSTER WITH AI'}
                                variant='outlined'
                                onClick={handleGenerateImage}
                                disabled={loadingImage}
                            />
                        </div>

                       
                    </div>
                </div>

                {/* Product Selection */}
                {/* Product Selection */}
                <div className='col-span-3 bg-white h-fit px-4 py-6 rounded-xl shadow-sm'>
                    <h3 className='mb-2 font-semibold'>Select Products for Discount</h3>

                   

                    {/* Search */}
                    <div className='space-y-2'>
                        <InputField
                            onChange={(e) => setProductname(e.target.value)}
                            placeholder={'Search Products'}
                        />

                        {/* Grid of Products (selected on top) */}
                        <div className='grid grid-cols-2 gap-4'>
                            {[
                                // First selected, then unselected
                                ...selectedProducts,
                                ...filteredProduct.filter(
                                    p => !selectedProducts.some(sel => sel._id === p._id)
                                )
                            ].map(item => {
                                const isSelected = selectedProducts.some(p => p._id === item._id);
                                return (
                                    <div
                                        key={item._id}
                                        className={`flex items-center gap-2 p-2 shadow rounded cursor-pointer ${isSelected ? 'border border-blue-500 bg-blue-50' : ''
                                            }`}
                                        onClick={() => {
                                            setSelectedProducts(prev => {
                                                if (prev.some(p => p._id === item._id)) {
                                                    // Remove
                                                    return prev.filter(p => p._id !== item._id);
                                                } else {
                                                    // Add full object
                                                    return [...prev, item];
                                                }
                                            });
                                        }}
                                    >
                                        <img
                                            width={70}
                                            className='h-[70px] rounded-full object-cover'
                                            src={item.images[0]}
                                            alt={item.name}
                                        />
                                        <h3 className='text-xs'>{item.name}</h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AddCoupons;
