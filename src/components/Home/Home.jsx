import React, {useState , useEffect} from 'react'
import movieApi from '../../api/movieApi'
import {APIKey} from '../../api/MovieApiKey'
import { useDispatch } from 'react-redux'
import {addMovie} from '../../store/Reducer'
import './Home.scss'

import MovieListing from '../MovieListing/MovieListing'

function Home() {
    const dispatch = useDispatch();
    const [search , setSearch] = useState("");
    // console.log(search); seach log

    useEffect(() =>{
        const fetchMovie = async () =>{
            const searchKey = search ? search : "star";
            const res = await movieApi.get(`?apikey=${APIKey}&s=${searchKey}&type=movie`)
            
            setTimeout(() =>{
                dispatch(addMovie(res.data.Search))
            },500);
        
        }
        fetchMovie();
    },[search]);


  return (
    <div>
      <h3 style={{margin: "1rem 0"}}>Movies</h3>
      <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />
      <MovieListing />
    </div>
  )
}

export default Home