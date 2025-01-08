import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { getAuthErrorMessage } from '../../utils/auth';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import AuthError from '../../components/auth/AuthError';
import VerificationMessage from '../../components/auth/VerificationMessage';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const { user } = useAuth();

  // Only redirect if user is verified
  if (user?.email_confirmed_at) {
    return <Navigate to="/account" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            email_confirmed: false
          }
        }
      });

      if (error) {
        setError(getAuthErrorMessage(error));
        return;
      }

      // Show verification message and sign out
      setVerificationSent(true);
      await supabase.auth.signOut();

    } catch (error: any) {
      setError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  if (verificationSent) {
    return <VerificationMessage email={email} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
            Sign in
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

            {error && (
              <AuthError title="Registration failed">
                {error}
              </AuthError>
            )}

            <AuthButton loading={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </AuthButton>
          </form>
        </div>
      </div>
    </div>
  );
}