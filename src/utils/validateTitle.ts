export const validateTitle = (title: string): string | undefined => {
  if (!title) return 'Please enter a title.';
  if (title.length < 3) return 'Your title is too short.';
  if (title === 'Chicken Nuggets') return 'Chicken Nuggets '.repeat(10)
}; 