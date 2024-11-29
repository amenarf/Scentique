import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PerfumeSearchDisplay from '../../components/PerfumeSearchDisplay/PerfumesSearchDisplay';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    // Get the search query from the URL
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setKeyword(searchQuery);
    }
  }, [searchParams]); // Re-run the effect when searchParams change

  return (
    <div>
      <h1>Results</h1>
      {/* Pass the keyword to PerfumeSearchDisplay */}
      <PerfumeSearchDisplay keyword={keyword} />
    </div>
  );
};

export default Search;