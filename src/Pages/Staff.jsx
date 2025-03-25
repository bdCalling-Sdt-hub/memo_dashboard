import { Table, Input, Select, Button, Spin } from 'antd'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useGetAllStaffQuery } from '../Redux/staffApis'
import { useState } from 'react'
import { url } from '../Redux/server'

const Staff = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(9) // Default page size
  const [searchText, setSearchText] = useState('')
  const [status, setStatus] = useState('')

  const {
    data: staffData,
    isLoading,
    isError,
  } = useGetAllStaffQuery({
    page: currentPage,
    limit: pageSize,
    searchTerm: searchText,
    sort: status == 'topSelling' ? 'topSelling' : '',
  })

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
    {
      title: 'Staff Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img
            src={record.image}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: 'Shop',
      dataIndex: 'shop',
      key: 'shop',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
      key: 'sales',
      render: (sales) => <span>€{sales}</span>,
    },
  ]

  const data = staffData?.data?.result.map((staff) => ({
    key: staff._id,
    index: staffData.data.result.indexOf(staff) + 1,
    name: staff.name,
    shop: staff.shop.shopName || 'Not provided',
    contact: staff.phoneNumber || 'Not provided',
    sales: staff.totalSales || 0,
    image: staff.profile_image
      ? `${url}/${staff.profile_image}`
      : `https://cdn-icons-png.flaticon.com/512/149/149071.png`,
  }))

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
    <div className="w-full py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div
          className="flex items-center space-x-2"
          onClick={() => navigate(-1)}
        >
          <Button
            icon={<FaArrowLeft />}
            className="bg-transparent text-gray-700 hover:bg-gray-100 py-1 border rounded-md"
          />
          <h1 className="text-xl font-semibold">
            Staff ({staffData?.data?.meta?.total})
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            defaultValue="All staff"
            options={[
              { value: 'allStaff', label: 'All staff' },
              { value: 'topSelling', label: 'Top selling' },
            ]}
            className="w-40"
            onChange={(value) => setStatus(value)}
          />
          {currentPage === 1 && (
            <Input
              prefix={<AiOutlineSearch className="text-gray-400" />}
              placeholder="Search"
              className="w-60"
              onChange={(e) => setSearchText(e.target.value)}
            />
          )}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: staffData?.data?.meta?.total,
          onChange: (page) => setCurrentPage(page),
          position: ['bottomCenter'],
          defaultPageSize: 9,
          showSizeChanger: false,
          nextIcon: (
            <Button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md border">
              Next <FaArrowRight />
            </Button>
          ),
          prevIcon: (
            <Button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md border">
              <FaArrowLeft /> Previous
            </Button>
          ),
        }}
        bordered
        rowClassName="text-sm"
      />
    </div>
  )
}

export default Staff
// import { Table, Input, Select, Button, Spin } from 'antd'
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
// import { AiOutlineSearch } from 'react-icons/ai'
// import { useNavigate } from 'react-router-dom'
// import { useGetAllStaffQuery } from '../Redux/staffApis'
// import { useState } from 'react'
// import { url } from '../Redux/server'

// const Staff = () => {
//   const navigate = useNavigate()
//   const { data: staffData, isLoading, isError } = useGetAllStaffQuery()
//   const [searchText, setSearchText] = useState('')
//   const [status, setStatus] = useState('allStaff')

//   const columns = [
//     {
//       title: '#',
//       dataIndex: 'index',
//       key: 'index',
//       align: 'center',
//       render: (text) => <span className="text-gray-500">{text}</span>,
//     },
//     {
//       title: 'Staff Name',
//       dataIndex: 'name',
//       key: 'name',
//       render: (text, record) => (
//         <div className="flex items-center space-x-3">
//           <img
//             src={record.image}
//             alt="avatar"
//             className="w-8 h-8 rounded-full"
//           />
//           <span className="font-medium">{text}</span>
//         </div>
//       ),
//     },
//     {
//       title: 'Shop',
//       dataIndex: 'shop',
//       key: 'shop',
//     },
//     {
//       title: 'Contact',
//       dataIndex: 'contact',
//       key: 'contact',
//     },
//     {
//       title: 'Sales',
//       dataIndex: 'sales',
//       key: 'sales',
//       render: (sales) => <span>€{sales}</span>,
//     },
//   ]

//   const data = staffData?.data?.result
//     .filter((staff) => {
//       if (status === 'topSells') {
//         return staff.sort((a, b) => b.totalSales - a.totalSales)
//       }
//       return true // For 'allStaff' status, return all staffs
//     })
//     .filter((staff) => {
//       // Filter by search query (search by first or last name)
//       const name = staff.name.toLowerCase()
//       const search = searchText.toLowerCase()
//       return name.includes(search)
//     })
//     .map((staff, index) => ({
//       key: staff._id,
//       index: index + 1,
//       name: staff.name,
//       shop: staff.shop.shopName || 'Not provided',
//       contact: staff.phoneNumber || 'Not provided',
//       sales: staff.totalSales || 0,
//       image: staff.profile_image
//         ? `${url}/${staff.profile_image}`
//         : `https://cdn-icons-png.flaticon.com/512/149/149071.png`,
//     }))

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

//   return (
//     <div className="w-full py-8 px-4">
//       <div className="flex justify-between items-center mb-6">
//         <div
//           className="flex items-center space-x-2"
//           onClick={() => navigate(-1)}
//         >
//           <Button
//             icon={<FaArrowLeft />}
//             className="bg-transparent text-gray-700 hover:bg-gray-100 py-1 border rounded-md"
//           />
//           <h1 className="text-xl font-semibold">
//             Staff ({staffData?.data?.meta?.total})
//           </h1>
//         </div>
//         <div className="flex items-center space-x-4">
//           <Select
//             defaultValue="All staff"
//             options={[
//               { value: 'allStaff', label: 'All staff' },
//               { value: 'topSells', label: 'Top selling' },
//             ]}
//             className="w-40"
//           />
//           <Input
//             prefix={<AiOutlineSearch className="text-gray-400" />}
//             placeholder="Search"
//             className="w-60"
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//         </div>
//       </div>
//       <Table
//         columns={columns}
//         dataSource={data}
//         pagination={{
//           position: ['bottomCenter'],
//           defaultPageSize: 8,
//           showSizeChanger: false,
//           nextIcon: (
//             <Button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md border">
//               Next <FaArrowRight />
//             </Button>
//           ),
//           prevIcon: (
//             <Button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md border">
//               <FaArrowLeft /> Previous
//             </Button>
//           ),
//         }}
//         bordered
//         rowClassName="text-sm"
//       />
//     </div>
//   )
// }

// export default Staff
