import { Table, Input, Button, Switch, Select, message, Spin } from 'antd'
import { AiOutlineSearch, AiOutlineStar } from 'react-icons/ai'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useGetAllShopQuery, useUpdateShopMutation } from '../../Redux/shopApis'
import { useState } from 'react'
import { url } from '../../Redux/server'
import { EyeOutlined } from '@ant-design/icons'

const ShopsRegistration = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [searchText, setSearchText] = useState('')
  const [status, setStatus] = useState()
  const [updateShop] = useUpdateShopMutation()

  const {
    data: shopData,
    isLoading,
    isError,
  } = useGetAllShopQuery({
    page: currentPage,
    limit: pageSize,
    searchTerm: searchText,
    status: status,
  })

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin tip="Loading category data..." />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p>Failed to load category data. Please try again later.</p>
      </div>
    )
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
    {
      title: 'Shop Name',
      dataIndex: 'shopName',
      key: 'shopName',
      render: (text, record) => (
        <div
          onClick={() => {
            localStorage.setItem('selectedShopName', record.shopName)
            navigate(`/shop-details/${record.key}`)
          }}
          className="flex items-center space-x-3 cursor-pointer select-none"
        >
          <img src={record.image} alt="shop" className="w-8 h-8 rounded-full" />
          <span className="font-medium">{text}</span>
        </div>
      ),
    },

    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },

    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span
          className={`px-4 py-1 rounded-full text-sm ${
            status === 'active'
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {status}
        </span>
      ),
    },

    {
      title: 'View Details',
      key: 'viewDetails',

      render: (text, record) => (
        <div
          onClick={() => {
            localStorage.setItem('selectedShopName', record.shopName)
            navigate(`/shop-details/${record.key}`)
          }}
          className="text-white  w-10 text-center bg-[#016A70] text-2xl p-2 py-1 rounded-full cursor-pointer select-none"
        >
          <EyeOutlined />
        </div>
      ),
    },
  ]
  const handleVisibilityToggle = async (id, checked) => {
    const updatedStatus = checked ? 'active' : 'inactive' // Toggle between active and inactive status
    console.log(id)
    try {
      await updateShop({
        id: id,
        data: { status: updatedStatus }, // Send the new status to the backend
      }).unwrap()
      message.success(`Shop status updated to ${updatedStatus}`)
    } catch (error) {
      message.error('Failed to update shop status')
    }
  }
  const data = shopData?.data?.result.map((shop, index) => ({
    key: shop._id,
    index: index + 1,
    shopName: shop.shopName || 'Not provided',
    city: shop.city || 'Not provided',
    contact: shop.phoneNumber || 'Not provided',
    status: shop.status,
    image: shop.shopImages?.[0]
      ? `${url}/${shop.shopImages}`
      : `https://cdn-icons-png.flaticon.com/512/149/149071.png`,
  }))

  return (
    <div className="w-full py-8">
      <div className="mb-6 flex-col">
        <div className="flex items-center space-x-2 cursor-pointer">
          <h1 className="text-xl font-semibold">Shops Registration</h1>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: shopData?.data?.meta?.total,
          onChange: (page) => setCurrentPage(page),
          position: ['bottomCenter'],
          defaultPageSize: 3,
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

export default ShopsRegistration

// import React, { useState } from "react";
// import { Table, Button, Modal } from "antd";
// import { EyeOutlined } from "@ant-design/icons";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// const ShopsRegistration = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedShop, setSelectedShop] = useState(null);

//     const showModal = (shop) => {
//         setSelectedShop(shop);
//         setIsModalOpen(true);
//     };

//     const handleCancel = () => {
//         setIsModalOpen(false);
//         setSelectedShop(null);
//     };

//     const columns = [
//         {
//             title: "#",
//             dataIndex: "index",
//             key: "index",
//             align: "center",
//             width: 50,
//         },
//         {
//             title: "Shop Name",
//             dataIndex: "shopName",
//             key: "shopName",
//             render: (text) => (
//                 <div className="flex items-center space-x-3">
//                     <img
//                         src="https://via.placeholder.com/30"
//                         alt="shop"
//                         className="w-8 h-8 rounded-full"
//                     />
//                     <span className="font-medium">{text}</span>
//                 </div>
//             ),
//         },
//         {
//             title: "Shop Category",
//             dataIndex: "shopCategory",
//             key: "shopCategory",
//         },
//         {
//             title: "City",
//             dataIndex: "city",
//             key: "city",
//         },
//         {
//             title: "Contact",
//             dataIndex: "contact",
//             key: "contact",
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (_, record) => (
//                 <div className="flex space-x-2">
//                     <button className="bg-green-100 hover:bg-green-600 hover:text-white text-green-600 border-none rounded-md px-3 py-1 transition-all">
//                         Accept
//                     </button>
//                     <button className="bg-red-100 hover:bg-red-600 hover:text-white text-red-600 border-none rounded-md px-3 py-1 transition-all">
//                         Decline
//                     </button>
//                 </div>
//             ),
//         },
//         {
//             title: "View Details",
//             key: "viewDetails",
//             render: (_, record) => (
//                 <button
//                     onClick={() => showModal(record)}
//                     className="text-white items-center justify-center bg-[#016A70] text-2xl p-2 py-1 rounded-full"
//                 >
//                     <EyeOutlined />
//                 </button>
//             ),
//         },
//     ];

//     const data = [
//         {
//             key: "1",
//             index: "01",
//             shopName: "Cameron Salons",
//             shopCategory: "Skin care",
//             city: "Berlin",
//             contact: "+9724545643",
//             shopAddress: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
//             shopGenderCategory: "Male",
//             shopOwnerName: "Mike Smith",
//             email: "sadgfjdg@gmail.com",
//             phoneNumber: "+3489 9999 9778",
//             bankName: "AB Bank",
//             accountHolderName: "Dianne Russell",
//             accountNumber: "6575675678676",
//             branchCode: "4575467",
//             branchCity: "New York",
//         },
//         // Add more shop objects here...
//     ];

//     return (
//         <div className="container mx-auto px-6 py-8">
//             <h1 className="text-2xl font-bold mb-6">Shops Registration</h1>
//             <Table
//                 columns={columns}
//                 dataSource={data}
//                 pagination={{
//                     position: ["bottomCenter"],
//                     defaultPageSize: 5,
//                     showSizeChanger: false,
//                     nextIcon: (
//                         <button className="absolute right-0 flex justify-center items-center gap-2 w-fit whitespace-nowrap py-0 px-4 rounded-md border-2">
//                             Next
//                             <FaArrowRight />
//                         </button>
//                     ),
//                     prevIcon: (
//                         <button className="absolute left-0 flex justify-center items-center gap-2 w-fit whitespace-nowrap py-0 px-4 rounded-md border-2">
//                             <FaArrowLeft /> Previous
//                         </button>
//                     ),
//                 }}
//                 bordered
//                 rowClassName="text-sm"
//             />
//             <Modal
//                 title="Shop Details"
//                 visible={isModalOpen}
//                 onCancel={handleCancel}
//                 footer={null}
//                 centered
//             >
//                 {selectedShop && (
//                     <div>
//                         <p>
//                             <strong>Shop Name:</strong> {selectedShop.shopName}
//                         </p>
//                         <p>
//                             <strong>Shop Address:</strong> {selectedShop.shopAddress}
//                         </p>
//                         <p>
//                             <strong>Shop Gender Category:</strong>{" "}
//                             {selectedShop.shopGenderCategory}
//                         </p>
//                         <p>
//                             <strong>Shop Category:</strong> {selectedShop.shopCategory}
//                         </p>
//                         <p>
//                             <strong>Shop Owner Name:</strong> {selectedShop.shopOwnerName}
//                         </p>
//                         <p>
//                             <strong>Email:</strong> {selectedShop.email}
//                         </p>
//                         <p>
//                             <strong>Phone Number:</strong> {selectedShop.phoneNumber}
//                         </p>
//                         <h3 className="mt-4 font-bold">Bank Info</h3>
//                         <p>
//                             <strong>Bank Name:</strong> {selectedShop.bankName}
//                         </p>
//                         <p>
//                             <strong>Account Holder Name:</strong>{" "}
//                             {selectedShop.accountHolderName}
//                         </p>
//                         <p>
//                             <strong>Account Number:</strong> {selectedShop.accountNumber}
//                         </p>
//                         <p>
//                             <strong>Branch Code:</strong> {selectedShop.branchCode}
//                         </p>
//                         <p>
//                             <strong>Branch City:</strong> {selectedShop.branchCity}
//                         </p>
//                     </div>
//                 )}
//             </Modal>
//         </div>
//     );
// };

// export default ShopsRegistration;
