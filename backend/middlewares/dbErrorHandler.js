'use strict';

const uniqueFieldName = error => {
	let output;
	try {
		const message = error.message;
		let fieldName = message.substring(
			message.lastIndexOf('.$') + 2,
			message.lastIndexOf('_1')
		);
		output =
			fieldName.charAt(0).toUpperCase() +
			fieldName.slice(1) +
			' Already Exists.';
	} catch (err) {
		output = 'This Field Already Exists.';
	}

	return output;
};

const dbErrorHandler = error => {
	let message = '';

	if (error.code) {
		switch (error.code) {
			case 11000:
			case 11001:
				message = uniqueFieldName(error);
				break;
			default:
				message = 'Something Went Wrong…';
		}
	} else {
		for (let errorName in error.errors) {
			if (error.errors[errorName].message) {
				message = error.errors[errorName].message;
			}
		}
	}

	return message;
};

export default dbErrorHandler;
