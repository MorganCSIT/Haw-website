interface PropertyFeaturesProps {
  features: string[];
}

export default function PropertyFeatures({ features }: PropertyFeaturesProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Features</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-3" />
            <span className="text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}