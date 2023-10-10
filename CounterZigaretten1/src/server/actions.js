import HttpError from '@wasp/core/HttpError.js'

function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const incrementCounter = async ({ type }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const today = new Date().toISOString().substring(0, 10);

  let counter = await context.entities.Counter.findUnique({
    where: { type, date: today, userId: context.user.id }
  });

  if (counter) {
    return context.entities.Counter.update({
      where: { id: counter.id },
      data: { value: counter.value + 1 }
    });
  } else {
    return context.entities.Counter.create({
      data: { type, value: 1, date: today, userId: context.user.id }
    });
  }
}

export const decrementCounter = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const counter = await context.entities.Counter.findFirst({
    where: {
      type: args.type,
      userId: context.user.id,
      date: getTodayDate()
    }
  });

  if (!counter || counter.value <= 0) { throw new HttpError(400, 'Counter not found or value is already zero') };

  const updatedCounter = await context.entities.Counter.update({
    where: { id: counter.id },
    data: { value: counter.value - 1 }
  });

  return updatedCounter;
}

export const createNotification = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { message } = args;

  const notification = await context.entities.Notification.create({
    data: {
      message,
      userId: context.user.id
    }
  });

  return notification;
}