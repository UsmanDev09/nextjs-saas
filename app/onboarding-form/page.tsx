'use client'
// pages/onboarding-form.tsx

import { useState } from 'react';

interface OnboardingRequest {
  firstStep: {
    name: string;
    age: number | null;
    gender: string;
  };
  secondStep: {
    profileType: string;
  };
  thirdStep: {
    learningPace: string;
  };
  fourthStep: {
    softSkills: string[];
  };
}

const OnboardingForm: React.FC = () => {
  const [formData, setFormData] = useState<OnboardingRequest>({
    firstStep: {
      name: '',
      age: null,
      gender: ''
    },
    secondStep: {
      profileType: ''
    },
    thirdStep: {
      learningPace: ''
    },
    fourthStep: {
      softSkills: []
    }
  });

  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleInputChange = (step: keyof OnboardingRequest, field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: {
        ...prevData[step],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdob3N0QHNoYXBlci51cyIsInN1YiI6ImNmMDJlMzg4LWNkNjUtNGU3MC1iMzhkLTMwMTVmNTRkNGJlMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI3OTY5MzgwLCJleHAiOjE3Mjc5NzI5ODB9.e9JAh4YoqkZ0lAHc3043v-tZO2VzwZbY_hFMvcoW_BA'
      const response = await fetch('/api/profile/onboarding', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update onboarding');
      }

      setResponseMessage('Onboarding updated successfully');
    } catch (error) {
      setResponseMessage(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Onboarding Form</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">First Step</h2>
          <input
            type="text"
            placeholder="Name"
            value={formData.firstStep.name}
            onChange={(e) => handleInputChange('firstStep', 'name', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={formData.firstStep.age || ''}
            onChange={(e) => handleInputChange('firstStep', 'age', parseInt(e.target.value) || null)}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Gender"
            value={formData.firstStep.gender}
            onChange={(e) => handleInputChange('firstStep', 'gender', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Second Step</h2>
          <select
            value={formData.secondStep.profileType}
            onChange={(e) => handleInputChange('secondStep', 'profileType', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Profile Type</option>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Third Step</h2>
          <select
            value={formData.thirdStep.learningPace}
            onChange={(e) => handleInputChange('thirdStep', 'learningPace', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Learning Pace</option>
            <option value="relaxed">Relaxed</option>
            <option value="moderate">Moderate</option>
            <option value="intensive">Intensive</option>
          </select>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Fourth Step</h2>
          <input
            type="text"
            placeholder="Soft Skill IDs (comma-separated)"
            value={formData.fourthStep.softSkills.join(',')}
            onChange={(e) => handleInputChange('fourthStep', 'softSkills', e.target.value.split(','))}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit Onboarding
        </button>
      </form>

      {responseMessage && (
        <p className={`mt-4 text-center ${responseMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default OnboardingForm;
