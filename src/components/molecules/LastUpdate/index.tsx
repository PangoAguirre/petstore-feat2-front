import React from 'react'
import CardUpdate from "@/components/atoms/CardUpdate"
import { MediumTitle, SmallTextDefault } from '@/components/atoms/heroTitle'
import ButtomYe from "@/components/atoms/buttomYe"
const index = () => {
  return (
    <div className='flex flex-col w-[1200] h-130'>
      <div className='flex flex-col justify-center items-end'>
        <div className='flex flex-col justify-start items-center gap-5 mt-5 mr-92'>
          <MediumTitle text='Últimas Actualizaciones'></MediumTitle>
          <SmallTextDefault text='Mantente al día con nuestras novedades.'></SmallTextDefault>
          <ButtomYe text='Leer Más'></ButtomYe>
        </div>
        <div className='flex flex-row justify-start mt-20 gap-20 mr-5'> 
            <CardUpdate title='Nuevo Programa de Capacitación' text='Únete a nuestro nuevo programa de capacitación para proveedores.' tag1='Capacitación' tag2='Servicios' rol='Admin'></CardUpdate>
            <CardUpdate title='Promociones de Temporada' text='No te pierdas nuestras nuevas promociones especiales para usuarios.' tag1='Promoción' tag2='Novedad' rol='Marketing'></CardUpdate>
        </div>
        </div>
    </div>
  )
}

export default index