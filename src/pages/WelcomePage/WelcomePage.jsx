import "./WelcomePage.scss";
import {useState} from "react";
import FeatureCard from "../../components/FeatureCard/FeatureCard";

export default function WelcomePage(props) {
    const [cardContainerVisible, setCardContainerVisible] = useState(false)
    const featureList = [
        {
            name: "音乐空间",
            description: "你现在的心情，适合怎样的音乐呢？",
            icon: "icon-customerservice-fill",
            href: ""
        }
    ]
    const cardItems = featureList.map((cardItem) => (
        <FeatureCard key={cardItem.name} cardItem={cardItem}/>
    ))

    function handleCardInOut() {
        let cards = document.getElementsByClassName("feature-card")
        for (let card of cards) {
            card.style.height = cardContainerVisible ? 0 : 10 + "em"
        }
        setCardContainerVisible(!cardContainerVisible)
    }

    return (
        <div className="welcome-main">
            <div className="title-container">
                <h1 className="welcome-title">Face show</h1>
                <p className="welcome-description">-- Have fun with your face --</p>
            </div>
            <button className="welcome-btn iconfont icon-face"
                    onClick={handleCardInOut}></button>
            {
                <div id="card-container" className="card-container">
                    {cardItems}
                </div>
            }
        </div>
    )
}
