import React, { useState, useEffect } from 'react';
import { searchColleges, saveCollege, deleteCollege } from './API';
import { saveCollegeIds, getSavedCollegeIds } from './localStorage';

const SearchColleges = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [savedCollegeIds, setSavedCollegeIds] = useState(getSavedCollegeIds());

    useEffect(() => {
        return () => saveCollegeIds(savedCollegeIds);
    }, [savedCollegeIds]);

    // Handle input change
    const handleInputChange = (event) => {
        const { value } = event.target;
        setInputValue(value);
        fetchColleges(value);

        if (!value) {
            setSuggestions([]);
        }
    };

    // Handle selection from suggestions, adding to search history
    const handleSelectSuggestion = (suggestion) => {
        setInputValue(suggestion);
        setSuggestions([]);
        setSearchHistory((prevHistory) => {
            const updatedHistory = [suggestion, ...prevHistory.filter(item => item !== suggestion)];
            return updatedHistory.slice(0, 5); // Keep only the last 5 items
        });
    };

    // Function to handle saving a college
    const handleSaveCollege = async (collegeId) => {
        const collegeToSave = suggestions.find((college) => college.id === collegeId);

        const token = '447a932fd1msh0d9dd0f0212fec5p10a804jsna36243841f48';

        if (!token) {
            return false;
        }

        try {
            await saveCollege(collegeToSave, token);
            setSavedCollegeIds([...savedCollegeIds, collegeToSave.id]);
        } catch (err) {
            console.error(err);
        }
    };

    // Function to handle deleting a saved college
    const handleDeleteCollege = async (collegeId) => {
        const token = '447a932fd1msh0d9dd0f0212fec5p10a804jsna36243841f48';

        if (!token) {
            return false;
        }

        try {
            await deleteCollege(collegeId, token);
            const updatedSavedCollegeIds = savedCollegeIds.filter(id => id !== collegeId);
            setSavedCollegeIds(updatedSavedCollegeIds);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search for colleges"
            />
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
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>{suggestion}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchColleges;
