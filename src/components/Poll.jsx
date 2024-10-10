import React, { useState } from 'react';
import { usePoll } from '../contexts/PollContext';

const Poll = () => {
  const { createPoll } = usePoll();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleCreatePoll = (e) => {
    e.preventDefault();
    if (question && options.every(option => option.trim())) {
      createPoll(question, options);
      setQuestion('');
      setOptions(['', '']);
    }
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Poll</h2>
      <form onSubmit={handleCreatePoll}>
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-700 font-bold mb-2">Question</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <label htmlFor={`option-${index}`} className="block text-gray-700 font-bold mb-2">Option {index + 1}</label>
            <input
              type="text"
              id={`option-${index}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addOption} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Add Option
        </button>
        <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default Poll;