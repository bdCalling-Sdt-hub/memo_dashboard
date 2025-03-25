import { useState } from 'react'
import { Table, Button, Input, Spin } from 'antd'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import {
  useGetAllShopDataQuery,
  useNotifyAllShopMutation,
  useNotifyOneShopMutation,
} from '../Redux/payOnShopApis'
import { url } from '../Redux/server'
import toast from 'react-hot-toast'

const PayOnShop = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(9) // Default page size
  const [searchText, setSearchText] = useState('')

  const [notifyAllShop] = useNotifyAllShopMutation()
  const [notifyOneShop] = useNotifyOneShopMutation()

  const {
    data: payOnShopData,
    isLoading,
    isError,
  } = useGetAllShopDataQuery({
    page: currentPage,
    limit: pageSize,
    searchTerm: searchText,
  })

  // Columns definition
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
        <div className="flex items-center">
          <img
            src={record.image}
            alt="shop"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-gray-700">{text}</span>
        </div>
      ),
    },
    {
      title: 'Amount Need to Pay',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        // console.log(record)
        return (
          <Button
            className="bg-green-100 text-green-700 border-none hover:bg-green-200 px-4 py-1 rounded-md"
            onClick={() => handleNotifyOneShop(record.key)}
          >
            Notify
          </Button>
        )
      },
    },
  ]

  const data = payOnShopData?.data?.result.map((shopData, index) => ({
    key: shopData._id,
    index: index + 1,
    shopName: shopData.shopName || 'Not provided',
    amount: shopData.payOnShopChargeDueAmount || 0,
    image:
      shopData.shopImages && shopData.shopImages[0]
        ? `${url}/${shopData.shopImages[0]}`
        : `https://cdn-icons-png.flaticon.com/512/149/149071.png`,
  }))

  const handleNotifyAllShops = async () => {
    try {
      await notifyAllShop()
      toast.success('All shops notified successfully!')
      console.log('All shops notified successfully')
    } catch (error) {
      console.error('Error notifying all shops:', error)
    }
  }

  const handleNotifyOneShop = async (id) => {
    console.log(id)
    try {
      await notifyOneShop(id).unwrap() // Trigger notification for one shop
      toast.success('Notification sent to this shop!')
    } catch (error) {
      toast.error('Error sending notification to this shop')
    }
  }

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
    <div className="w-full px-6 py-8 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div
          className="flex items-center space-x-2"
          onClick={() => navigate(-1)}
        >
          <Button
            icon={<FaArrowLeft />}
            className="flex items-center justify-center bg-transparent text-gray-700 hover:bg-gray-100 py-1 border rounded-md"
          />
          <h1 className="text-xl font-semibold">
            Pay On Shop ({payOnShopData?.data?.meta?.total || 0})
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {currentPage === 1 && (
            <Input
              prefix={<SearchOutlined className="text-gray-400" />}
              placeholder="Search Shop"
              className="w-60 h-[42px]"
              onChange={(e) => setSearchText(e.target.value)}
            />
          )}
          <Button
            onClick={handleNotifyAllShops}
            className="bg-green-100 text-green-700 border-none hover:bg-green-200 px-4 py-5 border rounded-md"
          >
            Notify All Shops
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: payOnShopData?.data?.meta?.total,
          onChange: (page) => setCurrentPage(page),
          position: ['bottomCenter'],
          nextIcon: (
            <Button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md border">
              Next <FaArrowRight />
            </Button>
          ),
          prevIcon: (
            <Button
              icon={<FaArrowLeft />}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md border"
            >
              Previous
            </Button>
          ),
        }}
        bordered
        rowClassName="text-sm"
      />
    </div>
  )
}

export default PayOnShop
