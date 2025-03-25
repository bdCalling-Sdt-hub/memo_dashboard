import { Table, Input, Select, Button, Spin } from 'antd'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useGetOneServiceQuery } from '../Redux/serviceApis'

const CategoryDetails = () => {
  const navigate = useNavigate()
  const params = useParams()
  const selectedCategoryName = localStorage.getItem('selectedCategoryName')
  // console.log(params.id)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10) // Default page size
  const [sort, setSort] = useState(undefined) // Default page size
  const [searchTerm, setSearchTerm] = useState('') // Default page size

  const {
    data: servicesData,
    isLoading,
    isError,
  } = useGetOneServiceQuery({
    shopCategory: params.id,
    page: currentPage,
    limit: pageSize,
    sort: sort === 'topSelling' ? undefined : sort,
    searchTerm: searchTerm,
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
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
    {
      title: 'Service names',
      dataIndex: 'serviceName',
      key: 'serviceName',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
      key: 'sales',
      render: (sales) => <span>€{sales}</span>,
    },
  ]

  const data = servicesData?.data?.result.map((service) => ({
    key: service._id,
    index: servicesData.data.result.indexOf(service) + 1,
    serviceName: service.serviceName || 'N/A',
    sales: service.totalSales || 0,
  }))

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
            {selectedCategoryName} ({servicesData?.data?.meta?.total})
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            defaultValue="All services"
            options={[
              { value: 'allServices', label: 'All services' },
              { value: 'topSelling', label: 'Top selling' },
            ]}
            onClick={(e) => setSort(e.target.value)}
            className="w-40"
          />
          <Input
            prefix={<AiOutlineSearch className="text-gray-400" />}
            placeholder="Search"
            className="w-60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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

export default CategoryDetails
