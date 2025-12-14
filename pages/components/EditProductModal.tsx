import axios from "axios";
import { useState } from "react";
import Button from "./Button";

interface EditProductModalProps {
    product: any;
    onClose: any;
}


const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose }) => {
    const [form, setForm] = useState({
        name: product.name,
        description: product.description,
        category: product.category,
        amount: product.amount,
    });

    const handleChange = (e:any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const updateProduct = async () => {
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/product/products/${product._id}`,
                form
            );
            onClose();
            window.location.reload(); // simple refresh
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[400px] p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                    placeholder="Name"
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                    placeholder="Description"
                />

                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                    placeholder="Category"
                />

                <input
                    name="amount"
                    type="number"
                    value={form.amount}
                    onChange={handleChange}
                    className="border p-2 w-full mb-4"
                    placeholder="Amount"
                />

                <div className="flex justify-end gap-2">
                    <div className="" onClick={onClose}>
                        <Button title="Cancel" type={"secondary"} />
                    </div>
                    <div className="" onClick={updateProduct}>
                        <Button title="Save" type={"secondary"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;
