import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getCounters from '@wasp/queries/getCounters';
import incrementCounter from '@wasp/actions/incrementCounter';
import decrementCounter from '@wasp/actions/decrementCounter';

export function HomePage() {
  const { data: counters, isLoading, error } = useQuery(getCounters);
  const incrementCounterFn = useAction(incrementCounter);
  const decrementCounterFn = useAction(decrementCounter);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {counters.map((counter) => (
        <div
          key={counter.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{counter.type}</div>
          <div>{counter.value}</div>
          <div>
            <button
              onClick={() => incrementCounterFn({ type: counter.type })}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              +
            </button>
            <button
              onClick={() => decrementCounterFn({ type: counter.type })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              -
            </button>
          </div>
        </div>
      ))}
      <Link to='/calendar' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Calendar</Link>
      <Link to='/statistics' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>Statistics</Link>
      <Link to='/notifications' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>Notifications</Link>
    </div>
  );
}