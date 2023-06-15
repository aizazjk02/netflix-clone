import "./plans.css"
import { useEffect, useState } from "react"
import { fetchProducts } from "../../firebase"
import { handleSubscriptionCheckout } from "../../firebase"
import { selectUserSubscription } from "../../redux/userSlice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Plans = () => {
    const [products, setProducts] = useState({})
    
    const [renewalDate, setRenewalDate] = useState(null)
    
    const userSubscription = useSelector(selectUserSubscription)
    const navigate = useNavigate()
    useEffect(() => {
        const getProductsFromCollection = async () => {
            const data = await (fetchProducts())
            setProducts(data)
        }
        getProductsFromCollection()
        getRenewalPeriod()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSubscription])
    
    const handleChekout = async (priceId) => {
        if (userSubscription?.status === "active") {
            alert("User already subscribed!")
            return
        }
        else
            await handleSubscriptionCheckout(priceId, { sucess_url: window.location.origin, cancel_url: window.location.origin }, navigate)
    }

    const getRenewalPeriod = () => {
        
            const date = new Date(userSubscription?.current_period_end * 1000)
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
    
            setRenewalDate(`${day}/${month}/${year}`)
        
        
    }
    return (
        <div>
       
                <div className="plans">
                {
                    userSubscription ? (<p className="renewal">Renewal date : {renewalDate}</p>) : ""
                }
                {
                    Object.entries(products).map(([productId, productData]) => {
                        
                        const subscribed = true && productData.name === userSubscription?.role

                        return (
                            
                            <div className="plans__container" key={productId}>
                            <div className="plans__info">
                            <p className="plan__name">{productData.name}</p>
                            <p className="plan__description">{productData.description}</p>
                            </div>
                            <button className={`subscribe__btn ${subscribed ? "unsubscribe" : ""}`} onClick={() => handleChekout(productData.prices.priceId)}>{subscribed ? "unsubscribe" : "subscribe"}</button>
                            </div>
                            
                            )
                        })
                    }
                    </div>
                
        </div>
    )
}

export default Plans

