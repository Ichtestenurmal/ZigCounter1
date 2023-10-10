import React from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getNotifications from '@wasp/queries/getNotifications';
import createNotification from '@wasp/actions/createNotification';

export function Notifications() {
  const { data: notifications, isLoading, error } = useQuery(getNotifications);
  const createNotificationFn = useAction(createNotification);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateNotification = () => {
    createNotificationFn({ message: 'New notification' });
  };

  return (
    <div className='p-4'>
      <button
        onClick={handleCreateNotification}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Notification
      </button>
      <div className='mt-4'>
        {notifications.map((notification) => (
          <div key={notification.id} className='p-2 bg-gray-100 rounded-lg mb-2'>
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
}