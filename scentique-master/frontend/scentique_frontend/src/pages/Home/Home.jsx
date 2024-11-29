import React, { useState } from 'react'; // Add useState here
import'./Home.css'
import Header from '../../components/header/Header'
import ExploreFragrances from '../../components/ExploreFragrances/ExploreFragrances'
import PerfumeDisplay from '../../components/PerfumesDisplay/PerfumesDisplay';
import Blogs from '../../components/blogs/Blogs';

const Home = () => {
  const[category,setCategory]=useState("All");
  return (
    <div>
      <Header/>
      <ExploreFragrances category={category} setCategory={setCategory}/>
      <PerfumeDisplay category={category} ></PerfumeDisplay>
      <Blogs></Blogs>
    </div>
  )
}

export default Home
