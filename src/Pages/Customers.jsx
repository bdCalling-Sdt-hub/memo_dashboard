import { Table, Input, Select, Button, Switch, message, Spin } from 'antd'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import {
  useGetAllCustomersQuery,
  useBlockUnblockCustomerMutation,
} from '../Redux/customerApis'
import { useState } from 'react'
import { url } from '../Redux/server'

const Customers = () => {
  const navigate = useNavigate()

  // States to manage pagination, search, and filter
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(9) // Default page size
  const [searchText, setSearchText] = useState('')
  const [status, setStatus] = useState('all')

  // Fetching customer data with pagination and search
  const {
    data: customerData,
    isLoading,
    isError,
  } = useGetAllCustomersQuery({
    page: currentPage,
    limit: pageSize,
    searchTerm: searchText,
  })

  const [blockUnblockCustomer] = useBlockUnblockCustomerMutation()

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

  // Map data to the format required by Table component
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img src={record.image} alt={text} className="w-8 h-8 rounded-full" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Block / Unblock',
      key: 'block',
      render: (_, record) => (
        <Switch
          checked={record.status === 'in-progress'}
          onChange={(checked) => handleBlockUnblock(record, checked)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
  ]

  // Filter and map the customer data to Table format
  const data = customerData?.data?.result
    ?.filter((customer) => {
      if (status === 'active') {
        return customer.user.status === 'in-progress' // Assuming active users have status 'in-progress'
      } else if (status === 'inactive') {
        return customer.user.status === 'blocked' // Assuming inactive users have status 'blocked'
      }
      return true // For 'all' status, return all customers
    })
    .map((customer, index) => ({
      key: customer._id,
      user: customer?.user._id,
      index: index + 1,
      customerName: `${customer.firstName} ${customer.lastName}`,
      city: customer.city || 'Not provided',
      gender: customer.gender || 'Not specified',
      contact: customer.phoneNumber || 'Not provided',
      status: customer.user.status,
      image: customer.profile_image
        ? `${url}/${customer.profile_image}`
        : `https://cdn-icons-png.flaticon.com/512/149/149071.png`,
    }))

  // Handle Block/Unblock action
  const handleBlockUnblock = async (customer, checked) => {
    const updatedStatus = checked ? 'in-progress' : 'blocked'
    try {
      await blockUnblockCustomer({
        id: customer?.user,
        status: updatedStatus,
      }).unwrap()
      message.success(`Customer ${updatedStatus} successfully!`)
    } catch (error) {
      message.error('Failed to update customer status. Please try again.')
    }
  }

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between mb-6">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <Button
            icon={<FaArrowLeft />}
            className="flex items-center justify-center bg-transparent text-gray-700 hover:bg-gray-100 py-1 border rounded-md"
          />
          <h1 className="text-xl font-semibold">
            Customers ({customerData?.data?.meta?.total})
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            defaultValue="All customers"
            options={[
              { value: 'all', label: 'All customers' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            className="w-40"
            onChange={(value) => setStatus(value)}
          />
          {currentPage === 1 && (
            <Input
              prefix={<AiOutlineSearch className="text-gray-400" />}
              placeholder="Search"
              className="w-60"
              value={searchText}
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
          total: customerData?.data?.meta?.total,
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

export default Customers

// import { Table, Input, Select, Button, Switch, message, Spin } from 'antd'
// import { FaArrowLeft } from 'react-icons/fa'
// import { AiOutlineSearch } from 'react-icons/ai'
// import { useNavigate } from 'react-router-dom'
// import {
//   useGetAllCustomersQuery,
//   useBlockUnblockCustomerMutation,
// } from '../Redux/customerApis'
// import { url } from '../Redux/server'
// import { useState } from 'react'

// const Customers = () => {
//   const navigate = useNavigate()
//   const { data: customerData, isLoading, isError } = useGetAllCustomersQuery()
//   const [blockUnblockCustomer] = useBlockUnblockCustomerMutation()
//   const [searchText, setSearchText] = useState('')
//   const [status, setStatus] = useState('all')

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

//   const handlePaginationChange = (page, pageSize) => {
//     console.log('Page:', page, 'PageSize:', pageSize)
//   }

//   const columns = [
//     {
//       title: '#',
//       dataIndex: 'index',
//       key: 'index',
//       align: 'center',
//     },
//     {
//       title: 'Customer Name',
//       dataIndex: 'customerName',
//       key: 'customerName',
//       render: (text, record) => (
//         <div className="flex items-center space-x-3">
//           <img src={record.image} alt={text} className="w-8 h-8 rounded-full" />
//           <span>{text}</span>
//         </div>
//       ),
//     },
//     {
//       title: 'City',
//       dataIndex: 'city',
//       key: 'city',
//     },
//     {
//       title: 'Gender',
//       dataIndex: 'gender',
//       key: 'gender',
//     },
//     {
//       title: 'Contact',
//       dataIndex: 'contact',
//       key: 'contact',
//     },
//     {
//       title: 'Block / Unblock',
//       key: 'block',
//       render: (_, record) => (
//         <Switch
//           checked={record.status === 'in-progress'}
//           onChange={(checked) => handleBlockUnblock(record, checked)}
//           checkedChildren="Active"
//           unCheckedChildren="Inactive"
//         />
//       ),
//     },
//   ]

//   const data = customerData?.data?.result
//     .filter((customer) => {
//       if (status === 'active') {
//         return customer.user.status === 'in-progress' // Assuming active users have status 'in-progress'
//       } else if (status === 'inactive') {
//         return customer.user.status === 'blocked' // Assuming inactive users have status 'blocked'
//       }
//       return true // For 'all' status, return all customers
//     })
//     .filter((customer) => {
//       // Filter by search query (search by first or last name)
//       const name = `${customer.firstName} ${customer.lastName}`.toLowerCase()
//       const search = searchText.toLowerCase()
//       return name.includes(search)
//     })
//     .map((customer, index) => ({
//       key: customer._id,
//       user: customer?.user._id,
//       index: index + 1,
//       customerName: `${customer.firstName} ${customer.lastName}`,
//       city: customer.city || 'Not provided',
//       gender: customer.gender || 'Not specified',
//       contact: customer.phoneNumber || 'Not provided',
//       status: customer.user.status,
//       image: customer.profile_image
//         ? `${url}/${customer.profile_image}`
//         : `https://cdn-icons-png.flaticon.com/512/149/149071.png`,
//     }))

//   const handleBlockUnblock = async (customer, checked) => {
//     const updatedStatus = checked ? 'in-progress' : 'blocked'
//     try {
//       await blockUnblockCustomer({
//         id: customer?.user,
//         status: updatedStatus,
//       }).unwrap()
//       message.success(`Customer ${updatedStatus} successfully!`)
//     } catch (error) {
//       message.error('Failed to update customer status. Please try again.')
//     }
//   }

//   return (
//     <div className="w-full py-8">
//       <div className="flex items-center justify-between mb-6">
//         <div
//           className="flex items-center space-x-2 cursor-pointer"
//           onClick={() => navigate(-1)}
//         >
//           <Button
//             icon={<FaArrowLeft />}
//             className="flex items-center justify-center bg-transparent text-gray-700 hover:bg-gray-100 py-1 border rounded-md"
//           />
//           <h1 className="text-xl font-semibold">
//             Customers ({customerData?.data?.meta?.total})
//           </h1>
//         </div>
//         <div className="flex items-center space-x-4">
//           <Select
//             defaultValue="All customers"
//             options={[
//               { value: 'all', label: 'All customers' },
//               { value: 'active', label: 'Active' },
//               { value: 'inactive', label: 'Inactive' },
//             ]}
//             className="w-40"
//             onChange={(value) => setStatus(value)}
//           />
//           <Input
//             prefix={<AiOutlineSearch className="text-gray-400" />}
//             placeholder="Search"
//             className="w-60"
//             value={searchText}
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
//           onChange: handlePaginationChange,
//         }}
//         bordered
//         rowClassName="text-sm"
//       />
//     </div>
//   )
// }

// export default Customers
