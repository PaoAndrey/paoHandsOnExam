import React from 'react';
import { usePoll } from '../contexts/PollContext';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const PollResult = () => {
  const { polls } = usePoll();

  if (polls.length === 0) {
    return <div className="bg-white p-6 rounded-lg shadow-md">No poll results available.</div>;
  }

  return (
    <div className="space-y-8">
      {polls.map((poll) => {
        const data = poll.options.map(option => ({
          name: option.text,
          value: option.votes
        }));

        return (
          <div key={poll.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Poll Results: {poll.question}</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <div className="mt-4">
              {poll.options.map(option => (
                <div key={option.id} className="flex justify-between items-center mb-2">
                  <span>{option.text}:</span>
                  <span>{option.votes} votes</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PollResult;