import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { selectionSteps } from '../config/selectionSteps';
import PersonalDetailsPrompt from '../components/auth/PersonalDetailsPrompt';

export default function SelectionFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { needsProfile, updateProfile } = useProfile(user?.id);
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);

  // Show profile prompt when needed
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

  const handleSkip = () => {
    handleNext();
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will not be saved.')) {
      navigate('/');
    }
  };

  const NavigationControls = () => (
    <div className="flex justify-between items-center">
      <button
        onClick={handleSkip}
        className="text-gray-600 hover:text-gray-800 font-medium"
      >
        Skip this step
      </button>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleNext}
          className="flex items-center text-teal-600 hover:text-teal-700 font-medium"
        >
          {currentStep === selectionSteps.length - 1 ? 'View My Interests' : 'Continue'} 
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
        <button
          onClick={handleExit}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          title="Exit selection"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Top Navigation */}
          <div className="mb-8">
            <NavigationControls />
          </div>

          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {selectionSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index === currentStep 
                      ? 'bg-teal-600 text-white'
                      : index < currentStep
                        ? 'bg-teal-200 text-teal-800'
                        : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-teal-600 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / (selectionSteps.length - 1)) * 100}%` }}
              />
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

          {/* Bottom Navigation */}
          <div className="mt-12">
            <NavigationControls />
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