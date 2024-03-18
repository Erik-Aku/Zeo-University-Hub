// Save college IDs to local storage
export const saveCollegeIds = (collegeIdArray) => {
	localStorage.setItem('saved_collegeIds', JSON.stringify(collegeIdArray));
};

// Retrieve college IDs from local storage
export const getSavedCollegeIds = () => {
	const savedCollegeIds = localStorage.getItem('saved_collegeIds');
	return savedCollegeIds ? JSON.parse(savedCollegeIds) : [];
};
