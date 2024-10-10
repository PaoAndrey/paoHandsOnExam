import React, { useState } from 'react';
import { usePoll } from '../contexts/PollContext';

const Poll: React.FC = () => {
  const { currentPoll, createPoll, vote } = usePoll();
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '']);

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion && newOptions.every(option => option.trim())) {
      createPoll(newQuestion, newOptions);
      setNewQuestion('');
      setNewOptions(['', '']);
    }
  };

  const handleVote = (optionId: string) => {
    vote(optionId);
  };

  const addOption = () => {
    setNewOptions([...newOptions, '']);
  };

  return (
    <div className="card">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">Live Poll</h5>
      </div>
      <div className="card-body">
        {currentPoll ? (
          <div>
            <h6>{currentPoll.question}</h6>
            {currentPoll.options.map((option) => (
              <div key={option.id} className="mb-2">
                <button
                  className="btn btn-outline-primary w-100 text-start"
                  onClick={() => handleVote(option.id)}
                >
                  {option.text} ({option.votes} votes)
                </button>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleCreatePoll}>
            <div className="mb-3">
              <label htmlFor="question" className="form-label">Question</label>
              <input
                type="text"
                className="form-control"
                id="question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                required
              />
            </div>
            {newOptions.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...newOptions];
                    updatedOptions[index] = e.target.value;
                    setNewOptions(updatedOptions);
                  }}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              </div>
            ))}
            <button type="button" className="btn btn-secondary mb-2" onClick={addOption}>
              Add Option
            </button>
            <button type="submit" className="btn btn-success w-100">Create Poll</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Poll;