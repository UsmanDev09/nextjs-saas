'use client'
import { useState } from 'react'
import { ChevronDownIcon, UserIcon, CalendarIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const steps = ['Tell us a little bit about yourself', "What's important for you?", "What's your preferred learning pace?", 'Which describes you best?']

interface FormData {
  name: string;
  age: string;
  gender: string;
  importantSkills: string[];
  learningPace: string;
  userCategory: string;
}

export default function OnboardingForm() {
  const [step, setStep] = useState(1)

  const formik = useFormik<FormData>({
    initialValues: {
      name: '',
      age: '',
      gender: '',
      importantSkills: [],
      learningPace: '',
      userCategory: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      age: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be a number'),
      gender: Yup.string().required('Gender is required'),
      learningPace: Yup.string().required('Learning pace is required'),
      userCategory: Yup.string().required('User category is required'),
      importantSkills: Yup.array().min(1, 'Select at least one skill').max(3, 'Select up to 3 skills'),
    }),
    onSubmit: async (values) => {
      try {
        const apiBody = {
          firstStep: {
            name: values.name,
            age: Number(values.age),
            gender: values.gender.toLowerCase()
          },
          secondStep: {
            profileType: values.userCategory.toLowerCase()
          },
          thirdStep: {
            learningPace: values.learningPace.toLowerCase()
          },
          fourthStep: {
            softSkills: values.importantSkills
          }
        }
        
        const response = await axios.put('/api/profile/onboarding', apiBody)
        console.log('Onboarding successful:', response.data)
      } catch (error) {
        console.error('Onboarding error:', error)
      }
    }
  })

  const handleNext = () => setStep(prev => Math.min(prev + 1, steps.length))
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSkillToggle = (skill: string) => {
    formik.setFieldValue(
      'importantSkills',
      formik.values.importantSkills.includes(skill)
        ? formik.values.importantSkills.filter(s => s !== skill)
        : [...formik.values.importantSkills, skill].slice(0, 3)
    )
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="relative">
              <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Full Name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="number"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Age"
                />
                {formik.touched.age && formik.errors.age && (
                  <div className="text-red-500 text-sm">{formik.errors.age}</div>
                )}
              </div>
              <div className="relative">
                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-red-500 text-sm">{formik.errors.gender}</div>
                )}
              </div>
            </div>
          </>
        )
      case 2:
        const skills = ['Communication', 'Emotional Intelligence', 'Critical Thinking', 'Collaboration', 'Adaptability', 'Time Management', 'Leadership', 'Customer Service', 'Digital Literacy', 'Work Ethic']
        return (
          <div>
            <p className="text-gray-500 text-center mb-4">Choose three options</p>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formik.values.importantSkills.includes(skill)
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            {formik.touched.importantSkills && formik.errors.importantSkills && (
              <div className="text-red-500 text-sm text-center mt-2">{formik.errors.importantSkills}</div>
            )}
          </div>
        )
      case 3:
        const paces = [
          { name: 'Relaxed', description: '1-3 times per week' },
          { name: 'Ambitious', description: '3-5 times per week' },
          { name: 'Focused', description: '+5 times per week' },
        ]
        return (
          <div className="space-y-2">
            {paces.map(pace => (
              <button
                key={pace.name}
                onClick={() => formik.setFieldValue('learningPace', pace.name)}
                className={`w-full text-left px-4 py-3 rounded-xl border ${
                  formik.values.learningPace === pace.name
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300'
                }`}
              >
                <div className="font-semibold">{pace.name}</div>
                <div className="text-sm text-gray-500">{pace.description}</div>
              </button>
            ))}
            {formik.touched.learningPace && formik.errors.learningPace && (
              <div className="text-red-500 text-sm text-center mt-2">{formik.errors.learningPace}</div>
            )}
          </div>
        )
      case 4:
        const categories = ['Student', 'Professional', 'Career shifter']
        return (
          <div className="space-y-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => formik.setFieldValue('userCategory', category)}
                className={`w-full text-left px-4 py-3 rounded-xl border ${
                  formik.values.userCategory === category
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
            {formik.touched.userCategory && formik.errors.userCategory && (
              <div className="text-red-500 text-sm text-center mt-2">{formik.errors.userCategory}</div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8">
        <div className="bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-purple-500 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {steps[step - 1]}
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {renderStep()}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 rounded-full text-gray-700"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            )}
            {step < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full ml-auto px-6 py-2 bg-purple-500 text-white rounded-xl"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="w-full ml-auto px-6 py-2 bg-purple-500 text-white rounded-xl"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
