import { Calendar, Clock, MapPin, User } from "lucide-react";
import Image from "next/image";
import React from "react";

function ServiceHistoryList({ serviceHistory }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
			{serviceHistory.map((service, index) => (
				<div key={index} className="flex gap-4 border rounded-lg p-4 mb-5">
					{service?.serviceList?.name && (
						<Image
							src={service?.serviceList?.images[0]?.url}
							alt="image"
							width={120}
							height={120}
							className="rounded-lg object-cover"
						/>
					)}
					<div className="flex flex-col gap-2">
                        <h2 className="font-bold">{service.serviceList?.name}</h2>
                        <h2 className="flex gap-2 text-primary"><User/>{service.serviceList?.conatctPerson}</h2>
                        <h2 className="flex gap-2 text-gray-500"><MapPin className="text-primary"/>{service.serviceList?.address}</h2>
						<h2 className="flex gap-2 text-gray-500"><Calendar className="text-primary"/>
						Service on : <span className="text-black">
							{service.date}
							</span></h2>
						<h2 className="flex gap-2 text-gray-500"><Clock className="text-primary"/>
						Service on : <span className="text-black">
							{service.time}
							</span></h2>
                    </div>
				</div>
			))}
		</div>
	);
}

export default ServiceHistoryList;
