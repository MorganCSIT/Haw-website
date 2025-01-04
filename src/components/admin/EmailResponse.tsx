import { Mail } from 'lucide-react';

interface EmailResponseProps {
  email: string;
  subject?: string;
}

export default function EmailResponse({ email, subject = '' }: EmailResponseProps) {
  const handleEmailClick = () => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
  };

  return (
    <button
      onClick={handleEmailClick}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
    >
      <Mail className="h-4 w-4 mr-2" />
      Respond via Email
    </button>
  );
}