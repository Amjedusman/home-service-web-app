import GlobalApi from '@/app/_services/GlobalApi';
import { Button } from '@/components/ui/button'
import { NotebookPenIcon } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import BookingSection from './BookingSection';


function SuggestedServiceList({service}) {

  const [serviceList,setServiceList]=useState([]);
    useEffect(()=>{
      service&&getServiceList()
    },[service]);

    const getServiceList=()=>{
        GlobalApi.getServiceByCategory(service?.category?.name)
        .then(resp=>{
            setServiceList(resp?.serviceLists);
        })
    }


  return (
    <div className="md:pl-10">
      <BookingSection service={service}>
        <Button className="flex gap-2 w-full">
          <NotebookPenIcon />
          Book Appointment
        </Button>
      </BookingSection>
      <div className="hidden md:block">
        <h2
          className="font-bold text-lg mt-3 mb-3
        "
        >
          Similar Service
        </h2>
        <div className="">
          {serviceList &&
            serviceList.map((service, index) => (
              <Link
                key={service.id}
                href={"/details/" + service.id}
                className="flex gap-2 mb-4 hover:border border-primary
            rounded-lg p-2 cursor-pointer hover:shadow-md"
              >
                <Image
                  src={service?.images[0]?.url}
                  alt={service?.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-bold">{service?.name}</h2>
                  <h2 className="text-primary">{service?.conatctPerson}</h2>
                  <h2 className="text-gray-500">{service?.address}</h2>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestedServiceList