import { format } from "date-fns";
import { Trash2, MoreVertical } from "lucide-react";
import type { AdminInquiry, CartInquiry } from "../../types/admin";

interface InquiryTableProps {
  inquiries: AdminInquiry[];
  cartInquiries: CartInquiry[];
  isLoading: boolean;
  onSelect: (
    inquiry: AdminInquiry | CartInquiry,
    type: "general" | "cart"
  ) => void;
  onStatusUpdate: (
    id: string,
    status: string,
    type: "general" | "cart"
  ) => void;
  onDelete: (id: string, type: "general" | "cart") => Promise<void>;
}

export default function InquiryTable({
  inquiries,
  cartInquiries,
  isLoading,
  onSelect,
  onStatusUpdate,
  onDelete,
}: InquiryTableProps) {
  const statusColors = {
    new: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    archived: "bg-gray-100 text-gray-800",
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Combine and sort all inquiries by date
  const allInquiries = [
    ...inquiries.map((i) => ({ ...i, type: "general" as const })),
    ...cartInquiries.map((i) => ({
      ...i,
      type: "cart" as const,
      category: "cart",
    })),
  ].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const handleDelete = async (
    id: string,
    type: "general" | "cart",
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (
      confirm(
        "Are you sure you want to delete this inquiry? This action cannot be undone."
      )
    ) {
      await onDelete(id, type);
    }
  };

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
                className="hover:bg-gray-50 cursor-pointer group"
                onClick={() => onSelect(inquiry, inquiry.type)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(inquiry.created_at), "MMM d, yyyy HH:mm")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {inquiry.type === "general"
                      ? inquiry.name
                      : `Cart #${inquiry.id}`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {inquiry.type === "general"
                      ? inquiry.email
                      : inquiry.user?.email}
                  </div>
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
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      statusColors[inquiry.status as keyof typeof statusColors]
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    {/* Desktop view */}
                    <div className="hidden md:flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(inquiry, inquiry.type);
                        }}
                        className="text-teal-600 hover:text-teal-900 text-sm font-medium"
                      >
                        View Details
                      </button>
                      <button
                        onClick={(e) =>
                          handleDelete(inquiry.id, inquiry.type, e)
                        }
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-red-50 rounded-full"
                        title="Delete inquiry"
                      >
                        <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
                      </button>
                    </div>

                    {/* Mobile view */}
                    <div className="md:hidden relative group/mobile">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </button>

                      {/* Mobile dropdown menu */}
                      <div className="hidden group-hover/mobile:block absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(inquiry, inquiry.type);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          View Details
                        </button>
                        <button
                          onClick={(e) =>
                            handleDelete(inquiry.id, inquiry.type, e)
                          }
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
