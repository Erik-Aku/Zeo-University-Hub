import axios from 'axios';

export const getMe = (token) => {
    return fetch('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
};

export const createUser = (userData) => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const loginUser = (userData) => {
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

// save book data for a logged in user
export const saveCollege = (collegeData, token) => {
    return fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(collegeData),
    });
};

// remove saved book data for a logged in user
export const deleteCollege = (collegeId, token) => {
    return fetch(`/api/users/books/${collegeId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export const searchColleges = async (searchInput) => {
    console.log(searchInput);
    try {
        const url = `https://universities-and-colleges.p.rapidapi.com/universities?page=20&includeUniversityDetails=true&countryCode=US&limit=10&search=${searchInput}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '259c12961cmshc2c28f256baa3b6p139941jsn5f85db5baba2',
                'X-RapidAPI-Host': 'universities-and-colleges.p.rapidapi.com'
            }
        };

        const response = await fetch(url, options);
        console.log(response);
        if (!response.ok) {
            throw new Error('something went wrong!');
        }

        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};