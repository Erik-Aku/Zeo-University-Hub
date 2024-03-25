export const getSavedCollegeIds = () => {
    const savedCollegeItem = localStorage.getItem('saved_colleges');
    console.log("Retrieved saved_colleges from localStorage:", savedCollegeItem);

    if (!savedCollegeItem) {
        return [];
    }

    try {
        return JSON.parse(savedCollegeItem);
    } catch (error) {
        console.error("Error parsing saved colleges from localStorage:", error);
        return [];
    }
};

export const saveCollegeIds = (collegeIdArr) => {
    if (collegeIdArr.length) {
        localStorage.setItem('saved_colleges', JSON.stringify(collegeIdArr));
    } else {
        localStorage.removeItem('saved_colleges');
    }
};

export const removeCollegeId = (collegeId) => {
    const savedCollegeIds = localStorage.getItem('saved_colleges')
        ? JSON.parse(localStorage.getItem('saved_colleges'))
        : null;

    if (!savedCollegeIds) {
        return false;
    }

    const updatedSavedCollegeIds = savedCollegeIds.filter(
        (savedCollegeId) => savedCollegeId !== collegeId
    );
    localStorage.setItem('saved_colleges', JSON.stringify(updatedSavedCollegeIds));

    return true;
};