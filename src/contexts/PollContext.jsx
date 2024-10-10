import React, { createContext, useState, useContext } from 'react';

const PollContext = createContext();

export const PollProvider = ({ children }) => {
  const [polls, setPolls] = useState([]);

  const createPoll = (question, options) => {
    const newPoll = {
      id: Date.now().toString(),
      question,
      options: options.map(option => ({
        id: Date.now().toString() + Math.random(),
        text: option,
        votes: 0,
      })),
    };
    setPolls(prevPolls => [...prevPolls, newPoll]);
  };

  const vote = (pollId, optionId) => {
    setPolls(prevPolls => prevPolls.map(poll => 
      poll.id === pollId
        ? {
            ...poll,
            options: poll.options.map(option =>
              option.id === optionId ? { ...option, votes: option.votes + 1 } : option
            ),
          }
        : poll
    ));
  };

  return (
    <PollContext.Provider value={{ polls, createPoll, vote }}>
      {children}
    </PollContext.Provider>
  );
};

export const usePoll = () => {
  const context = useContext(PollContext);
  if (context === undefined) {
    throw new Error('usePoll must be used within a PollProvider');
  }
  return context;
};