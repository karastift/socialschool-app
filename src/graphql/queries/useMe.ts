import { useQuery } from 'urql';

export function useMe() {
  return useQuery({
    query: `
      {
        me {
          id
          username
          email
          school {
            schoolName
          }
        }
      }
    `
  });
}