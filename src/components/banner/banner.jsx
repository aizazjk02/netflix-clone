import "./banner.css"
// import BannerImage from "../../assets/daredevil_banner.jpg"
import { useEffect, useState } from "react"
import axios from "../../api/axios"
import requests from "../../api/request"
const Banner = () => {
    const [banner, setBanner] = useState([])

    useEffect(() => {
        const fetchDataForBanner = async () => {
            const request = await axios.get(requests.fetchTrending)
            setBanner(request.data.results[Math.floor(Math.random() * (request.data.results.length - 1))])
        }

        fetchDataForBanner()
    }, [])
    const truncate = (str, max) => {
        return str.length > max ? str.substr(0, max - 1) + "..." : str
    }
    console.log(banner)
    const { original_title, title, name, overview, backdrop_path } = banner
    return (
        <>
            {
                banner &&
                <header className="banner" style={
                    {
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
                        backgroundSize: "cover"
                    }
                }>
                    <div className="banner__contents">
                        <h2 className="banner__title">{original_title || title || name}</h2>
                        <div className="banner__buttons">
                            <button className="banner__button">Play</button>
                            <button className="banner__button">My List</button>
                        </div>
                        <p className="banner__description">
                            {
                                truncate(`${overview}`, 150)
                            }
                        </p>
                    </div>
                    <div className="banner--fadeBottom" />
                </header>
            }
        </>
    )
}

export default Banner