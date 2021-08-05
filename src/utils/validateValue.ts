export const validateValue = (valueString: string): string | undefined => {
	const value = parseFloat(valueString);
	if (!value) return 'Value can not be empty.';
	if (value < 0.1) return 'Value has to be between 0.1 and 0.9.'
	if (value > 0.9) return 'Value has to be between 0.1 and 0.9.'
	return undefined;
};