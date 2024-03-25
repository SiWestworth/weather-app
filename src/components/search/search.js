// Importing necessary modules and components
import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../Api";

// The Search component
const Search = ({ onSearchChange }) => {
  // State variable for the search
  const [search, setSearch] = useState(null);

  // Function to load options for the search
  const loadOptions = async (inputValue) => {
    // Fetching city data from the Geo API
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        // Mapping the response data to options for the search
        return {
          options: response.data.map((city) => {
            return {
              label: `${city.name}, ${city.countryCode}`, // City name and country code as the label
              value: `${city.latitude}, ${city.longitude}`, // City latitude and longitude as the value
            };
          }),
        };
      });
  };

  // Function to handle changes in the search
  const handleOnChange = (selectedOption) => {
    // Updating the search state and calling the onSearchChange prop
    setSearch(selectedOption);
    onSearchChange(selectedOption);
  };

  // Rendering the AsyncPaginate component for the search
  return (
    <AsyncPaginate
      placeholder="Search for city" // Placeholder for the search
      debounceTimeout={600} // Debounce timeout for the search
      value={search} // Value of the search
      onChange={handleOnChange} // Function to handle changes in the search
      loadOptions={loadOptions} // Function to load options for the search
    />
  );
};

// Exporting the Search component
export default Search;
