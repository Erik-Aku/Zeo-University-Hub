import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { searchColleges, saveCollege } from './API';
import { saveCollegeIds, getSavedCollegeIds } from './localStorage';

const SearchColleges = () => {
	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [searchHistory, setSearchHistory] = useState([]);
	const [savedCollegeIds, setSavedCollegeIds] = useState(
		getSavedCollegeIds()
	);

	useEffect(() => {
		return () => saveCollegeIds(savedCollegeIds);
	}, [savedCollegeIds]);

	// Function to handle form submission
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		if (!inputValue) return;
		searchColleges(inputValue);
	};

	// Handle input change
	const handleInputChange = (event) => {
		const { value } = event.target;
		setInputValue(value);
		searchColleges(value);

		if (!value) {
			setSuggestions([]);
		}
	};

	// Handle selection from suggestions, adding to search history
	const handleSelectSuggestion = (suggestion) => {
		setInputValue(suggestion);
		setSuggestions([]);
		setSearchHistory((prevHistory) => {
			const updatedHistory = [
				suggestion,
				...prevHistory.filter((item) => item !== suggestion)
			];
			return updatedHistory.slice(0, 5); // Keep only the last 5 items
		});
	};

	// Function to handle saving a college
	const handleSaveCollege = async (collegeName) => {
		// The saveCollege function would need to be adapted to handle the college data structure
		const token = 'your-auth-token-here'; // Replace this with actual token retrieval logic

		if (!token) {
			return false;
		}

		try {
			await saveCollege({ name: collegeName }, token);
			setSavedCollegeIds([...savedCollegeIds, collegeName]);
		} catch (err) {
			console.error(err);
		}
	};

    return (
        <>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Search for colleges"
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div>
                {searchHistory.length > 0 && (
                    <div>
                        <h4>Search History</h4>
                        <ul>
                            {searchHistory.map((item, index) => (
                                <li key={index} onClick={() => handleSelectSuggestion(item)}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {suggestions.length > 0 && (
                    <div>
                        <h4>Suggestions</h4>
                        <ul>
                            {suggestions.map((collegeName, index) => (
                                <li key={index} onClick={() => handleSelectSuggestion(collegeName)}>
                                    {collegeName}
                                    <button onClick={() => handleSaveCollege(collegeName)}>Save</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchColleges;
