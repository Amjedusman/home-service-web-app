"use client"
import GlobalApi from '@/app/_services/GlobalApi';
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import BusinessInfo from "../_components/BusinessInfo";

import SuggestedBusinessList from '../_components/SuggestedBusinessList';
import BusinessDescription from '../_components/BusinessDescription';
import ReviewSection from "../_components/ReviewSection";

function BusinessDetail({ params }) {
  const { data, status } = useSession();
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    params && getBusinessById();
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const getBusinessById = () => {
    GlobalApi.getBusinessById(params.businessId).then((resp) => {
      setBusiness(resp.businessList);
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

  console.log(business);

  return (
    status == "authenticated" &&
    business && (
      <div className="py-8 md:py-20 md:px-36 px-10">
        <BusinessInfo business={business} />
        <div className="grid grid-cols-3 mt-16">
          <div className="col-span-3 md:col-span-2 order-last md:order-first">
            <BusinessDescription business={business} />
            <ReviewSection
              businessId={business?.id}
              reviews={business?.reviews ?? []}
              user={data.user}
              getBusinessById={getBusinessById}
            />
          </div>
          <div className="">
            <SuggestedBusinessList business={business} />
          </div>
        </div>
      </div>
    )
  );
}

export default BusinessDetail