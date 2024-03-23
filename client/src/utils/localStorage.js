export const getSavedCollegeIds = () => {
	const savedCollegeIds = localStorage.getItem('saved_colleges ')
		? JSON.parse(localStorage.getItem('saved_colleges '))
		: [];

	return savedCollegeIds;
};

export const saveCollegeIds = (collegeIdArr) => {
	if (collegeIdArr.length) {
		localStorage.setItem('saved_colleges ', JSON.stringify(collegeIdArr));
	} else {
		localStorage.removeItem('saved_colleges ');
	}
};

export const removeCollegeId = (collegeId) => {
	const savedCollegeIds = localStorage.getItem('saved_colleges ')
		? JSON.parse(localStorage.getItem('saved_colleges '))
		: null;

	if (!savedCollegeIds) {
		return false;
	}

	const updatedSavedCollegeIds = savedCollegeIds?.filter(
		(savedCollegeId) => savedCollegeId !== collegeId
	);
	localStorage.setItem(
		'saved_colleges ',
		JSON.stringify(updatedSavedCollegeIds)
	);

	return true;
};
