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

export const searchColleges = async (query) => {
    console.log(query);
    if (!query) return [];

    const apiKey = 'TsbiBlKfrodbx9jMgXWNJe2jbDBI1iV1KpUhoHXD';
    const fields = 'school.name,school.city,school.state,latest.student.size';
    const endpoint = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${encodeURIComponent(query)}&fields=${fields}&per_page=50`; // Adjust 'per_page' as needed
    console.log(endpoint);

    try {
        const response = await fetch(endpoint);
        console.log(response);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        // Transform the data to match the expected format for your app
        return data.results.map((college) => ({
            id: college['school.id'],
            name: college['school.name'],
            city: college['school.city'],
            state: college['school.state'],
            size: college['latest.student.size'],
            tuition: college['latest.cost.tuition'],
            admissions: college['latest.admissions.admission_rate.overall'],
            degrees: college['school.degrees_awareded.predominant']
        }));
    } catch (error) {
        console.error('Error fetching college data:', error);
        return [];
    }
};


// export const searchColleges = async (searchInput) => {
//     console.log(searchInput);
//     try {
//         const url = `https://universities-and-colleges.p.rapidapi.com/universities?page=20&includeUniversityDetails=true&countryCode=US&limit=10&search=${searchInput}`;
//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': '259c12961cmshc2c28f256baa3b6p139941jsn5f85db5baba2',
//                 'X-RapidAPI-Host': 'universities-and-colleges.p.rapidapi.com'
//             }
//         };

//         const response = await fetch(url, options);
//         console.log(response);
//         if (!response.ok) {
//             throw new Error('something went wrong!');
//         }

//         const result = await response.json();
//         console.log(result);
//         return result;
//     } catch (error) {
//         console.error(error);
//     }
// };