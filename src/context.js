import React ,{useEffect,useState,useContext} from "react";




 export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`
const Appcontext = React.createContext();

const AppProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [isError, setIsError] = useState({ show: "false", msg: "" })
    const [query ,setQuery]= useState ("titanic")


    const getMovies = async (url) => {
        setIsLoading(true)
        try {
            const res = await fetch(url)
            const data =  await res.json()
            console.log("data", data)
            if (data.Response === "True") {
                setIsLoading(false)
                setIsError({
                    show: false,
                    msg: ""
                })
                setMovies(data.Search)
            } else {
                setIsError({
                    show: true,
                    msg: data.Error
                }
                 )
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { 
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 500);
        return ()=> clearTimeout(timerOut)
        },[query]);
    return <Appcontext.Provider value={{isLoading, movies, isError,query ,setQuery}}>{ children}</Appcontext.Provider>
}

const useGlobalContext = () => {
    return useContext(Appcontext)
}


export {AppProvider , Appcontext,useGlobalContext}