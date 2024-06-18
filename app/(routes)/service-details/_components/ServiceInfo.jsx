import { Button } from '@/components/ui/button'
import { Calendar, Mail, MapPin, Share, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function ServiceInfo({service}) {
  return service?.name&&(
    <div className='md:flex gap-4 items-center'>
        <Image
      src={service?.images[0]?.url} // Added ?. after service and images
      alt={service?.name} // Added ?. after service
      width={150}
      height={200}
      className="rounded-full h-[150px] object-cover"
    />
    <div className='flex justify-between items-center w-full'>
    <div className='flex flex-col md:mt-0 mt-4 items-baseline gap-3'>
      <h2 className='text-primary
       bg-purple-100 rounded-full p-1 px-3
        text-lg'>{service?.category?.name}</h2>
      <h2 className='text-[40px] font-bold'>
        {service?.name}
      </h2>
      <h2 className='flex gap-2 text-lg
      text-gray-500'><MapPin/>{service.address}</h2>
      <h2 className='flex gap-2 text-lg text-gray-500'>
        <Mail/>{service?.email}</h2>
      
    </div>
    <div className='flex flex-col gap-5 items-end'>
      <Button><Share /></Button>
      <h2 className='flex gap-2 text-xl text-primary'><User/>{service.conatctPerson}</h2>
      <h2 className='flex gap-2 text-xl text-gray-500'><Calendar/>{service.date}</h2>

    </div>
    </div>
    </div>
    
  )
}

export default ServiceInfo