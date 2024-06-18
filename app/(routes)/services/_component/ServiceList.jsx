'use client'

import { Button } from "@/components/ui/button";
import { Calendar, Contact, Mail, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

function ServiceList({ serviceList, title }) {
	console.log(serviceList);
	return (
		<div>
			<div className="font-bold text-[22px]">{title}</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 ">
				{serviceList.map((service, index) => (
					<div
						className="shadow-md rounded-lg hover:shadow-lg cursor-pointer
                        hover:shadow-primary hover:scale-105 transition-all ease-in-out"
					>
						<div className="flex items-center justify-center">
                            <Image
                                src={service.images[0]?.url}
                                alt={service.name}
                                width={500}
                                height={200}
                                className="h-[150px] md:h-[200px] 
                object-cover rounded-lg"
                            />
                        </div>
						<div className="flex flex-col items-baseline p-3">
							<h2
								className="p-1 bg-purple-200
                                    text-primary rounded-full px-2
                                    text-[12px]"
							>
								{service.category.name}
							</h2>
							<h2 className="font-bold text-lg">{service.name}</h2>
							<h2 className="text-primary flex gap-3"><Contact/>{service.conatctPerson}</h2>
							<h2 className="text-gray-500 text-sm flex gap-3"><Phone/>{service.phoneNo}</h2>
							<h2 className="text-gray-500 text-sm flex gap-3"><Mail/>{service.email}</h2>
							<h2 className="text-gray-500 text-sm flex gap-3"><Calendar/>{service.date}</h2>
							<Button className="rounded-lg mt-3">Book Now</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ServiceList;
