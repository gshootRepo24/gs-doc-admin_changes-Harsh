import React from 'react'
import { useTranslation } from 'react-i18next'
import SidenavLeft from './SidenavLeft'
import SidenavRight from './SidenavRight'

const Home = () => {
  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  return (
     isArabic ? <SidenavRight /> : <SidenavLeft /> 
  )
}

export default Home
