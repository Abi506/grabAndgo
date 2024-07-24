import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CiStar } from "react-icons/ci";

import "./mostRated.css"
const randomValues = [12, 30, 18, 24, 39, 47, 50,17, 58, 5, 8, 40, 32, 21, 39, 8];
const randomDigit = Math.round(Math.random() * (randomValues.length - 1));

const MostRatedFoodCarousel = ({ mostRatedFoodData }) => {
    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 4,
            partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: {
                max: 1024,
                min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
        },
        mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
        }
    };

    return (
        <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            autoPlay={true}
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {mostRatedFoodData.map((food, index) => (
                <div key={index} className="food-item">
                    <img src={food.imageUrl} alt={food.food_name} style={{width:"280px",height:"260px",borderRadius:"12px"}}/>
                    <h3 className='food-text'>{food.food_name}</h3>
                    <p className='food-description'>Chicken Biryani is a flavorful and aromatic rice dish made with marinated chicken, basmati rice, spices, and herbs, often garnished with fried onions and fresh cilantro.</p>
                    <div className='d-flex'>
                    <p className='food-rating-para'><span><CiStar className='food-rating'/></span>{food.rating}</p>
                    <p className='food-price-para' style={{textDecoration:"line-through",fontSize:12,marginRight:0}}> ₹{food.price+randomDigit}</p>
                    <p className='food-price-para'style={{marginLeft:0}}> ₹{food.price}</p>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default MostRatedFoodCarousel;
