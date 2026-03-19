import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Banner from '../components/home/Banner'
import Testimonial from '../components/home/Testimonial'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Testimonial />
      <Banner />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home