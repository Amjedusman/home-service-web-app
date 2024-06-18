"use client"
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceBookingHistoryList from "./_component/ServiceBookingHistoryList";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";

function MyServiceBooking() {

    const {data}=useSession();
    const [serviceHistory,setServiceBookingHistory]=useState([]);
    useEffect(()=>{
        data&&GetUserServiceBookingHistory();
    },[data])
    // used to get service history
    const GetUserServiceBookingHistory=()=>{
        GlobalApi.GetUserServiceBookingHistory(data.user.email).then(resp=>{
            console.log(resp);
            setServiceBookingHistory(resp.serviceBookings);
        })
    }

	const filterData=(type)=>{
		const result=serviceHistory.filter(item=>
			type=='booked'?
			new Date(item.date)>+new Date()
			:new Date(item.date)<new Date());
		return result;
	}

	return (
		<div className="my-10 mx-5 md:mx-36">
            <h2 className="font-bold text-[20px] my-2">My ServiceBookings</h2>
			<Tabs defaultValue="booked" className="w-full">
				<TabsList className='w-full justify-start'>
					<TabsTrigger value="booked">Booked</TabsTrigger>
					<TabsTrigger value="completed">Completed</TabsTrigger>
				</TabsList>
				<TabsContent value="booked">
					<ServiceBookingHistoryList serviceHistory={filterData('booked')}/>
				</TabsContent>
				<TabsContent value="completed">
				<ServiceBookingHistoryList serviceHistory={filterData('completed')}/>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default MyServiceBooking;
