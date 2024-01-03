import React, { useState, useEffect } from 'react';
import slide1 from "../slide1.jpg";
import slide2 from "../slide2.jpg";
import slide3 from "../slide3.jpg";
import slide4 from "../slide4.jpg";
const Slideshow = () => {
  const images = [
    slide1,
    slide2,
    slide3,
    slide4
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, []);

  return (
    <div className="slideshow">
      <img onClick={()=>setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}
       style={{width:"100%",height:"100%",borderRadius:"20px",
       padding:"50px",display:"block",marginRight:"auto",marginLeft:"auto"}}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
      />
    </div>
  );
};

export default Slideshow;
