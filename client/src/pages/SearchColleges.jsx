import React, { useState, useEffect } from 'react';
import axios from 'axios'; //use axios for scaling

const SearchColleges = () => {
	const [inputValue, setInputValue] = useState('');
	const [searchSuggestions, setSearchSuggestions] = useState([]);
	const [searchedColleges, setSearchedColleges] = useState([]);
	const [searchHistory, setSearchHistory] = useState([]);
	const [savedColleges, setSavedColleges] = useState([]);

	useEffect(() => {
		return () => saveColleges(savedColleges);
	});

	// Function to fetch colleges based on user input
	const fetchColleges = async (query) => {
		if (!query) return;

		try {
			const response = await axios.get(`http://universities-and-colleges.p.rapidapi.com/`, {
                params: { name: query },
                headers: {
                    'X-RapidAPI-Host': 'universities-and-colleges.p.rapidapi.com',
                    'X-RapidAPI-Key': '447a932fd1msh0d9dd0f0212fec5p10a804jsna36243841f48'
                }
            });

			// Assuming the API returns an array of college names
			setSearchSuggestions(response.data.map((college) => college.name));
		} catch (error) {
			console.error('Error fetching college data:', error);
			setSearchSuggestions([]);
		}
	};
};

export default SearchColleges;
