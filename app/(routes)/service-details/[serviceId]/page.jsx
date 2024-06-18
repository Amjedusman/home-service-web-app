"use client"
import GlobalApi from '@/app/_services/GlobalApi';
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import ServiceInfo from "../_components/ServiceInfo";

import SuggestedServiceList from '../_components/SuggestedServiceList';
import ServiceDescription from '../_components/ServiceDescription';

function ServiceDetail({ params }) {
  const { data, status } = useSession();
  const [service, setService] = useState([]);

  useEffect(() => {
    params && getServiceById(params.serviceId);
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const getServiceById = () => {
    GlobalApi.getServiceById(params.serviceId).then((resp) => {
      console.log(resp);
      setService(resp.serviceList);
    });
  };

  const checkUserAuth = () => {
    if (status == "loading") {
      return <p>loading.......</p>;
    }
    if (status == "unauthenticated") {
      signIn("descope");
    }
  };

  console.log(service);

  return (
    status == "authenticated" &&
    service && (
      <div className="py-8 md:py-20 md:px-36 px-10">
        <ServiceInfo service={service} />
        <div className="grid grid-cols-3 mt-16">
          <div className="col-span-3 md:col-span-2 order-last md:order-first">
            <ServiceDescription service={service} />
          </div>
          <div className="">
            <SuggestedServiceList service={service} />
          </div>
        </div>
      </div>
    )
  );
}

export default ServiceDetail