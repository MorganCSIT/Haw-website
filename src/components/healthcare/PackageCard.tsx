import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/format";
import AddToCartButton from "../cart/AddToCartButton";
import type { CarePackage } from "../../types/healthcare";

interface PackageCardProps {
  package: CarePackage;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const { addToCart } = useCart();
  const Icon = pkg.icon;

  const handleAddToCart = () => {
    addToCart({
      id: pkg.id,
      name: pkg.title,
      description: pkg.description,
      price: parseFloat(pkg.price.replace(/[^0-9.]/g, "")),
      category: "healthcare",
    });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <Icon className="h-12 w-12 text-teal-600" />
          <span className="text-lg font-semibold text-teal-600">
            {pkg.price}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {pkg.title}
        </h3>
        <p className="text-gray-600 mb-6">{pkg.description}</p>

        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Included Services:</h4>
          <ul className="space-y-2">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Best Suited For:</h4>
          <div className="flex flex-wrap gap-2">
            {pkg.suitable.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <AddToCartButton onClick={handleAddToCart} />
      </div>
    </div>
  );
}
