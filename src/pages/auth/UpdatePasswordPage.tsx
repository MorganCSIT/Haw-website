import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { getAuthErrorMessage } from '../../utils/auth';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import AuthError from '../../components/auth/AuthError';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle the recovery token from the URL
    const handleRecoveryToken = async () => {
      const hash = location.hash;
      if (hash && hash.includes('access_token')) {
        // Extract the tokens from the URL
        const hashParams = new URLSearchParams(hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          // Set the session using the tokens
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (error) {
            setError('Invalid or expired recovery link. Please request a new one.');
            setTimeout(() => navigate('/reset-password'), 3000);
          }
        }
      } else {
        // No recovery token found, check if we have a valid session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
        }
      }
    };

    handleRecoveryToken();
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setError(getAuthErrorMessage(error));
        return;
      }

      // Sign out and redirect to login
      await supabase.auth.signOut();
      navigate('/login', { 
        state: { 
          message: 'Password updated successfully. Please sign in with your new password.' 
        }
      });
    } catch (error: any) {
      setError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Update your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please enter your new password below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <AuthInput
              id="password"
              type="password"
              label="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <AuthError title="Update password failed">
                {error}
              </AuthError>
            )}

            <AuthButton loading={loading}>
              {loading ? 'Updating password...' : 'Update password'}
            </AuthButton>
          </form>
        </div>
      </div>
    </div>
  );
}