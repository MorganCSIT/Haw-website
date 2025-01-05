import { format } from 'date-fns';
import type { AdminInquiry, CartInquiry } from '../../types/admin';

interface InquiryTableProps {
  inquiries: AdminInquiry[];
  cartInquiries: CartInquiry[];
  isLoading: boolean;
  onSelect: (inquiry: AdminInquiry | CartInquiry, type: 'general' | 'cart') => void;
  onStatusUpdate: (id: string, status: string, type: 'general' | 'cart') => void;
}

export default function InquiryTable({ 
  inquiries, 
  cartInquiries,
  isLoading, 
  onSelect,
  onStatusUpdate 
}: InquiryTableProps) {
  const statusColors = {
    new: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-red-100 text-red-800',
    completed: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800'
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Combine and sort all inquiries by date
  const allInquiries = [
    ...inquiries.map(i => ({ ...i, type: 'general' as const })),
    ...cartInquiries.map(i => ({ 
      ...i, 
      type: 'cart' as const,
      category: 'cart',
      email: i.user_email
    }))
  ].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
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
            {allInquiries.map((inquiry) => (
              <tr 
                key={`${inquiry.type}-${inquiry.id}`}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelect(inquiry, inquiry.type)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(inquiry.created_at), 'MMM d, yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                  <div className="text-sm text-gray-500">{inquiry.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {inquiry.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={inquiry.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      onStatusUpdate(inquiry.id, e.target.value, inquiry.type);
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
                      onSelect(inquiry, inquiry.type);
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