import React from 'react';
import { usePoll } from '../contexts/PollContext';
import { useAuth } from '../contexts/AuthContext';

const VotePoll = () => {
  const { polls, vote } = usePoll();
  const { user } = useAuth();

  if (polls.length === 0) {
    return <div className="bg-white p-6 rounded-lg shadow-md">No active polls at the moment.</div>;
  }

  return (
    <div className="space-y-6">
      {polls.map((poll) => (
        <div key={poll.id} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{poll.question}</h2>
          <div className="space-y-2">
            {poll.options.map((option) => (
              <button
                key={option.id}
                onClick={() => vote(poll.id, option.id)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                {option.text}
                {` (${option.votes} votes)`}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VotePoll;