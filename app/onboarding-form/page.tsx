'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ChevronLeft, ChevronDown, User, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface FormData {
  name: string;
  age: string;
  gender: string;
  importantSkills: string[];
  userCategory: string;
}

const steps = [
  'Tell us a little bit about yourself',
  "What's important for you?",
  "What's your preferred learning pace?",
  'Which describes you best?',
];

const skills = [
  'Communication',
  'Emotional Intelligence',
  'Critical Thinking',
  'Collaboration',
  'Adaptability',
  'Time Management',
  'Leadership',
  'Customer Service',
  'Digital Literacy',
  'Work Ethic',
];

const categories = ['Student', 'Professional'];

export default function OnboardingForm() {
  const [step, setStep] = useState(1);

  const formik = useFormik<FormData>({
    initialValues: {
      name: '',
      age: '',
      gender: '',
      importantSkills: [],
      userCategory: '',
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      age: Yup.number()
        .required('Age is required')
        .positive('Age must be positive')
        .integer('Age must be a number'),
      gender: Yup.string().required('Gender is required'),
      userCategory: Yup.string().required('User category is required'),
      importantSkills: Yup.array()
        .min(1, 'Select at least one skill')
        .max(3, 'Select up to 3 skills'),
    }),
    onSubmit: async (values) => {
      try {
        const apiBody = {
          name: values.name,
          age: Number(values.age),
          gender: values.gender.toLowerCase(),
          profileType: values.userCategory.toLowerCase(),
          softSkills: values.importantSkills,
        };

        await axios.put('/api/profile/onboarding', apiBody);
        toast.success('Profile created successfully');
        // Additional success handling (e.g., redirect)
      } catch (error) {
        let errorMessage;
        if (axios.isAxiosError(error) && error.response) {
          errorMessage = error.response.data.error || 'An error occurred';
        } else if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          errorMessage = 'An unexpected error occurred';
        }

        toast.error(errorMessage);
      }
    },
  });

  const handleNext = () => {
    let isStepValid = false;

    switch (step) {
      case 1:
        isStepValid =
          formik.values.name.trim() !== '' &&
          formik.values.age !== '' &&
          formik.values.gender.trim() !== '' &&
          !formik.errors.name &&
          !formik.errors.age &&
          !formik.errors.gender;
        break;

      case 2:
        isStepValid =
          formik.values.importantSkills.length > 0 &&
          formik.values.importantSkills.length <= 3;
        break;

      case 3:
        isStepValid = formik.values.userCategory.trim() !== '';
        break;
    }

    if (isStepValid) {
      setStep((prev) => Math.min(prev + 1, steps.length));
    } else {
      formik.validateForm();
      formik.setTouched({
        name: step === 1,
        age: step === 1,
        gender: step === 1,
        importantSkills: step === 2,
        userCategory: step === 3,
      });
    }
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSkillToggle = (skill: string) => {
    formik.setFieldValue(
      'importantSkills',
      formik.values.importantSkills.includes(skill)
        ? formik.values.importantSkills.filter((s) => s !== skill)
        : [...formik.values.importantSkills, skill].slice(0, 3)
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-5 transform -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 pr-4 py-2 rounded-xl focus-visible:ring-purple-500"
                placeholder="Full Name"
              />
              <div>
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-5 transform -translate-y-1/2 pointer-events-none" />
                <Input
                  type="number"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10 pr-4 py-2 rounded-xl"
                  placeholder="Age"
                />
                <div>
                  {formik.touched.age && formik.errors.age && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.age}
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <Select
                  name="gender"
                  value={formik.values.gender}
                  onValueChange={(value) =>
                    formik.setFieldValue('gender', value)
                  }
                >
                  <SelectTrigger className="w-full px-4 py-2 rounded-xl">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <div className="h-5 mt-1">
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.gender}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <div>
            <p className="text-gray-600 text-center mb-4">
              Choose three options
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill) => (
                <Button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  variant={
                    formik.values.importantSkills.includes(skill)
                      ? 'default'
                      : 'outline'
                  }
                  className={`rounded-full text-sm ${
                    formik.values.importantSkills.includes(skill)
                      ? 'bg-purple-500 text-white'
                      : ''
                  }`}
                >
                  {skill}
                </Button>
              ))}
            </div>
            <div className="h-5 mt-2 text-center">
              {formik.touched.importantSkills &&
                formik.errors.importantSkills && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.importantSkills}
                  </div>
                )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => formik.setFieldValue('userCategory', category)}
                variant={
                  formik.values.userCategory === category
                    ? 'default'
                    : 'outline'
                }
                className={`w-full justify-start px-4 py-3 rounded-xl ${
                  formik.values.userCategory === category
                    ? 'bg-purple-500 text-white'
                    : ''
                }`}
              >
                {category}
              </Button>
            ))}

            <div className="h-5 mt-2 text-center">
              {formik.touched.userCategory && formik.errors.userCategory && (
                <div className="text-red-500 text-sm">
                  {formik.errors.userCategory}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8">
        <Progress value={(step / steps.length) * 100} className="h-2" />
      </div>
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {steps[step - 1]}
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {renderStep()}
          <div className="flex justify-between gap-2">
            {step > 1 && (
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}
            {step < steps.length ? (
              <Button
                type="button"
                onClick={handleNext}
                className="w-full ml-auto px-6 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full ml-auto px-6 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-700"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
