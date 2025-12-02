import { useEffect, useRef, useState } from 'react';
import data from './data.json';
const DATA_LENGTH = data.length;

export const ImageCarousel = () => {
  const [index, setIndex] = useState(0);
  const imageRef = useRef(null);

  const handleNext = () => {
    setIndex((prevIndex) => {
      if (prevIndex === DATA_LENGTH - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const handlePrev = () => {
    setIndex((prevIndex) => {
      if (prevIndex === 0) {
        return DATA_LENGTH - 1;
      }
      return prevIndex - 1;
    });
  };

  useEffect(() => {
    imageRef.current = setInterval(handleNext, 1000);

    return () => {
      clearInterval(imageRef.current);
    };
  }, []);

  console.log(index);

  return (
    <div
      onMouseEnter={() => clearInterval(imageRef.current)}
      onMouseLeave={() => (imageRef.current = setInterval(handleNext, 1000))}
      className='container'
    >
      <div onClick={handlePrev} className='left-btn'>
        &lt;
      </div>
      <img src={data[index].download_url} alt='' />
      <div onClick={handleNext} className='right-btn'>
        &gt;
      </div>
    </div>
  );
};
