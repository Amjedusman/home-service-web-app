import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
  } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button';
import GlobalApi from '@/app/_services/GlobalApi';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import moment from 'moment';

  

function BookingSection({children,service}) {

    const date = new Date(service.date);
    const [timeSlot,setTimeSlot]=useState([]);
    const [selectedTime,setSelectedTime]=useState();
    const [bookedSlot,setBookedSlot]=useState([]);

    const {data}=useSession();

    useEffect(()=>{
        getTime();
    },[])

    useEffect(()=>{
        date&&serviceBookedSlot();
    },[date])


    // Get Selected Date service Booked Slot
    const serviceBookedSlot=()=>{
        GlobalApi.ServiceBookedSlot(service.id,moment(date).format('DD-MMM-YYYY')).then(resp=>{
            console.log(resp);
            setBookedSlot(resp.serviceBookings)
        })
    }

    const getTime = () => {
        const timeList = [];
        for (let i = 10; i <= 12; i++) {
            timeList.push({
                time: i + ':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }
        for (let i = 1; i <= 6; i++) {
            timeList.push({
                time: i + ':00 PM'
            })
            timeList.push({
                time: i + ':30 PM'
            })
        }
  
        setTimeSlot(timeList)
      }

      const SaveBooking=()=>{
        GlobalApi.createNewServiceBooking(service.id,
            moment(date).format('DD-MMM-YYYY'),selectedTime,data.user.email,data.user.name).then(async(resp)=>{
                console.log(resp);
                if(resp){
                    //Toast Msg
                    setSelectedTime('');
                    toast('Service Booked Successfully!')

                    //Send Mail
                    mailer(data.user.email, 'Service Booked', `You have successfully booked the service ${service.name} on ${moment(date).format('DD-MMM-YYYY')} at ${selectedTime} .<br> Thank you for using Connecto!`)
                    mailer(service.email, 'Service Booked', `You have a new booking for the service ${service.name} on ${moment(date).format('DD-MMM-YYYY')} at ${selectedTime} by ${data.user.email}( ${data.user.name} ).<br> Please check your dashboard for more details.<br> Thank you for using Connecto!`)
                }
            },(e)=>{
                //Error Toast Msg
                toast('Error While Booking Service :(');
            })
      }

      const isSlotBooked=(time)=>{
        return bookedSlot.find(item=>item.time==time)
      }

  return (
    <div>
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="overflow-auto">
                <SheetHeader>
                <SheetTitle>Book a Timeslot</SheetTitle>
                <SheetDescription>
                    Select a time slot on the date {service.date}
                    {/* Date picker */}
                    <div className='flex flex-col gap-5 items-baseline'>
                        <h2 className='mt-5 font-bold'>Select Date</h2>
                        <Calendar
                            mode="single"
                            selected={date}
                            className="rounded-md border"
                        />
                    </div>
                    {/* time slot picker */}
                    <h2 className='my-5 font-bold'>Select Time Slot</h2>
                    <div className='grid grid-cols-3 gap-3'>
                        {timeSlot.map((item,index)=>(
                            <Button key={index}
                            disabled={isSlotBooked(item.time)} variant='outline'
                            className={`border rounded-full px-3 p-2 hover:bg-primary
                            hover:text-white ${selectedTime==item.time&&'bg-primary text-white'}`} onClick={()=>setSelectedTime(item.time)}>
                                {item.time}
                            </Button>
                        ))}
                    </div>
                </SheetDescription>
                </SheetHeader>
                <SheetFooter className="mt-5">
              <SheetClose asChild>
                <div className='flex gap-5'>
                    <Button variant="destructive" className="">Cancel</Button>
                    <Button disabled={!(selectedTime&&date)} 
                    onClick={()=>SaveBooking()}>Book</Button>
                </div>
              </SheetClose>
            </SheetFooter>
            </SheetContent>
        </Sheet>

    </div>
  )
}



const mailer = async (email, subject, message) => {

    try {

        const response = await fetch('/api/mailer', {
            method: 'post',
            body: JSON.stringify({
                email: email,
                subject: subject,
                message: message,
            }),
        });

        if (!response.ok) {
            console.log("falling over")
            throw new Error(`response status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log(responseData['message'])

        alert('Message successfully sent');
    } catch (err) {
        console.error(err);
        alert("Error, please try resubmitting the form");
    }
}


export default BookingSection