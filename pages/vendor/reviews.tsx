import axios from 'axios';
import React, { useEffect, useState } from 'react'
import VendorFeedbackTable from '../components/VendorFeedbackTable';

const reviews = () => {
    const [products, setProducts] = useState([]);
    const [vendorId, setVendorId] = useState<any>(null);

    useEffect(() => {
        if (!vendorId) return;

        axios
            .get(`/api/vendors/${vendorId}/products/analytics`)
            .then(res => setProducts(res.data.products))
            .catch(console.error);
    }, [vendorId]);

    return (
        <div className='lg:min-h-screen'>
<VendorFeedbackTable/>
        </div>
    )
}

export default reviews