import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
// import ProductCard from './components/ProductCard';


interface Product {
    name: string;
    description: string;
    category: string;
    amount: Number;
}

const Products = () => {
    const [searchValue, setSearchValue] = useState("");
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [vendorId, setVendorId] = useState<any>(null);

    useEffect(() => {
        const storedVendor = localStorage.getItem("user");
        if (storedVendor) {
            let id = JSON.parse(storedVendor).id;
            console.log(id, 'test');
            setVendorId(id);
        }
    }, []);

    const apiUrl: any = vendorId
        ? `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/product/all/${vendorId}`
        : null;


    const fetchProducts = async () => {
        if (!vendorId) return;
        try {
            const response = await axios.get(apiUrl);
            setAllProducts(response.data?.products || []);
            setFilteredProducts(response.data?.products || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [vendorId]);

    useEffect(() => {
        const result = allProducts.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredProducts(result);
    }, [searchValue, allProducts]);

    return (
        <div className='bg-white lg:min-h-screen'>
            <div className='w-full flex justify-center items-center'>
                <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder='Search Product'
                    className='h-[2rem] w-[40%] border-gray-500 border-[1px] rounded-lg mt-[3rem] lg:py-2 px-2'
                />
            </div>

            <div className='flex mt-3 lg:mt-8 flex-wrap justify-evenly'>
                {filteredProducts.map((item, index) => (
                    <ProductCard key={index} data={item} />
                ))}
            </div>
        </div>
    );
};

export default Products;
