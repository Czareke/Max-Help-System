'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { User } from 'lucide-react';

const Page: React.FC = () => {
  // Type for user data
  interface UserData {
    name: string;
    email: string;
  }

  // State to manage user data
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    email: 'johndoe@gmail.com',
  });

  // State to toggle form visibility
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // State to manage form inputs
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
  });

  // Handle input change in the form
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserData(formData); // Update the user data
    setIsEditing(false); // Hide the form
  };

  return (
    <div className="flex justify-center items-center w-screen mt-12">
      <div className="shadow-md py-10 px-12 w-[90%] max-w-md">
        <div className="text-center mx-auto space-y-3">
          <User className="w-12 h-12 mx-auto" />
          <p>{userData.name}</p>
          <p>{userData.email}</p>
          <p>Other Details</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-1.5 text-sm rounded-sm mt-10"
          >
            Edit Profile
          </button>
        </div>

        {isEditing && (
          <form
            onSubmit={handleFormSubmit}
            className="mt-6 space-y-4 text-left bg-gray-100 p-4 rounded-md shadow"
          >
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-1.5 text-sm rounded-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-1.5 text-sm rounded-sm"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Page;
