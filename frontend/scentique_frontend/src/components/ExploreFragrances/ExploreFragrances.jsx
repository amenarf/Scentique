import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PerfumeDisplay from '../PerfumesDisplay/PerfumesDisplay';
import './ExploreFragrances.css';

const ExploreFragrances = () => {
  const [catalogList, setCatalogList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories/');
        setCatalogList(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Oops something went wrong loading categories. Try later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories(); 
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='explore-fragrances' id='explore-fragrances'>
      <h1>Explore our Fragrance Selection</h1>
      <p className='explore-fragrances-text'>
        Choose from a diverse collection of captivating fragrances.
      </p>

      <div className="explore-fragrances-list">
        {catalogList.map((item) => (
          <div 
            onClick={() => setSelectedCategoryId(item.id)} // Pass category ID
            key={item.id} 
            className={`explore-fragrances-list-item ${selectedCategoryId === item.id ? "active" : ""}`}
          >
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <hr />

      {/* Pass selectedCategoryId to PerfumeDisplay */}
      {selectedCategoryId && <PerfumeDisplay categoryId={selectedCategoryId} />}
    </div>
  );
};

export default ExploreFragrances;