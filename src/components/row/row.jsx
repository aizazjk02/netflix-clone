import axios from "../../api/axios"
import "./row.css"
import { useState, useEffect } from "react"

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([])
    const posterBaseUrl = "https://image.tmdb.org/t/p/original"
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }

        fetchData()
    }, [fetchUrl])

 
    return (
        <>
            {
                movies && (

                    <div className="row">
                        <h3>
                            {title}
                        </h3>
                        <div className="row__posters">
                            {
                                movies.map(movie => {

                                    return (
                                        <img className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${posterBaseUrl}${isLargeRow ? movie.poster_path : movie.poster_path}`} alt={movie.name} key={movie.id} />
                                    )
                                }
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Row