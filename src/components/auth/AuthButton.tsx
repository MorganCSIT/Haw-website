interface AuthButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button';
  variant?: 'primary' | 'secondary';
}

export default function AuthButton({ 
  loading, 
  children, 
  onClick, 
  type = 'submit',
  variant = 'primary'
}: AuthButtonProps) {
  const baseClasses = "w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50";
  const variantClasses = variant === 'primary' 
    ? "border-transparent text-white bg-teal-600 hover:bg-teal-700"
    : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
    </button>
  );
}