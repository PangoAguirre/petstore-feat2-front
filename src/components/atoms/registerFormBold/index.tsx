import React from 'react'
import { SmallTextDefault, SubTextoMini } from '../heroTitle'

interface Indexprops {
    title?: string;
    textCenter?: string;
    text?: string;
}

const index = ({title = 'Title', textCenter = 'textCenter', text = 'Text'}: Indexprops) => {
  return (
    <div>
        <div className='font-bold'>
            <SmallTextDefault text={title}></SmallTextDefault>
        </div>
        <div className='flex justify-center items-center w-140 h-9 bg-gray-200 rounded-[6] font-[530]'>
            <SmallTextDefault text={textCenter}></SmallTextDefault>
        </div>
        <div className='opacity-75'>
            <SubTextoMini text={text}></SubTextoMini>
        </div>
    </div>
  )
}

export default index