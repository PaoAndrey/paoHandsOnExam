import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AnnouncementForm = () => {
  const [text, setText] = useState('');
  const { createAnnouncement } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      createAnnouncement(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h3 className="text-xl font-bold mb-2">Create Announcement</h3>
      <textarea
        className="w-full p-2 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter announcement text"
        rows="3"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Post Announcement
      </button>
    </form>
  );
};

export default AnnouncementForm;