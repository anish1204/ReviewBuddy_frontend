import axios from "axios";
import Button from "./Button";

interface DeleteModalProps {
    productId: any;
    onClose: any;
}

const DeleteConfirmModal: React.FC<DeleteModalProps> = ({ productId, onClose }) => {
    const deleteProduct = async () => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/product/products/${productId}`
            );
            onClose();
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Delete failed");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[350px] p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">
                    Delete this product?
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-2">
                    <div onClick={onClose}>

                        <Button type={"secondary"} title="Cancel" />
                    </div>
                    <div onClick={deleteProduct}>

                        <Button type={"secondary"} title="Delete" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
