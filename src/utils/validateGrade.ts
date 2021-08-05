export const validateGrade = (gradeString: string): string | undefined => {
	const grade = parseInt(gradeString);
	if (grade % 1 !== 0) return 'Grade has to be a round number.';
	if (grade < 1) return 'Grade has to be between 1 and 6.';
	if (grade > 6) return 'Grade has to be between 1 and 6.';
	return undefined;
};