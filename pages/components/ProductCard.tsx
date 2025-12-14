import Link from 'next/link'
import React, { useContext, useState } from 'react'
import Button from './Button'
import { useUser } from '@/src/context/UserContext'
import EditProductModal from './EditProductModal'
import DeleteConfirmModal from './DeleteConfirmModal'


interface ProductCardprops {
    data: any
}



const ProductCard: React.FC<ProductCardprops> = ({ data }) => {

    const { user } = useUser();
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    return (
        <div className='w-[25%] shadow-md hover:shadow-2xl bg-white min-h-[10rem] rounded-lg p-3'>
            <div className='w-full rounded-lg h-[10rem] bg-gray-400'>

            </div>
            <p className='text-xl mt-2 text-black font-normal'>
                {data?.name}
            </p>
            <p className='text-sm text-gray-400 font-normal'>
                {data?.description}
            </p>
            <p className='text-md mt-2 text-black font-semibold'>
                ${data?.amount}
            </p>
            {
                user?.role === "vendor" &&
                <div className='w-full flex mt-3 justify-start lg:gap-x-2'>
                    <div onClick={() => setEditOpen(true)}
                    >
                        <Button type={"secondary"} title={"Edit"} />
                    </div>
                    <div onClick={() => setDeleteOpen(true)}
                    >
                        <Button type={"secondary"} title={"Delete"} />
                    </div>

                </div>
            }
            {
                user?.role === "user" &&
                <div className='w-full flex mt-3 justify-start lg:gap-x-2'>
                    <Link href={`/products/${data?.id}`}
                    >
                        <Button type={"secondary"} title={"View"} />
                    </Link>

                </div>
            }
            {/* Modals */}
            {editOpen && (
                <EditProductModal
                    product={data}
                    onClose={() => setEditOpen(false)}
                />
            )}

            {deleteOpen && (
                <DeleteConfirmModal
                    productId={data._id}
                    onClose={() => setDeleteOpen(false)}
                />
            )}

        </div>
    )
}

export default ProductCard