import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/swiper-bundle.css'; // Import Swiper styles

function Stack({stack}) {

    let p='./../../../../images/'
    stack.images.map((element)=>{console.log(element.img)})
  return (
    <div className='stack'>
       <div className='title'>
        <h1>I use many programming languages and techniques!</h1>

        </div>
        <div className='right'>
        <Swiper
      spaceBetween={50}
      slidesPerView={3}
      direction="horizontal"
      loop={true} // Enable looping
      modules={[Autoplay]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false // Allow manual interaction to prevent autoplay interruption
      }}      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
        {stack.images.map((element)=>{ return   <SwiperSlide><img src={p+element.img}></img></SwiperSlide>
        })}
        </Swiper>
        </div>
      
    </div>
  )
}

export default Stack