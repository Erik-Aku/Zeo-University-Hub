import { generateHashId } from '../utils/helpers';

export const searchColleges = async (query) => {
    console.log(query);
    if (!query) return [];

    const apiKey = 'TsbiBlKfrodbx9jMgXWNJe2jbDBI1iV1KpUhoHXD';
    const fields = 'school.name,school.city,school.state,latest.student.size';
    const endpoint = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${encodeURIComponent(query)}&fields=${fields}&per_page=50`;
    console.log(endpoint);

    try {
        const response = await fetch(endpoint);
        console.log(response);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        return data.results.map((college) => ({
            id: generateHashId(college['school.name'], college['school.city'], college['school.state']),
            name: college['school.name'],
            city: college['school.city'],
            state: college['school.state'],
            size: college['latest.student.size']
        }));
    } catch (error) {
        console.error('Error fetching college data:', error);
        return [];
    }
};
