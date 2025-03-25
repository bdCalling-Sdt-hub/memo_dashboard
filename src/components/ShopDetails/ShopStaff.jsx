import { useState } from 'react'
import {
  useGetOneShopAllStaffQuery,
  useGetOneShopBusinessHourQuery,
} from '../../Redux/shopApis'
import { Spin, Table } from 'antd'
import { useParams } from 'react-router-dom'
import { url } from '../../Redux/server'

const ShopStaff = () => {
  const { id } = useParams() // Get the shop id from URL parameters
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)

  const {
    data: allStaffData,
    isLoading,
    isError,
  } = useGetOneShopAllStaffQuery({
    page: currentPage,
    limit: pageSize,
    shop: id,
  })

  const {
    data: shopBusinessHour,
    isLoadingShopBusinessHour,
    isErrorShopBusinessHour,
  } = useGetOneShopBusinessHourQuery({
    entityId: id,
    entityType: 'Shop',
  })


  if (isLoadingShopBusinessHour || isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin tip="Loading data..." />
      </div>
    )
  }

  if (isErrorShopBusinessHour || isError) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p>Failed to load data. Please try again later.</p>
      </div>
    )
  }

  const staffColumns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
    },
    {
      title: 'Staff Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Rating ★',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Profile Picture',
      key: 'image',
      render: (text, record) => (
        <img
          src={`${record.image}`}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      ),
    },
  ]

  // Map staff data to table rows
  const staff = allStaffData?.data?.result.map((staffMember, index) => ({
    key: staffMember._id,
    index: index + 1,
    name: staffMember.name,
    rating:
      staffMember.totalRating !== 0
        ? (staffMember.totalRating / staffMember.totalRatingCount).toFixed(1)
        : 'No Rating',
    image: staffMember.profile_image
      ? `${url}/${staffMember.profile_image}`
      : `https://cdn-icons-png.flaticon.com/512/149/149071.png`,
  }))

  // Mapping business hours data
  const timings = shopBusinessHour?.data?.map((timing) => ({
    days: timing.day,
    hours: `${timing.openTime} - ${timing.closeTime}`,
    isClosed: timing.isClosed,
  }))
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }
  return (
    <div>
      {/* Shop Staff Section */}
      <div>
        <Table
          columns={staffColumns}
          dataSource={staff}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: allStaffData?.data?.meta?.total,
            onChange: handlePaginationChange,
            position: ['bottomCenter'],
            defaultPageSize: 8,
          }}
          bordered
          rowClassName="text-sm"
        />
      </div>

      {/* Shop Timings Section */}
      <div>
        <h2 className="text-lg font-medium mb-4">Shop Timings</h2>
        <table className="w-full text-sm text-left border-t border-gray-300">
          <tbody>
            {timings?.map((timing, index) => {
              return (
                <tr key={index} className="border-b">
                  <td className="py-2 font-medium text-gray-700">
                    {timing.days}
                  </td>
                  <td className="py-2 text-gray-600 text-right">
                    {timing.isClosed ? 'Closed' : timing.hours}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShopStaff
// import { useState } from 'react'
// import {
//   useGetOneShopAllStaffQuery,
//   useGetOneShopBusinessHourQuery,
// } from '../../Redux/shopApis'
// import { Spin } from 'antd'
// import { useParams } from 'react-router-dom'
// import { url } from '../../Redux/server'

// const ShopStaff = () => {
//   const { id } = useParams() // Get the shop id from URL parameters
//   const [currentPage, setCurrentPage] = useState(1)
//   const [pageSize, setPageSize] = useState(10)

//   const {
//     data: allStaffData,
//     isLoading,
//     isError,
//   } = useGetOneShopAllStaffQuery({
//     page: currentPage,
//     limit: pageSize,
//     shop: id,
//   })

//   const {
//     data: shopBusinessHour,
//     isLoadingShopBusinessHour,
//     isErrorShopBusinessHour,
//   } = useGetOneShopBusinessHourQuery({
//     entityId: id,
//     entityType: 'Shop',
//   })

//   console.log(shopBusinessHour)

//   if (isLoadingShopBusinessHour || isLoading) {
//     return (
//       <div className="w-full flex justify-center items-center h-64">
//         <Spin tip="Loading data..." />
//       </div>
//     )
//   }

//   if (isErrorShopBusinessHour || isError) {
//     return (
//       <div className="w-full flex justify-center items-center h-64">
//         <p>Failed to load data. Please try again later.</p>
//       </div>
//     )
//   }

//   // Map staff data to table rows
//   const staff = allStaffData?.data?.result.map((staffMember, index) => ({
//     key: staffMember._id,
//     index: index + 1,
//     name: staffMember.name,
//     rating:
//       staffMember.totalRating !== 0
//         ? (staffMember.totalRating / staffMember.totalRatingCount).toFixed(1)
//         : 'No Rating',
//     image: staffMember.profile_image
//       ? `${url}/${staffMember.profile_image}`
//       : `https://cdn-icons-png.flaticon.com/512/149/149071.png`,
//   }))

//   // Mapping business hours data
//   const timings = shopBusinessHour?.data?.map((timing) => ({
//     days: timing.day,
//     hours: `${timing.openTime} - ${timing.closeTime}`,
//     isClosed: timing.isClosed,
//   }))

//   return (
//     <div className="w-full px-6 py-8 space-y-8">
//       {/* Shop Staff Section */}
//       <div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {staff?.map((member, index) => (
//             <div
//               key={index}
//               className="flex items-center space-x-4 p-4 border rounded-md shadow-sm bg-white"
//             >
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-16 h-16 object-cover rounded-md"
//               />
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-700">
//                   {member.name}
//                 </h3>
//                 <p className="flex items-center space-x-1 bg-teal-600 text-sm text-white w-fit px-2 rounded-md">
//                   <span>{member.rating} ★</span>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Shop Timings Section */}
//       <div>
//         <h2 className="text-lg font-medium mb-4">Shop Timings</h2>
//         <table className="w-full text-sm text-left border-t border-gray-300">
//           <tbody>
//             {timings?.map((timing, index) => {
//               return (
//                 <tr key={index} className="border-b">
//                   <td className="py-2 font-medium text-gray-700">
//                     {timing.days}
//                   </td>
//                   <td className="py-2 text-gray-600 text-right">
//                     {timing.isClosed ? 'Closed' : timing.hours}
//                   </td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default ShopStaff
