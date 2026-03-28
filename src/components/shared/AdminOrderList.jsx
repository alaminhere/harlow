import Link from 'next/link';

const AdminOrderList = ({ order }) => {
  return (
    <tr className="border-t border-border transition-colors hover:bg-background">
      <td className="px-5 py-3 text-sm text-text">#{order._id}</td>
      <td className="px-5 py-3 text-sm text-text">{order?.totalPrice}$</td>
      <td className="px-5 py-3">
        <span className=" text-xs text-primary">{order?.orderStatus}</span>
      </td>
      <td className="px-5 py-3">
        <Link
          href={`/admin/orders/${order?._id}`}
          className="inline-block cursor-pointer rounded-full border border-primary px-3 py-1 text-xs text-primary transition-colors hover:bg-primary hover:text-btn-primary-text"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default AdminOrderList;
