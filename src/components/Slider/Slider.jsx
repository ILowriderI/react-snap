import  PropTypes from 'prop-types';
import { useState } from "react";
import arrow from "../../img/arrow.png";
import styles from "./Slider.module.scss";

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slide_cont}>
        <img
          src={arrow}
          alt="arrow"
          onClick={goToPrevious}
          className={styles.left_arrow}
        />

        <img
          src={slides[currentIndex].url}
          alt="image"
          className={styles.img_slide}
        />
        <img
          src={arrow}
          alt="arrow"
          onClick={goToNext}
          className={styles.right_arrow}
        />
      </div>
      <div className={styles.dots_cont}>
        {slides.map((slide, slideIndex) => (
          <div
            className={styles.dot}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

Slider.propTypes = {
  slides: PropTypes.array,
}

export default Slider;
