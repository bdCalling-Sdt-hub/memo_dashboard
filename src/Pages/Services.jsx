import { Table, Button, Spin } from 'antd'
import { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useGetAllServicesQuery } from '../Redux/serviceApis'

const Services = () => {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10) // Default page size

  // Get all categories from the backend
  const {
    data: servicesData,
    isLoading,
    isError,
  } = useGetAllServicesQuery({
    page: currentPage,
    limit: pageSize,
  })

  // Loading and error state handling
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
      render: (text, record, index) => (
        <span className="text-gray-500">{index + 1}</span>
      ),
    },
    {
      title: 'Category names',
      dataIndex: 'categoryName',
      key: 'categoryName',
      render: (_, record) => (
        <Link
          to={`/services/${record.key}`}
          className="select-none cursor-pointer"
          onClick={() =>
            localStorage.setItem('selectedCategoryName', record.categoryName)
          }
        >
          {record.categoryName}
        </Link>
      ),
    },
    {
      title: 'No. of services',
      dataIndex: 'noOfServices',
      key: 'noOfServices',
      render: (text) => `${text} services`,
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
      key: 'sales',
      render: (text) => `€${text}`,
    },
  ]

  const data = servicesData?.data?.result.map((service) => ({
    key: service._id,
    index: servicesData.data.result.indexOf(service) + 1,
    categoryName: service.categoryName || 'N/A',
    noOfServices: service.totalServices || 0,
    sales: service.totalSales || 0,
  }))

  return (
    <div className="w-full py-8">
      <div
        className="mb-6 flex items-center space-x-2"
        onClick={() => navigate(-1)}
      >
        <Button
          icon={<FaArrowLeft />}
          className="flex items-center justify-center bg-transparent text-gray-700 hover:bg-gray-100 py-1 border rounded-md"
        />
        <h1 className="text-xl font-semibold">
          Service Categories ({servicesData?.data?.meta.total})
        </h1>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: servicesData?.data?.meta?.total,
          onChange: (page) => setCurrentPage(page),
          position: ['bottomCenter'],
          defaultPageSize: 10,
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

export default Services
