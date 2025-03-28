import { useState } from "react";
import { ListPlus, Check } from "lucide-react";
import type { SelectionStepType } from "../../types/selection";

interface SelectionStepProps {
  step: SelectionStepType;
  onNext: () => void;
  onSkip: () => void;
}

export default function SelectionStep({
  step,
  onNext,
  onSkip,
}: SelectionStepProps) {
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set());

  const handleSelect = (productId: string, onSelect: () => void) => {
    setAnimatingItems((prev) => new Set([...prev, productId]));
    onSelect();

    setTimeout(() => {
      setAnimatingItems((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
      onNext();
    }, 1500);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {step.products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div
            className="h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})` }}
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <button
              onClick={() => handleSelect(product.id, product.onSelect)}
              disabled={animatingItems.has(product.id)}
              className={`
                w-full flex items-center justify-center px-4 py-2 rounded-lg
                transition-all duration-300 ease-in-out
                ${
                  animatingItems.has(product.id)
                    ? "bg-green-600 scale-95"
                    : "bg-teal-600 hover:bg-teal-700"
                }
                text-white disabled:opacity-50
              `}
            >
              <div className="flex items-center space-x-2">
                {animatingItems.has(product.id) ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Added to plan</span>
                  </>
                ) : (
                  <>
                    <ListPlus className="h-5 w-5" />
                    <span>Add to my plan</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
