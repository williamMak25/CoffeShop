import React from 'react'
import {SiCoffeescript} from 'react-icons/si'
import {FiPhoneCall} from 'react-icons/fi'
import {BsShop} from 'react-icons/bs'
import { TiArrowBack } from 'react-icons/ti'
import { NavLink } from 'react-router-dom'

export const Aboutus = () => {
  return (
    <>
    <NavLink to='/' className='absolute left-5 top-2'><TiArrowBack className='text-white text-5xl'/></NavLink>
      <div className='flex flex-col items-center p-4 h-screen text-white bg-zinc-800 max-sm:h-full max-sm:text-sm'>
        
        <div className='text-center my-2 mx-2 p-5'>
            <p className='text-4xl mb-3 drop-shadow-lg'>Our Service<SiCoffeescript className='inline mx-2'/></p>
            <p className='text-center text-lg max-sm:text-sm '>Welcome to our Brew Box coffee shop, where the aroma of freshly roasted beans fills the air and the sound of steaming milk is music to your ears. Our mission is to provide our customers with a warm and inviting atmosphere where they can relax, socialize, and enjoy some of the finest coffee beverages around.
            We source our coffee beans from the best growers around the world, and our skilled baristas expertly craft each cup to perfection. Whether you prefer a rich and bold espresso, a smooth and creamy latte, or a refreshing iced coffee, we have something to satisfy your taste buds.
            But our coffee isn't the only thing that sets us apart. We also offer a variety of delicious baked goods, including muffins, pastries, and cookies, all made fresh daily. And if you're looking for something more substantial, we have a selection of sandwiches and wraps that are sure to satisfy.
            Our coffee shop is the perfect place to catch up with friends, study for exams, or simply unwind after a long day. We have plenty of comfortable seating, free Wi-Fi, and a relaxing atmosphere that will make you feel right at home.
            So come on in and experience the best coffee shop in town. We can't wait to serve you!. And we added online system in this month you can order from online and get free delivery.
            </p>
        </div>

        <div className='text-center my-3 '>
            <p className='text-4xl mb-2 drop-shadow-lg'>You Can Contact Us</p>
            <p><FiPhoneCall className='inline mx-2 drop-shadow-lg'/>+95 944250 3864</p>
            <p><FiPhoneCall className='inline mx-2 drop-shadow-lg'/>+95 994203 2302</p>
        </div>

        <div className='text-center my-3 p-5'>
            <p className='text-4xl mb-2 drop-shadow-lg'>Address</p>
            <p><BsShop className='inline mx-1 '/>No.21,Seetan Street,Kyout Maung/Yangon.Near Thida Lan Bus Stop.</p>
        </div>

      </div>
      </>)}
