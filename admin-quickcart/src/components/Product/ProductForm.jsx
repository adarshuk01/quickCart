import React, {
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
    useContext,
    useEffect,
} from 'react';
import InputField from '../../common/InputField';
import ToggleSwitch from '../../common/ToggleSwitch';
import Button from '../../common/Button';
import TinyMCEEditor from '../../common/TinyMCEEditor';
import { ProductContext } from '../../context/ProductContext';
import { FiX } from 'react-icons/fi';

const ProductForm = forwardRef(({ initialData, selectedCategoryId, setSelectedCategoryId, selectedSubcategoryId, setSelectedSubcategoryId }, ref) => {
    const { fetchGeneratedImages, imageLoading, generatedImages, fetchDescription ,loading} =
        useContext(ProductContext);

    const fileInputRef = useRef(null);

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [stock, setStock] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [weight, setWeight] = useState('');
    const [country, setCountry] = useState('');
    const [isTaxApplied, setIsTaxApplied] = useState(false);
    const [hasOptions, setHasOptions] = useState(false);
    const [isDigitalItem, setIsDigitalItem] = useState(false);

    const allSizes = ['S', 'M', 'L', 'XL'];

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const previews = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setSelectedImages((prev) => [...prev, ...previews]);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSelect = (e) => {
        const value = e.target.value;
        if (value && !selectedSizes.includes(value)) {
            setSelectedSizes([...selectedSizes, value]);
        }
    };

    const removeSize = (sizeToRemove) => {
        setSelectedSizes(selectedSizes.filter((size) => size !== sizeToRemove));
    };

    const handleGenerateImages = async (e) => {
        e.preventDefault();
        const trimmedName = productName.trim();
        console.log("Generating with name:", trimmedName);

        if (!trimmedName) {
            alert('Please enter a product name before generating images.');
            return;
        }

        try {
            const aiImages = await fetchGeneratedImages(trimmedName);
            const converted = aiImages.map((img) => ({
                file: img.originFileObj || null,
                url: img.url,
            }));
            setSelectedImages((prev) => [...prev, ...converted]);
        } catch (err) {
            console.error("Image generation error:", err);
            alert("Image generation failed.");
        }
    };

    const handleGenerateDescription = async () => {
        const trimmedName = productName.trim();
        if (!trimmedName) {
            alert('Please enter a product name before generating description.');
            return;
        }

        try {
            const aiDescription = await fetchDescription(trimmedName);
            setProductDescription(aiDescription); // 🔥 Set generated description
        } catch (error) {
            alert('Failed to generate description.');
        }
    };

    useImperativeHandle(ref, () => ({
  getFormData: () => {
    const newImages = selectedImages
      .filter((img) => img.file !== null)
      .map((img) => img.file);
    const existingImageUrls = selectedImages
      .filter((img) => img.file === null)
      .map((img) => img.url);

    return {
      productName,
      productDescription,
      productPrice,
      stock,
      selectedSizes,
      newImages,
      existingImageUrls,
      weight,
      country,
      isTaxApplied,
      hasOptions,
      isDigitalItem,
      category: selectedCategoryId,
      subcategory: selectedSubcategoryId,
    };
  },
}));


    useEffect(() => {
  if (initialData) {
    setProductName(initialData.name || '');
    setProductDescription(initialData.description || '');
    setProductPrice(initialData.price || '');
    setStock(initialData.stock || '');
    setSelectedSizes(initialData.sizes || []);
    setWeight(initialData.weight || '');
    setCountry(initialData.country || '');
    setIsTaxApplied(initialData.tax || false);
    setHasOptions(initialData.hasOptions || false);
    setIsDigitalItem(initialData.isDigitalItem || false);
    setSelectedImages(
      (initialData.images || []).map(url => ({ file: null, url }))
    );

    if (initialData.category) setSelectedCategoryId(initialData.category);
    if (initialData.subcategory) setSelectedSubcategoryId(initialData.subcategory);
  }
}, [initialData]);


    return (
        <div className="bg-white px-6 py-4 rounded-2xl shadow-sm mt-2">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <InputField
                    label="Product Name"
                    id="productName"
                    name="productName"
                    placeholder="Summer T-Shirt"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <div className="flex flex-col gap-1">
                    <div className='flex items-center justify-between flex-wrap gap-2'>
                        <label>Product description</label>

                        <Button
                            variant="outlined"
                            label={loading ? 'Generating...' : 'GENERATE WITH AI'}
                            onClick={handleGenerateDescription}
                        />


                    </div>


                    <TinyMCEEditor
                        value={productDescription}
                        onChange={setProductDescription}
                    />
                </div>

                <hr className="border border-gray-200 my-10" />
                <div className="flex flex-col gap-1">
                    <label className="font-semibold mb-2 text-lg">Images</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"
                        className="hidden"
                    />
                    <div className="flex gap-2">
                        <Button
                            variant="outlined"
                            onClick={handleButtonClick}
                            label="ADD IMAGES"
                        />
                        <Button
                            variant="outlined"
                            label={imageLoading ? 'Generating...' : 'GENERATE WITH AI'}
                            onClick={handleGenerateImages}
                        />
                    </div>

                    <div className="border border-dashed border-gray-300 p-6 rounded-md flex flex-col items-center text-center gap-4">
                        <p className="text-sm text-gray-500">Or drag and drop files</p>
                        {selectedImages.length > 0 && (
                            <div className="grid grid-cols-3 gap-4 w-full">
                                {selectedImages.map((img, idx) => (
                                    <div key={idx} className="relative">
                                        <img
                                            src={img.url}
                                            alt="preview"
                                            className="w-full  object-cover rounded border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedImages((prev) => {
                                                    URL.revokeObjectURL(prev[idx].url);
                                                    return prev.filter((_, i) => i !== idx);
                                                });
                                            }}
                                            className="absolute top-1 right-1  rounded-full px-1 py-1 text-sm text-white bg-red-600"
                                        >
                                            <FiX/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <hr className="border border-gray-200 my-10" />
                <div className="space-y-4">
                    <h2 className="font-semibold text-lg">Price</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="Product Price"
                            placeholder="Enter price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                        <InputField
                            label="Available Stock"
                            placeholder="Stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <ToggleSwitch
                            enabled={isTaxApplied}
                            onToggle={() => setIsTaxApplied(!isTaxApplied)}
                        />
                        <p>Add tax for this product</p>
                    </div>
                </div>

                <hr className="border border-gray-200 my-10" />
                <div className="space-y-4">
                    <h2 className="font-semibold text-lg">Different Options</h2>
                    <div className="flex gap-2">
                        <ToggleSwitch
                            enabled={hasOptions}
                            onToggle={() => setHasOptions(!hasOptions)}
                        />
                        <p>This product has multiple options</p>
                    </div>
                    <div className="space-y-3">
                        <h2 className="font-semibold">Option 1</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label>Size</label>
                                <select className="border border-gray-300 p-2 focus:outline-none">
                                    <option value="">Size</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-gray-600">Value</label>
                                <div className="flex gap-2 p-2 border border-gray-300 rounded bg-white ">
                                    {selectedSizes.map((size) => (
                                        <span
                                            key={size}
                                            className="flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                                        >
                                            {size}
                                            <button
                                                type="button"
                                                onClick={() => removeSize(size)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                    <select
                                        onChange={handleSelect}
                                        value=""
                                        className="focus:outline-none text-sm w-full text-gray-600 bg-transparent"
                                    >
                                        <option value="" disabled hidden></option>
                                        {allSizes
                                            .filter((size) => !selectedSizes.includes(size))
                                            .map((size) => (
                                                <option key={size} value={size}>
                                                    {size}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border border-gray-200 my-10" />
                <div className="space-y-3">
                    <h2 className="font-semibold text-lg mb-4">Shipping</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="Weight"
                            placeholder="Enter Weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <div className="flex flex-col gap-1">
                            <label>Country</label>
                            <select
                                className="border border-gray-300 p-2 focus:outline-none"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <ToggleSwitch
                            enabled={isDigitalItem}
                            onToggle={() => setIsDigitalItem(!isDigitalItem)}
                        />
                        <p>This is digital item</p>
                    </div>
                </div>
            </form>
        </div>
    );
});

export default ProductForm;
