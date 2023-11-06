import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Footer, Navbar, SearchResultCard } from '../components';
import { searchPlaces } from '../api';
import axios from 'axios';
import { SearchResultLoader } from '../components/loaders';

const SearchResult = () => {
  const history = useHistory();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const initialLocation = queryParams.get('location');

  const [location, setLocation] = useState(initialLocation);
  const [term, setTerm] = useState(initialLocation);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedOption, setSelectedOption] = useState('distance');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSortChange = e => {
    setSelectedOption(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    let source = axios.CancelToken.source();
  
    setIsLoading(true);
  
    searchPlaces(location, {
      limit: 30,
      sort: selectedOption,
      category: selectedCategory,
    }, source)
      .then((data) => {
        if (selectedOption === 'rating') {
          // If sorting by star ratings, make sure the `starRating` property is correctly named.
          // Sort the data by star ratings in descending order.
          data.sort((a, b) => b.starRating - a.starRating);
        }
  
        setSearchResults(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  
    return () => {
      source.cancel();
    };
  }, [location, selectedOption, selectedCategory]);
  
  
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(term);
    history.push(`/search?location=${term}`);
  };

  const topResults = searchResults.filter(result => result.is_top_result);
  const moreResults = searchResults.filter(result => !result.is_top_result);

  return (
    <>
      <Navbar border />
      <div className='relative'>
        <div className={`bg-white sticky-top ${scrolled && 'shadow'} z-30`}>
          <form className='container mx-auto p-4 flex space-x-2' onSubmit={handleSubmit}>
            <div className='relative w-full'>
              <input
                type='text'
                className='w-full border rounded-sm pl-10 pr-4 py-2 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none'
                value={term}
                onChange={e => setTerm(e.target.value)}
              />
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 absolute top-3 left-3 text-secondary' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd' />
              </svg>
            </div>
            <button className='bg-secondary py-2 px-3 md:px-6 rounded-sm hidden sm:inline cursor-pointer hover-bg-cyan-400 transition ease-in duration-200'>
              <p className='font-semibold'>Search</p>
            </button>
          </form>

          <div className='container mx-auto p-4 flex items-center justify-between'>
            <div className='relative'>
              <select
                value={selectedOption}
                onChange={handleSortChange}
                className='focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md border border-gray-300 w-full p-2'
              >
                <option value='distance'>Sort by Distance</option>
                <option value='rating'>Sort by Rating</option>
              </select>
            </div>
            <div className='relative'>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className='focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md border border-gray-300 w-full p-2'
              >
                <option value='all'>All Categories</option>
                <option value='restaurant'>Restaurants</option>
                <option value='hotel'>Hotels</option>
                <option value='attraction'>Attractions</option>
              </select>
            </div>
          </div>
        </div>

        {(!searchResults.length || isLoading) && <SearchResultLoader />}

        {searchResults.length && !isLoading && (
          <>
            <div className='container mx-auto p-4'>
              <div className='border shadow'>
                <div className='border-b p-4'>
                  <h2 className='font-semibold text-xl'>Top result matches "{location}"</h2>
                </div>
                <div>
                  {topResults.map((result, i) => (
                    <SearchResultCard key={i} result={result} />
                  ))}
                </div>
              </div>
            </div>

            <div className='container mx-auto p-4'>
              <div className='border shadow'>
                <div className='border-b p-4'>
                  <h2 className='font-semibold text-xl'>More results matching "{location}"</h2>
                </div>
                <div>
                {moreResults
  .filter((result) => {
    if (selectedCategory === 'all') {
      return true;
    } else if (selectedCategory === 'restaurant') {
      // Check if the category key exists in result_object and matches 'restaurant'
      return result.result_object.category.key === 'restaurant';
    } else {
      // Handle other categories
      return result.result_object.category.key === selectedCategory;
    }
  })
  .map((result, i) => (
    <SearchResultCard key={i} result={result} />
  ))
}

                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default SearchResult;
