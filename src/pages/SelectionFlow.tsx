import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, X, ShoppingBag } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { useCart } from '../hooks/useCart';
import { selectionSteps } from '../config/selectionSteps';
import PersonalDetailsPrompt from '../components/auth/PersonalDetailsPrompt';

export default function SelectionFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { needsProfile, updateProfile } = useProfile(user?.id);
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);
  const { cart } = useCart();
  const itemCount = cart.items.length;

  useEffect(() => {
    if (user && needsProfile) {
      setShowProfilePrompt(true);
    }
  }, [user, needsProfile]);

  const handleNext = () => {
    if (currentStep < selectionSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/account?showModal=true');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will not be saved.')) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Top Navigation */}
          <div className="flex justify-end mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm">
              <ShoppingBag className="h-5 w-5 text-teal-600 mr-2" />
              <span className="text-gray-700">{itemCount} {itemCount === 1 ? 'item' : 'items'} selected</span>
            </div>
          </div>

          {/* Step content */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {selectionSteps[currentStep].title}
            </h1>
            <p className="text-xl text-gray-600">
              {selectionSteps[currentStep].description}
            </p>
          </div>

          <div className="mb-12">
            {selectionSteps[currentStep].component()}
          </div>
        </div>
      </div>

      {/* Fixed bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleExit}
                className="p-2 text-gray-500 hover:text-gray-700"
                title="Exit selection"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 text-teal-600 hover:text-teal-700"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Details Prompt */}
      <PersonalDetailsPrompt
        isOpen={showProfilePrompt}
        onClose={() => setShowProfilePrompt(false)}
        onSave={updateProfile}
      />
    </div>
  );
}