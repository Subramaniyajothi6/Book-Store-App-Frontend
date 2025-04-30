import React from 'react'
import Banner from './Banner'
import Recommended from './Recommended'
import News from './News'
import TopSeller from './TopSeller'

const Home = () => {
  return (
   <>
   <Banner/>
   <TopSeller/>
   <Recommended/>
   <News/>
   </>
  )
}

export default Home