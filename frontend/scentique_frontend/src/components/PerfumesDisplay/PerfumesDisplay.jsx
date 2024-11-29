import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PerfumeItem from '../PerfumeItem/PerfumeItem';
import './PerfumeDisplay.css';

const PerfumeDisplay = ({ categoryId }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(false); // Initially, no request is being made
  const [error, setError] = useState('');

  // Fetch perfumes based on categoryId
  useEffect(() => {
    // Only make the request if a valid categoryId is provided
    if (categoryId) {
      const fetchPerfumes = async () => {
        setLoading(true); // Start loading when fetching begins
        try {
          const response = await axios.get(`/api/category/${categoryId}/`);
          setPerfumes(response.data);
        } catch (error) {
          setError('Oops, something went wrong loading perfumes. Try later.');
        } finally {
          setLoading(false); // End loading after the request is completed
        }
      };

      fetchPerfumes();
    }
  }, [categoryId]); // Run effect only when categoryId changes

  return (
    <div className='perfume-display'>
      {loading && <p>Loading perfumes...</p>}
      
      {error && <p>{error}</p>}

      {/* Show perfumes only if a category is selected and no errors occurred */}
      {categoryId && !loading && !error && (
        <div className='perfume-display-list'>
          {perfumes.length > 0 ? (
            perfumes.map((perfume) => (
              <PerfumeItem 
                key={perfume.id}  // Ensure unique key prop is provided
                id={perfume.id} 
                name={perfume.name} 
                description={perfume.description} 
                image={perfume.image} 
                price={perfume.price} 
              />
            ))
          ) : (
            <p>No perfumes available for this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PerfumeDisplay;