import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AnnouncementList = () => {
  const { announcements } = useAuth();

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Announcements</h3>
      {announcements.length === 0 ? (
        <p>No announcements at this time.</p>
      ) : (
        <ul className="space-y-2">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="border-b pb-2">
              <p>{announcement.text}</p>
              <small className="text-gray-500">
                {new Date(announcement.date).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnnouncementList;