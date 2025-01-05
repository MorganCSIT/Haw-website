import { Link } from 'react-router-dom';

interface VerificationMessageProps {
  email: string;
}

export default function VerificationMessage({ email }: VerificationMessageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                Please verify your email
              </h3>
              <p className="text-sm text-green-700 mb-4">
                We've sent a verification link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-green-700">
                Please check your email and click the link to activate your account.
              </p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-teal-600 hover:text-teal-500"
            >
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}