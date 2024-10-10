import React, { createContext, useState, useContext } from 'react';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}

interface PollContextType {
  currentPoll: Poll | null;
  createPoll: (question: string, options: string[]) => void;
  vote: (optionId: string) => void;
}

const PollContext = createContext<PollContextType | undefined>(undefined);

export const PollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPoll, setCurrentPoll] = useState<Poll | null>(null);

  const createPoll = (question: string, options: string[]) => {
    const newPoll: Poll = {
      id: Date.now().toString(),
      question,
      options: options.map(option => ({
        id: Date.now().toString() + Math.random(),
        text: option,
        votes: 0,
      })),
    };
    setCurrentPoll(newPoll);
  };

  const vote = (optionId: string) => {
    if (!currentPoll) return;

    setCurrentPoll(prevPoll => ({
      ...prevPoll!,
      options: prevPoll!.options.map(option =>
        option.id === optionId ? { ...option, votes: option.votes + 1 } : option
      ),
    }));
  };

  return (
    <PollContext.Provider value={{ currentPoll, createPoll, vote }}>
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