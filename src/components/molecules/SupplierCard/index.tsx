import ButtomYe from '@/components/atoms/buttomYe'
import { BigText, MediumTitle, SmallTextDefault } from '@/components/atoms/heroTitle'
import HomeIcon from '@/components/icons/homeIcon'
import React from 'react'

interface Indexprops{
    supplier?: string;
    category?: string;
    days?: string;
    buttomText?: string;
}

const index = ({supplier = "Supplier", category = "Category", days = "Days", buttomText = "ButtomText"}: Indexprops) => {
  return (
    <div className="flex flex-col items-center">
            <div className="flex justify-center items-center rounded-full h-25 w-25 bg-gray-200">
              <HomeIcon width={75} height={75} />
            </div>
            <div className="flex flex-col justify-center items-center">
              <BigText text={supplier} />
              <SmallTextDefault text={category} />
              <MediumTitle text={days} />
              <ButtomYe text={buttomText} />
            </div> 
          </div>
  )
}

export default index