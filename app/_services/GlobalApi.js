const { gql, default: request } = require("graphql-request")

const MASTER_URL='https://api-ap-south-1.hygraph.com/v2/'+process.env.NEXT_PUBLIC_MASTER_URL_KEY+'/master'

const getCategory=async()=>{
    const query=gql`
    query Category {
      categories {
        id
        name
        bg {
          hex
        }
        icon {
          url
        }
      }
    }    
    `

    const result=await request(MASTER_URL,query)
    
    return result;
}
const getAllBusinessList=async()=>{
  const query=gql`
  query BusinessList {
    businessLists {
      about
      address
      category {
        name
      }
      contactPerson
      email
      images {
        url
      }
      id
      name
      reviews {
        star
      }
    }
  }
  `
  const result=await request(MASTER_URL,query)

      return result;
}

const getBusinessByCategory=async(category)=>{
  const query=gql`
  query MyQuery {
    businessLists(where: {category: {name: "`+category+`"}}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      name
      images {
        url
      }
    }
  }
  `
  const result=await request(MASTER_URL,query)
      
      return result;
}

const getBusinessById=async (id)=>{
  const query=gql`
  query GetBusinessById {
    businessList(where: {id: "`+id+`"}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      name
      images {
        url
      }
      reviews {
        star
        reviewText
        profileImage
        userName
        email
      }
    }
  }
  `

  const result=await request(MASTER_URL,query)
      
      return result;
}

const createNewBooking=async(businessId,date,time,userEmail,userName)=> {
  const mutationQuery=gql`
  mutation CreateBooking {
    createBooking(
      data: {bookingStatus: Booked,
         businessList: {connect: {id: "`+businessId+`"}},
          date: "`+date+`", time: "`+time+`",
           userEmail: "`+userEmail+`", userName: "`+userName+`"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  
  `
  const result=await request(MASTER_URL,mutationQuery)
      
      return result;
}

const BusinessBookedSlot=async(businessId,date)=>{
  const query=gql`
  query BusinessBookedSlot {
    bookings(where: {businessList: {id: "`+businessId+`"}, date: "`+date+`"}) {
      date
      time
    }
  }
  `
  const result=await request(MASTER_URL,query)
      
      return result;
}

const GetUserBookingHistory=async(userEmail)=>{
  const query=gql`
  query GetUserBookingHistory {
    bookings(where: {userEmail: "`+userEmail+`"}, orderBy: publishedAt_DESC) {
      businessList {
        name
        images {
          url
        }
        contactPerson
        address
      }
      date
      time
    }
  }
  
  `
  const result=await request(MASTER_URL,query)
      
      return result;
}

const createBusinessList = async (data, imageId) => {
  const query = gql`
  mutation CreateBusinessList {
    createBusinessList(
      data: {about: "${data.about}", address: "${data.address}", contactPerson: "${data.contactPerson}", category: {connect: {id: "${data.categoryId}"}}, email: "${data.email}", name: "${data.name}", images: {connect: {id: "${imageId}"}}}
    ){
      id,
      name
    }
    publishManyBusinessLists(to: PUBLISHED) {
      count
    }
  }
  
  `
  const result = await request(MASTER_URL, query)

  return result;
}
const createServiceList = async (data, imageId) => {
  const query = gql`
  mutation CreateServiceList {
    createServiceList(
      data: {address: "${data.address}", conatctPerson: "${data.contactName}", about: "${data.about}", email: "${data.email}", date: "${data.date}", name: "${data.serviceName}", phoneNo: "${data.phone}", images: {connect: {id: "${imageId}"}}, category: {connect: {id: "${data.categoryId}"}}}
    ) {
      id
    }
    publishManyServiceLists(to: PUBLISHED) {
      count
    }
  }
  
  `
  const result = await request(MASTER_URL, query)

  return result;
}
const createReview = async (data) => {
  const query = gql`
  mutation CreateServiceList {
    createReview(
      data: {email: "${data.email}", profileImage: "${data.profileImage}", reviewText: "${data.reviewText}", star: ${data.star}, userName: "${data.userName}", businessList: {connect: {id: "${data.businessId}"}}}
    ){
      id,
    }
    publishManyReviews(to: PUBLISHED) {
      count
    }
  }
  
  `
  const result = await request(MASTER_URL, query)

  return result;
}

