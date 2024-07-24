import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Image } from 'react-bootstrap';

import {
    homeBriyani, homeBurger, homeCake,
    homeGulabJamun, homeIceCream, homeIdli,
    homeNoodles, homePizza, homePuttu,
    homeRolls, homeShakes, homeSwarma
} from '../../images/homeCarouselImages/index';

const carouselImages = [
    { src: homeBurger, alt: "Burger" },
    { src: homeBriyani, alt: "Briyani" },
    { src: homeCake, alt: "Cake" },
    { src: homeGulabJamun, alt: "Gulab Jamun" },
    { src: homeIceCream, alt: "Ice Cream" },
    { src: homeIdli, alt: "Idli" },
    { src: homeNoodles, alt: "Noodles" },
    { src: homePizza, alt: "Pizza" },
    { src: homePuttu, alt: "Puttu" },
    { src: homeRolls, alt: "Rolls" },
    { src: homeShakes, alt: "Shakes" },
    { src: homeSwarma, alt: "Swarma" },
];

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        partialVisibilityGutter: 40
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        partialVisibilityGutter: 30
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        partialVisibilityGutter: 30
    }
};

function HomeCarousel() {
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
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
            {
                carouselImages.map((eachImage,index)=>(
                  <img src={eachImage.src} key={index} alt={eachImage.alt} style={{marginTop:"50px",width:"160px",background:"transparent"}} /> 
                ))
            }
        </Carousel>
        
    );
    
}

export default HomeCarousel