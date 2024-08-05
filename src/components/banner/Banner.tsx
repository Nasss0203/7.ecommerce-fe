import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const banner = [
	{
		image: "https://lh3.googleusercontent.com/ppb9f6i0VvBnQtMJiKkgBTSdKqwcAksvwBeCBGdoXN1bGntCcvldCrRfqKccyKG4YHc6uui9R9WGFWYc1Pg8qVe9-FctxMvn=rw-w1920",
	},
	{
		image: "https://lh3.googleusercontent.com/Fok2LReZV-yl7N68WsYqOqYe3Fl5jf8JRLTzTR2P-GwJJ7PnWa_erB-l9HQxVRH3PhsOpt3XbbliWId71f3tSNPYoTDwSwm4=w1920-rw",
	},
	{
		image: "https://lh3.googleusercontent.com/ourQbUh5x_qOtLqkqURngvERqVSP9BdSf84gDkdvomg11oZ0QZKBh_uwPeBEOwRkwzxoB9CcH-AwLoN6HZammrdXii52xXxFow=w1920-rw",
	},
	{
		image: "https://lh3.googleusercontent.com/mq0g4swS2LXcX5Gv-li7EN-wh-jL4FbvZ8kINXskgaH50pgs4ZUzEv3HyYUY4WJKGVMsg12mRZlR-ojA0JTv0yejLeOkFBJo=w1920-rw",
	},
	{
		image: "https://lh3.googleusercontent.com/OGZOKYCbdYSmpbeBPcr_DMpWjA31STZoCumjPk8m4fIpW0bSrIFixwyQa11gkGEmOWjkp3vS-WoT3f9RAQE5IuRyIi7NHN7s=w1920-rw",
	},
];

const Banner = () => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	console.log("thumbsSwiper~", thumbsSwiper);
	return (
		<div className='lg:flex flex-col gap-2.5 w-[80%] h-full  hidden'>
			<div className='w-full '>
				<Swiper
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					loop={true}
					spaceBetween={10}
					navigation={true}
					thumbs={{ swiper: thumbsSwiper }}
					modules={[FreeMode, Navigation, Thumbs, Autoplay]}
					className='mySwiper2'
				>
					{banner.map((item, index) => (
						<SwiperSlide key={index}>
							<div className='rounded-md shadow-md h-[350px]'>
								<img
									srcSet={item.image}
									alt=''
									className='flex-shrink-0 object-cover w-full h-full rounded-md'
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className='w-full '>
				<Swiper
					onSwiper={setThumbsSwiper}
					loop={true}
					spaceBetween={10}
					slidesPerView={3}
					freeMode={true}
					watchSlidesProgress={true}
					modules={[FreeMode, Navigation, Thumbs]}
					className='mySwiper'
				>
					{banner.map((item, index) => (
						<SwiperSlide key={index}>
							<div className={`h-[75px] w-full `}>
								<img
									src={item.image}
									className='flex-shrink-0 object-cover w-full h-full rounded-md'
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default Banner;
