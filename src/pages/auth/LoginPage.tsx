import { useState } from 'react';
import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { getAuthErrorMessage } from '../../utils/auth';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import AuthError from '../../components/auth/AuthError';
import VerificationMessage from '../../components/auth/VerificationMessage';
import ForgotPassword from '../../components/auth/ForgotPassword';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsVerification, setNeedsVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Get return URL from query params
  const searchParams = new URLSearchParams(location.search);
  const returnUrl = searchParams.get('returnUrl') || '/';

  if (user) {
    return <Navigate to={returnUrl} replace />;
  }

  if (needsVerification) {
    return <VerificationMessage email={email} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message.includes('Email not confirmed')) {
          setNeedsVerification(true);
          return;
        }
        throw error;
      }

      if (!data.user) {
        throw new Error('No user data received');
      }

      // Success - redirect to return URL
      navigate(returnUrl, { replace: true });
    } catch (error: any) {
      console.error('Login error:', error);
      setError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <button
              onClick={() => setShowForgotPassword(false)}
              className="text-teal-600 hover:text-teal-500 mb-8"
            >
              ← Back to login
            </button>
            <ForgotPassword />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link 
            to={`/signup${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
            className="font-medium text-teal-600 hover:text-teal-500"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <AuthInput
              id="email"
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <AuthInput
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm font-medium text-teal-600 hover:text-teal-500"
              >
                Forgot your password?
              </button>
            </div>

            {error && (
              <AuthError title="Sign in failed">
                {error}
              </AuthError>
            )}

            <AuthButton loading={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </AuthButton>
          </form>
        </div>
      </div>
    </div>
  );
}