export const validateBody = (body: string): string | undefined => {
  if (!body) return 'Please enter a body.';
  if (body.length < 5) return 'Your body is too short.';
  if (body === 'Amigos') return 'You have to pass the ten phases first';
};