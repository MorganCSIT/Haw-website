import { Search } from 'lucide-react';

interface BlogSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTag: string;
  onTagSelect: (tag: string) => void;
  availableTags: string[];
}

export default function BlogSearch({
  searchTerm,
  onSearchChange,
  selectedTag,
  onTagSelect,
  availableTags
}: BlogSearchProps) {
  return (
    <div className="mb-12">
      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagSelect('')}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            selectedTag === '' 
              ? 'bg-teal-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedTag === tag
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}