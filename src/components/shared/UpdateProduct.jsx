'use client';

import { deleteProduct } from '@/actions/productAction';
import { handleActionAlert } from '@/libs/handleAlert';
import { Edit, Trash2Icon } from 'lucide-react';

const UpdateProduct = ({ productId }) => {
  const handleDelete = async id => {
    try {
      const res = await deleteProduct(id);
      console.log(res);
      if (res.success) {
        revalidatePath('/admin/products');
        revalidatePath('/shop');
      }
      handleActionAlert(res.success, res.message);
    } catch {
      handleActionAlert(false, 'Something went wrong! Please try again later');
    }
  };
  return (
    <div className="flex gap-3">
      <button
        disabled
        type="button"
        aria-label="Edit product"
        className="cursor-pointer text-primary transition-colors hover:text-primary-hover disabled:cursor-not-allowed"
      >
        <Edit size={18} />
      </button>
      <button
        type="button"
        aria-label="Delete product"
        onClick={() => handleDelete(productId)}
        className="cursor-pointer text-danger transition-opacity hover:opacity-70"
      >
        <Trash2Icon size={18} />
      </button>
    </div>
  );
};

export default UpdateProduct;
