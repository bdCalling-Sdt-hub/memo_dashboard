import { useState } from 'react'
import { Table, Select, Button, Spin } from 'antd'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useGetAllTransactionsQuery } from '../Redux/transactionApis'
import { url } from '../Redux/server'

const Transaction = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState('Customer')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(9)

  const {
    data: transactionData,
    isLoading,
    isError,
  } = useGetAllTransactionsQuery({
    page: currentPage,
    limit: pageSize,
    ...(status === 'all' ? {} : { senderEntityType: status }),
  })

  const data = transactionData?.data?.result.map((transaction, index) => ({
    key: transaction._id,
    index: index + 1,
    date: transaction.createdAt,
    name: `${transaction.senderEntityId?.firstName || ''} ${
      transaction.senderEntityId?.lastName || ''
    }`,
    amount: transaction.amount,
    type: transaction.type,
    sales: transaction.amount || 0,
    image: transaction?.senderEntityId?.profile_image
      ? `${url}/${transaction.senderEntityId.profile_image}`
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

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => (
        <span className="text-gray-600">
          {new Date(text).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img
            src={record.image}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-700">{text}</span>
        </div>
      ),
    },
    {
      title: 'Paid Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <span className="text-gray-600">€{text}</span>,
    },
    {
      title: 'Payment Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
  ]

  return (
    <div className="w-full px-6 py-8 bg-white rounded-lg shadow-md">
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
            Transaction ({transactionData?.data?.meta?.total})
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            defaultValue="All Transaction"
            options={[
              { value: 'all', label: 'All Transaction' },
              { value: 'Customer', label: 'Customer' },
              { value: 'Client', label: 'Shop' },
            ]}
            className="w-40"
            onChange={(value) => setStatus(value)}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: transactionData?.data?.meta?.total,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
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

export default Transaction
