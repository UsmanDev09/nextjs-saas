"use client"
import { useEffect, useState } from 'react';

interface OnboardingResponse {
  firstStep: {
    name: string | null;
    age: number | null;
    gender: string | null;
  };
  secondStep: {
    profileType: string | null;
  };
  thirdStep: {
    learningPace: string | null;
  };
}

const OnboardingPage: React.FC = () => {
  const [onboardingData, setOnboardingData] = useState<OnboardingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOnboardingData = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdob3N0QHNoYXBlci51cyIsInN1YiI6ImNmMDJlMzg4LWNkNjUtNGU3MC1iMzhkLTMwMTVmNTRkNGJlMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI3OTY5MzgwLCJleHAiOjE3Mjc5NzI5ODB9.e9JAh4YoqkZ0lAHc3043v-tZO2VzwZbY_hFMvcoW_BA'
        const response = await fetch('/api/profile/onboarding',{
            headers: {
              Authorization: `Bearer ${token}`
            }});
        if (!response.ok) {
          throw new Error('Failed to fetch onboarding data');
        }
        const data: OnboardingResponse = await response.json();
        setOnboardingData(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchOnboardingData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!onboardingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Onboarding Information</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold">First Step</h2>
        <p className="text-gray-700">Name: {onboardingData.firstStep?.name || 'Not provided'}</p>
        <p className="text-gray-700">Age: {onboardingData.firstStep?.age || 'Not provided'}</p>
        <p className="text-gray-700">Gender: {onboardingData.firstStep?.gender || 'Not provided'}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Second Step</h2>
        <p className="text-gray-700">Profile Type: {onboardingData.secondStep?.profileType || 'Not provided'}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Third Step</h2>
        <p className="text-gray-700">Learning Pace: {onboardingData.thirdStep?.learningPace || 'Not provided'}</p>
      </div>
    </div>
  );
};

export default OnboardingPage;
