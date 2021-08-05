import { subjects } from '../data/subjects.json';
export const validateSubject = (subject: string): string | undefined => {
	if (!subject) return 'Subject can not be empty';
	return undefined;
};