const getAllServiceList=async()=>{
  const query=gql`
  query getServiceList {
  serviceLists {
    id
    name
    phoneNo
    email
    date
    about
    conatctPerson
    category {
      name
      icon {
        url
      }
    }
    images {
      url
    }
  }
}

  
  `
  const result=await request(MASTER_URL,query)
      
      return result;
}


const getServiceById=async (id)=>{
  const query=gql`
  query GetServiceById {
    serviceList(where: {id: "`+id+`"}) {
      about
      address
      date
      phoneNo
      category {
        name
      }
      conatctPerson
      email
      id
      name
      images {
        url
      }
    }
  }
  `

  const result=await request(MASTER_URL,query)
      
      return result;
}

const getServiceByCategory=async(category)=>{
  const query=gql`
  query MyQuery {
    serviceLists(where: {category: {name: "`+category+`"}}) {
      about
      address
      category {
        name
      }
      conatctPerson
      email
      id
      name
      images {
        url
      }
    }
  }
  `
  const result=await request(MASTER_URL,query)
      
      return result;
}
const createNewServiceBooking=async(serviceId,date,time,userEmail,userName)=> {
  // const mutationQuery=gql`
  // mutation CreateBooking {
  //   createBooking(
  //     data: {bookingStatus: Booked,
  //        seerviceList: {connect: {id: "`+serviceId+`"}},
  //         date: "`+date+`", time: "`+time+`",
  //          userEmail: "`+userEmail+`", userName: "`+userName+`"}
  //   ) {
  //     id
  //   }
  //   publishManyBookings(to: PUBLISHED) {
  //     count
  //   }
  // }
  
  // `
  const mutationQuery=gql`
  mutation CreateBooking {
    createServiceBooking(
      data: {bookingStatus: Booked,
         serviceList: {connect: {id: "`+serviceId+`"}},
          date: "`+date+`", time: "`+time+`",
           userEmail: "`+userEmail+`", userName: "`+userName+`"}
    ) {
      id
    }
    publishManyServiceBookings(to: PUBLISHED) {
      count
    }
  }
  
  ` 
  const result=await request(MASTER_URL,mutationQuery)
      
      return result;
}



const ServiceBookedSlot=async(serviceId,date)=>{
  const query=gql`
  query ServiceBookedSlot {
    serviceBookings(where: {serviceList: {id: "`+serviceId+`"}, date: "`+date+`"}) {
      date
      time
    }
  }
  `
  const result=await request(MASTER_URL,query)
      
      return result;
}

const GetUserServiceBookingHistory=async(userEmail)=>{
  const query=gql`
  query GetUserBookingHistory {
    serviceBookings(where: {userEmail: "`+userEmail+`"}, orderBy: publishedAt_DESC) {
      serviceList {
        name
        images {
          url
        }
        conatctPerson
        address
      }
      date
      time
    }
  }
  
  `
  const result=await request(MASTER_URL,query)
      
      return result;
}


const publishAsset = async (id) => {
  const query = gql`
  mutation {
    publishAsset(where: {id: "${id}"}, to: PUBLISHED) {
      id
    }
  }
  `
  const result = await request(MASTER_URL, query)

  return result;
}

const createAsset = async () => {
  const query = gql`
  mutation createAsset {
    createAsset(data: {}) {
      id
      url
      upload {
        status
        expiresAt
        error {
          code
          message
        }
        requestPostData {
          url
          date
          key
          signature
          algorithm
          policy
          credential
          securityToken
        }
      }
    }
  }
  
  `
  const result = await request(MASTER_URL, query)

  return result;
}



export default{
    getCategory,
    getAllBusinessList,
    getBusinessByCategory,
    getBusinessById,
    createNewBooking,
    BusinessBookedSlot,
    GetUserBookingHistory,
  getAllServiceList,
  getServiceById,
  ServiceBookedSlot,
  createNewServiceBooking,
  getServiceByCategory,
  GetUserServiceBookingHistory,
  createAsset,
  publishAsset,
  createBusinessList,
  createServiceList,
  createReview
}


