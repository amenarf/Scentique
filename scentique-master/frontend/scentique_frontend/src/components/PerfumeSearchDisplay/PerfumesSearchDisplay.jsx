import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PerfumeItem from '../PerfumeItem/PerfumeItem';
import './PerfumeDisplay.css';

const PerfumeSearchDisplay = ({ keyword }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (keyword) {
      const fetchPerfumes = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/search/${keyword}/`);
          setPerfumes(response.data.data);
        } catch (error) {
          setError('Oops, something went wrong loading perfumes. Try later.');
        } finally {
          setLoading(false);
        }
      };

      fetchPerfumes();
    }
  }, [keyword]);

  return (
    <div className='perfume-display'>
      {/* Show perfumes only if a category is selected and no errors occurred */}
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
            <p>No perfumes available for this keyword.</p>
          )}
        </div>
    </div>
  );
};

export default PerfumeSearchDisplay;