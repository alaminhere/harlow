import clsx from 'clsx';
import Link from 'next/link';

const UserResentOrderList = ({ order }) => {
  const date = new Date(order.createdAt).toDateString();
  const isCancelled = order.orderStatus?.toLowerCase() === 'cancelled';

  return (
    <tr className="w-full border-t border-border hover:bg-surface">
      <td className="w-1/3 px-4 py-3 text-sm text-text overflow-hidden">
        <span className="uppercase line-clamp-1 overflow-hidden">{date}</span>
      </td>
      <td className="w-1/3 px-4 py-3">
        <span
          className={clsx(
            'text-xs px-3 py-1 rounded-full',
            isCancelled
              ? 'bg-danger-bg text-danger'
              : 'bg-primary/10 text-primary',
          )}
        >
          {order.orderStatus}
        </span>
      </td>
      <td className="w-1/3 px-4 py-3">
        <Link href={`/dashboard/orders/${order._id}`}>
          <span className="text-xs px-3 py-1 rounded-full border border-primary text-primary hover:bg-primary hover:text-background transition-colors cursor-pointer">
            View
          </span>
        </Link>
      </td>
    </tr>
  );
};

export default UserResentOrderList;
