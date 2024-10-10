import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CreateAnnouncement = () => {
  const [announcementText, setAnnouncementText] = useState('');
  const { createAnnouncement } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (announcementText.trim()) {
      createAnnouncement(announcementText);
      setAnnouncementText('');
      alert('Announcement created successfully!');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded"
          rows="4"
          value={announcementText}
          onChange={(e) => setAnnouncementText(e.target.value)}
          placeholder="Enter your announcement here..."
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Announcement
        </button>
      </form>
    </div>
  );
};

export default CreateAnnouncement;