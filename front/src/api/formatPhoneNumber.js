const formatPhoneNumber = (number) => {
	const cleaned = number.replace(/\D/g, '');
	const match = cleaned.match(/^(7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/);
	
	return match ? `+7 (${match[2]}) ${match[3]}-${match[4]}-${match[5]}` : number;
};

export default formatPhoneNumber;