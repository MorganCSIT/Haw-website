import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyProductCard from "./PropertyProductCard";
import type { Property } from "../../data/properties";

interface PropertyGridProps {
  properties: Property[];
  itemsPerPage?: number;
}

export default function PropertyGrid({
  properties,
  itemsPerPage = 6,
}: PropertyGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when properties change (i.e., when filters are applied)
  useEffect(() => {
    setCurrentPage(1);
  }, [properties]);

  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to the Featured Properties section
    document.getElementById("featured-properties")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          No properties match your current filters.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-sm text-gray-600 mb-4">
        Showing {startIndex + 1}-{Math.min(endIndex, properties.length)} of{" "}
        {properties.length} properties
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProperties.map((property) => (
          <PropertyProductCard key={property.id} property={property} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full transition-colors ${
                  currentPage === page
                    ? "bg-teal-600 text-white"
                    : "hover:bg-gray-100"
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
