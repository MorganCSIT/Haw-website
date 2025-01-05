import { format } from 'date-fns';
import type { CartInquiry } from '../../types/admin';

interface CartInquiryTableProps {
  inquiries: CartInquiry[];
  isLoading: boolean;
  onSelect: (inquiry: CartInquiry) => void;
  onStatusUpdate: (id: string, status: string) => void;
}

export default function CartInquiryTable({ 
  inquiries, 
  isLoading, 
  onSelect,
  onStatusUpdate 
}: CartInquiryTableProps) {
  const statusColors = {
    new: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800'
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inquiries.map((inquiry) => (
              <tr 
                key={inquiry.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelect(inquiry)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(inquiry.created_at), 'MMM d, yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{inquiry.user?.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${inquiry.total_amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={inquiry.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      onStatusUpdate(inquiry.id, e.target.value);
                    }}
                    className={`text-sm font-medium px-3 py-1 rounded-full ${statusColors[inquiry.status as keyof typeof statusColors]}`}
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(inquiry);
                    }}
                    className="text-teal-600 hover:text-teal-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}