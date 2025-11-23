export const getInstallationPPMColor = (value: number, min: number, max: number): string => {
	if (value >= min && value <= max) return 'text-green-600 bg-green-50 border-green-200';
	if (value < min * 0.8 || value > max * 1.2) return 'text-red-600 bg-red-50 border-red-200';
	return 'text-yellow-600 bg-yellow-50 border-yellow-200';
};

export const getInstallationStatusColor = (value: number): string => {
	if (value == 0) return 'bg-red-600 text-white';
	if (value == 1) return 'bg-green-600 text-white';
	return 'bg-yellow-600 text-white';
};