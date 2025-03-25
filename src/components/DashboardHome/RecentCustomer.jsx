import { useGetAllCustomersQuery } from '../../Redux/customerApis'
import { Spin } from 'antd'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const RecentCustomer = () => {
  // Fetching customer data with pagination and search
  const {
    data: customerData,
    isLoading,
    isError,
  } = useGetAllCustomersQuery({
    page: 1,
    limit: 6,
  })

  // Handling loading and error states
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin tip="Loading customer data..." />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p>Failed to load customer data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent customers</h2>
      <ul className="space-y-4">
        {customerData?.data?.result?.map((customer, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-3 px-2 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100"
          >
            <div className="flex items-center space-x-3 w-full relative">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium">
                {customer.firstName?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {customer.firstName} {customer.lastName}
                </p>
              </div>
              <p className="text-gray-500 text-xs flex items-center absolute right-0">
                <FaMapMarkerAlt className="mr-1 text-xs" />{' '}
                {customer.city || 'Not provided'}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-right">
        <Link to={`/customers`} className="text-blue-600 hover:text-blue-800">
          View all →
        </Link>
      </div>
    </div>
  )
}

export default RecentCustomer

// import { FaMapMarkerAlt } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import { useGetAllCustomersQuery } from '../../Redux/customerApis'
// import { useState } from 'react'
// import { Spin } from 'antd'

// const RecentCustomer = () => {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [pageSize, setPageSize] = useState(6) // Default page size
//   const [searchText, setSearchText] = useState('')

//   // Fetching customer data with pagination and search
//   const {
//     data: customerData,
//     isLoading,
//     isError,
//   } = useGetAllCustomersQuery({
//     page: currentPage,
//     limit: pageSize,
//     searchTerm: searchText,
//   })

//   // Handling loading and error states
//   if (isLoading) {
//     return (
//       <div className="w-full flex justify-center items-center h-64">
//         <Spin tip="Loading customer data..." />
//       </div>
//     )
//   }

//   if (isError) {
//     return (
//       <div className="w-full flex justify-center items-center h-64">
//         <p>Failed to load customer data. Please try again later.</p>
//       </div>
//     )
//   }

//   const customers = [
//     { name: 'Natali Craig', location: 'Berlin' },
//     { name: 'Drew Cano', location: 'Berlin' },
//     { name: 'Andi Lane', location: 'Berlin' },
//     { name: 'Koray Okumus', location: 'Berlin' },
//     { name: 'Kate Morrison', location: 'Berlin' },
//     { name: 'Melody Macy', location: 'Berlin' },
//   ]

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Recent customers</h2>
//       <ul className="space-y-2">
//         {customers.map((customer, index) => (
//           <li
//             key={index}
//             className="flex items-center justify-between py-3 px-2 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100"
//           >
//             <div className="flex items-center space-x-3 w-full relative">
//               <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium">
//                 {customer.name.charAt(0)}
//               </div>
//               <div>
//                 <p className="font-semibold text-sm">{customer.name}</p>
//               </div>
//               <p className="text-gray-500 text-xs flex items-center absolute right-0">
//                 <FaMapMarkerAlt className="mr-1 text-xs" /> {customer.location}
//               </p>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="mt-4 text-right">
//         <Link to={`/customers`} className="text-blue-600 hover:text-blue-800">
//           View all →
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default RecentCustomer
