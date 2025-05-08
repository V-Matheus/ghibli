'use client';
import { ChevronDown } from 'lucide-react';
import { ComponentProps, useState } from 'react';

export function Select({ ...props }: ComponentProps<'select'>) {
  const [selectedOrder, setSelectedOrder] = useState('default');

  const orders = [
    { value: 'default', name: 'Default' },
    { value: 'title-az', name: 'Title (A-Z)' },
    { value: 'title-za', name: 'Title (Z-A)' },
    { value: 'duration-shortest', name: 'Duration (Shortest)' },
    { value: 'duration-longest', name: 'Duration (Longest)' },
    { value: 'rating-highest', name: 'Your Rating (Highest)' },
    { value: 'rating-lowest', name: 'Your Rating (Lowest)' },
    { value: 'score-highest', name: 'Score (Highest)' },
    { value: 'score-lowest', name: 'Score (Lowest)' },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = event.target.value;
    setSelectedOrder(newOrder);
  };

  console.log(selectedOrder);

  return (
    <div className="relative">
      <select
        className="flex h-10 w-full rounded-md border border-gray-200 px-3 py-2 appearance-none pr-10 cursor-pointer"
        value={selectedOrder}
        onChange={handleChange}
        {...props}
      >
        {orders.map((order, index) => (
          <option key={index} value={order.value}>
            {order.name}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
      />
    </div>
  );
}
