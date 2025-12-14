import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Button from "../components/Button"
import { useRouter } from "next/router";
import axios from "axios";
import Feedback from '../components/Feedback';
import Loader from '../components/Loader'

const ProductDetails = () => {
    let router = useRouter();
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState();

    const apiUrl = `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/product/${router?.query?.slug}`;

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(apiUrl);
            console.log(response.data?.product, "test");
            setData(response.data?.product);
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!router.isReady) return;
        fetchProducts();
    }, [router.isReady]);
    if (loading)
        return
        (
<Loader/>
        )
    return (

        <>

            <div className='w-full lg:min-h-screen containerx containery flex flex-col items-start'>
                <div className='w-[65%]'>

                    <div className='h-[30rem] bg-gray-400  rounded-lg' >

                    </div>
                    <div className='mt-5'>
                        <p className='text-black text-2xl font-medium'>
                            {data?.name}
                        </p>
                        <p className='text-gray-400 text-md capitalize font-medium'>
                            {data?.description}
                        </p>
                        <p className='text-black text-2xl font-semibold'>
                            ${data?.amount}
                        </p>
                    </div>
                    <div className='w-full mt-4 flex justify-start lg:gap-x-3'>
                        <Button title={"Add to Cart"} />
                        <Button title={"Buy Now"} />
                    </div>
                </div>
                <div className='w-[45%]'>

                </div>

            </div>
            <div className='w-full flex'>
                <Feedback productId={data?._id} vendorId={data?.vendorId} />
            </div>
        </>
    )
}

export default ProductDetails