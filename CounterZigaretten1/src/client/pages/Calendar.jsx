import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getCounters from '@wasp/queries/getCounters';
import incrementCounter from '@wasp/actions/incrementCounter';
import decrementCounter from '@wasp/actions/decrementCounter';

export function Calendar() {
  const { data: counters, isLoading, error } = useQuery(getCounters);
  const incrementCounterFn = useAction(incrementCounter);
  const decrementCounterFn = useAction(decrementCounter);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleIncrement = (counterId) => {
    incrementCounterFn({ counterId });
  };

  const handleDecrement = (counterId) => {
    decrementCounterFn({ counterId });
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Calendar</h1>
      <div className='grid grid-cols-7 gap-4'>
        {counters.map((counter) => (
          <div
            key={counter.id}
            className='bg-gray-200 p-4 rounded-lg flex flex-col items-center'
          >
            <h2 className='text-xl mb-2'>{counter.date}</h2>
            <div className='flex gap-2'>
              <button
                onClick={() => handleIncrement(counter.id)}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                +1
              </button>
              <button
                onClick={() => handleDecrement(counter.id)}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              >
                -1
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-4'>
        <Link
          to='/statistics'
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Go to Statistics
        </Link>
      </div>
    </div>
  );
}