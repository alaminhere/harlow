'use client';

import Image from 'next/image';
import { handleActionAlert } from '@/libs/handleAlert';
import { deleteCategory } from '@/actions/categoryAction';

const style = {
  td: 'px-4 py-3',
};

const AdminAllCategory = ({ category }) => {
  const handleDelete = async slug => {
    try {
      const res = await deleteCategory(slug);
      handleActionAlert(res.success, res.message);
    } catch {
      handleActionAlert(false, 'Something went wrong! Please try again later');
    }
  };

  return (
    <>
      {category?.length === 0 ? (
        <tr>
          <td colSpan={3} className="text-center">
            <p className="my-10 text-center text-text-muted">
              Category Not Found!
            </p>
          </td>
        </tr>
      ) : (
        <>
          {category?.map(item => (
            <tr
              key={item?._id ?? item.slug}
              className="border-t border-border transition-colors hover:bg-surface"
            >
              <td className={style.td}>
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                  <Image
                    src={item?.image?.url}
                    alt={item?.title || 'Category image'}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              </td>
              <td className={style.td}>
                <p className="text-xs text-text">{item.title}</p>
              </td>
              <td className={style.td}>
                <button
                  type="button"
                  onClick={() => handleDelete(item.slug)}
                  className="cursor-pointer rounded-full bg-danger-bg px-2 text-xs text-danger transition-colors hover:opacity-80"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </>
      )}
    </>
  );
};

export default AdminAllCategory;
