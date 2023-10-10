import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getCounters from '@wasp/queries/getCounters';

export function Statistics() {
  const { data: counters, isLoading, error } = useQuery(getCounters);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Smoking Statistics</h2>
      <div>
        <h3 className="text-xl font-bold">Counters:</h3>
        {counters.map((counter) => (
          <div key={counter.id} className="mt-2">
            <p>{counter.type}: {counter.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}