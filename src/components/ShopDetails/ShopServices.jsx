import { useState } from 'react'
import { useGetAllServiceFromOneShopQuery } from '../../Redux/shopApis'
import { useParams } from 'react-router-dom'
import { Button, Spin, Table } from 'antd'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const ShopServices = () => {
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8) // Default page size

  // Fetching services for the specific shop
  const {
    data: serviceData,
    isLoading,
    isError,
  } = useGetAllServiceFromOneShopQuery({
    page: currentPage,
    limit: pageSize,
    shop: id,
  })

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin tip="Loading service data..." />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p>Failed to load service data. Please try again later.</p>
      </div>
    )
  }

  // Table columns definition
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span>€{price}</span>,
    },
    {
      title: 'Time',
      dataIndex: 'durationMinutes',
      key: 'durationMinutes',
      render: (durationMinutes) => <span>{durationMinutes} minutes</span>,
    },
  ]

  // Prepare data for the table
  const data = serviceData?.data?.result.map((service, index) => ({
    key: service._id,
    index: index + 1,
    serviceName: service.serviceName || 'Not provided',
    price: service.price || 'Not provided',
    durationMinutes: service.durationMinutes || 'Not specified',
  }))

  return (
    <div className="w-full">
      {/* Table Section for Services */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: serviceData?.data?.meta?.total,
          onChange: (page) => setCurrentPage(page),
          position: ['bottomCenter'],
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

export default ShopServices
