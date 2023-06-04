import { NavLink, useParams } from "react-router-dom";
import useFetch from "./useFetch";
// import {useParams} from "react-router-dom"
import { API_URL } from "./context";
import React ,{useState,useEffect} from "react"

const SingleMovie = () => {
  const { id } = useParams();
  console.log(id);

  // const { isLoading, movie, isError } = useFetch(`&i=${id}`);
  
  const [isLoading, setIsLoading,isError, setIsError] = useState(true)
    const [movies, setMovies] = useState([])
    // const [] = useState({ show: "false", msg: "" })


    const getMovies = async (url) => {
        setIsLoading(true)
        try {
            const res = await fetch(url)
            const data =  await res.json()
            console.log("data", data)
            if (data.Response === "True") {
                setIsLoading(false)
                 setMovies(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
  
  
    useEffect(() => { 
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&i=${id}`);
        }, 500);
        return ()=> clearTimeout(timerOut)
        },[id]);



  if (isLoading) {
    return (
      <section className="movie-section">
        <div className="loading">Loading....</div>
      </section>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movies.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movies.Title}</p>
          <p className=""></p>
          <p className="card-text">{movies.Released}</p>
          <p className="card-text">{movies.Genre}</p>
          <p className="card-text">{movies.imdbRating} / 10</p>
          <p className="card-text">{movies.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
