import { useState } from 'react';
import { X } from 'lucide-react';
import { UserProfile } from '../../types/profile';
import PersonalDetailsForm from './PersonalDetailsForm';

interface PersonalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onSave: (profile: Partial<UserProfile>) => Promise<void>;
}

export default function PersonalDetailsModal({ isOpen, onClose, profile, onSave }: PersonalDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Personal Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        {isEditing ? (
          <PersonalDetailsForm
            profile={profile}
            onSave={async (updatedProfile) => {
              await onSave(updatedProfile);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">First Name</label>
                <p className="mt-1 text-gray-900">{profile?.first_name || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Name</label>
                <p className="mt-1 text-gray-900">{profile?.last_name || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Nationality</label>
                <p className="mt-1 text-gray-900">{profile?.nationality || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Languages</label>
                <p className="mt-1 text-gray-900">{profile?.languages || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Marital Status</label>
                <p className="mt-1 text-gray-900">{profile?.marital_status || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                <p className="mt-1 text-gray-900">
                  {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : '-'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                <p className="mt-1 text-gray-900">{profile?.phone_number || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Emergency Contact</label>
                <p className="mt-1 text-gray-900">{profile?.emergency_contact || '-'}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Address</label>
              <p className="mt-1 text-gray-900">{profile?.address || '-'}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Edit Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}