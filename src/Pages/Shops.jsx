import { Table, Input, Button, Switch, Select, message, Spin } from 'antd'
import { AiOutlineSearch, AiOutlineStar } from 'react-icons/ai'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useGetAllShopQuery, useUpdateShopMutation } from '../Redux/shopApis'
import { useState } from 'react'
import { url } from '../Redux/server'

const Shops = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
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
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <div className="flex items-center space-x-1 text-yellow-500">
          <AiOutlineStar />
          <span>{rating}</span>
        </div>
      ),
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
      title: 'Block / Unblock',
      key: 'block',
      render: (_, record) => {
        return (
          <Switch
            checked={record.status === 'active'}
            onChange={(checked) => handleVisibilityToggle(record.key, checked)}
            checkedChildren="active"
            unCheckedChildren="inactive"
          />
        )
      },
    },
  ]
  const handleVisibilityToggle = async (id, checked) => {
    const updatedStatus = checked ? 'active' : 'inactive' // Toggle between active and inactive status
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
    rating:
      (shop.totalRating !== 0 &&
        (shop.totalRating / shop.totalRatingCount).toFixed(1)) ||
      'Not specified',
    contact: shop.phoneNumber || 'Not provided',
    status: shop.status,
    image: shop.shopImages && shop.shopImages[0]
      ? `${url}/${shop.shopImages[0]}`
      : `https://cdn-icons-png.flaticon.com/512/149/149071.png`,
  }))

  return (
    <div className="w-full py-8">
      <div className="mb-6 flex-col">
        <div className="flex items-center space-x-2 cursor-pointer">
          <Button
            icon={<FaArrowLeft />}
            className=" flex items-center justify-center bg-transparent text-gray-700 hover:bg-gray-100 py-1 border rounded-md"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-semibold">
            Shops ({shopData?.data?.meta?.total})
          </h1>
        </div>
        {currentPage == 1 && (
          <div className="flex items-center justify-end mt-3 space-x-4">
            <div className="flex items-center space-x-4">
              <Select
                defaultValue="All customers"
                options={[
                  { value: 'all', label: 'All Shops' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ]}
                className="w-40"
                onChange={(value) =>
                  value === 'all' ? setStatus() : setStatus(value)
                }
              />
            </div>
            <Input
              prefix={<AiOutlineSearch className="text-gray-400" />}
              placeholder="Search"
              className="w-60"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        )}
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
          defaultPageSize: 8,
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

export default Shops
