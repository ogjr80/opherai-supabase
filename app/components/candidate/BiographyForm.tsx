'use client';
import { FC } from 'react';

interface BiographyData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  linkedIn: string;
  github: string;
  portfolio: string;
}

interface BiographyFormProps {
  data: BiographyData;
  updateData: (field: string, value: string) => void;
}

const BiographyForm: FC<BiographyFormProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            value={data.firstName}
            onChange={(e) => updateData('firstName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            value={data.lastName}
            onChange={(e) => updateData('lastName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => updateData('email', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={data.phone}
            onChange={(e) => updateData('phone', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location *
          </label>
          <input
            type="text"
            id="location"
            value={data.location}
            onChange={(e) => updateData('location', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="City, Country"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
          About Me *
        </label>
        <textarea
          id="about"
          value={data.about}
          onChange={(e) => updateData('about', e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Tell us about yourself, your career goals, and what makes you unique..."
          required
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Professional Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">
              LinkedIn Profile
            </label>
            <input
              type="url"
              id="linkedIn"
              value={data.linkedIn}
              onChange={(e) => updateData('linkedIn', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div>
            <label htmlFor="github" className="block text-sm font-medium text-gray-700">
              GitHub Profile
            </label>
            <input
              type="url"
              id="github"
              value={data.github}
              onChange={(e) => updateData('github', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
              Portfolio Website
            </label>
            <input
              type="url"
              id="portfolio"
              value={data.portfolio}
              onChange={(e) => updateData('portfolio', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiographyForm;
