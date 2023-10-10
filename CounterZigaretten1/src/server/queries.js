import HttpError from '@wasp/core/HttpError.js'

export const getCounters = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { date } = args;
  const counters = await context.entities.Counter.findMany({
    where: {
      user: { id: context.user.id },
      date
    }
  });

  if (counters.length === 0) { throw new HttpError(400) };

  return counters;
}

export const getNotifications = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const notifications = await context.entities.Notification.findMany({
    where: { userId: context.user.id }
  });

  return notifications;
}