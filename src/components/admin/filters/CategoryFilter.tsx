interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'property', label: 'Property' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'vacation', label: 'Vacation' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'contact', label: 'Contact' },
    { value: 'cart', label: 'Cart' }
  ];

  return (
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-teal-500 focus:border-teal-500"
    >
      {categories.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
}