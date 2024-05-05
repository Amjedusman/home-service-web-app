"use client"
import CategoryList from "@/app/_components/CategoryList";
import Hero from "@/app/_components/Hero";
import React, { useEffect, useState } from "react";
import ServiceList from "./_component/ServiceList";
import GlobalApi from "@/app/_services/GlobalApi";

function services() {
	const [serviceList, setserviceList] = useState([]);

	useEffect(() => {
		 getAllServiceList();
	}, []);

	const getAllServiceList = () => {
		GlobalApi.getAllServiceList().then((resp) => {
			setserviceList(resp.serviceLists);
		});
	};

	return (
		<div>
			<Hero />
			<ServiceList serviceList={serviceList} title={"Services"} />
		</div>
	);
}

export default services;
