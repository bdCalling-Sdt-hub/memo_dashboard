import React, { useState, useEffect } from 'react'
import {
  Table,
  Input,
  Button,
  Switch,
  Popconfirm,
  message,
  Spin,
  Form,
} from 'antd'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import {
  useCreateAdminMutation,
  useGetAllAdminInformationQuery,
  useUpdateAdminStatusMutation,
  useDeleteAdminMutation,
} from '../../Redux/manageAccountsApis'
import toast from 'react-hot-toast'

const ManageAccounts = () => {
  const [updateAdminStatus] = useUpdateAdminStatusMutation()
  const [createAdmin] = useCreateAdminMutation()
  const [deleteAdmin] = useDeleteAdminMutation()

  const [accounts, setAccounts] = useState([])
  const [form] = Form.useForm()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8) // Default page size

  const {
    data: adminData,
    isLoading,
    isError,
  } = useGetAllAdminInformationQuery({
    page: currentPage,
    limit: pageSize,
  }) // Fetch admin data

  console.log(adminData)
  useEffect(() => {
    if (adminData) {
      setAccounts(
        adminData.data.result.map((admin) => ({
          ...admin,
          key: admin._id, // Use _id as key
          access: admin.status === 'active', // Convert status to boolean
        }))
      )
    }
  }, [adminData])

  const handleAddAccount = async (values) => {
    toast.dismiss()
    try {
      const newAccount = {
        password: values.password,
        admin: {
          name: values.name,
          email: values.email,
        },
      }
      const response = await createAdmin(newAccount).unwrap()
      setAccounts([...accounts, { ...response, key: response._id }])
      form.resetFields()
      message.success('Admin account created successfully!')
    } catch (error) {
      console.error('Error creating admin account:', error)
      message.error(
        error?.data?.message ||
          'Failed to create admin account. Please try again.'
      )
    }
  }

  const handleAccessChange = async (key, checked) => {
    toast.dismiss()

    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.key === key
          ? {
              ...account,
              status: checked ? 'active' : 'inactive',
              access: checked,
            }
          : account
      )
    )
    try {
      const admin = accounts.find((account) => account.key === key)
      const updatedData = { status: checked ? 'active' : 'inactive' }

      await updateAdminStatus({ id: admin._id, data: updatedData }).unwrap()

      message.success(`Status updated to ${checked ? 'active' : 'inactive'}.`)
    } catch (error) {
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.key === key
            ? {
                ...account,
                status: !checked ? 'active' : 'inactive',
                access: !checked,
              }
            : account
        )
      )
      console.log(error)

      message.error('Failed to update admin status. Please try again.')
    }
  }

  const handleDelete = async (key) => {
    toast.dismiss()
    try {
      const admin = accounts.find((account) => account.key === key)
      await deleteAdmin(admin._id).unwrap()

      setAccounts(accounts.filter((account) => account.key !== key))
      message.success('Admin account deleted successfully!')
    } catch (error) {
      console.log(error)
      message.error('Failed to delete admin account. Please try again.')
    }
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      render: (text, record, index) => index + 1, // Serial number
    },
    {
      title: 'Account Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Access',
      dataIndex: 'access',
      key: 'access',
      align: 'center',
      render: (text, record) => (
        <Switch
          checked={record.access}
          onChange={(checked) => handleAccessChange(record.key, checked)}
        />
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      align: 'center',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this account?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined className="text-red-500 cursor-pointer" />
        </Popconfirm>
      ),
    },
  ]

  const data = adminData?.data?.result.map((admin, index) => ({
    key: admin._id,
    index: index + 1,
    name: admin.name,
    email: admin.email,
    access: admin.status === 'active', // Handle access toggle
  }))

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin tip="Loading admin accounts..." />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p>Failed to load admin accounts. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-8 rounded-lg">
      {/* Table Section */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: adminData?.data?.meta?.total,
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

      {/* Add Account Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-1">Add New Account</h3>
        <Form form={form} layout="vertical" onFinish={handleAddAccount}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              name="name"
              label="Account Name"
              rules={[
                { required: true, message: 'Please enter account name!' },
              ]}
            >
              <Input className="h-[42px]" placeholder="Enter name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input className="h-[42px]" placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter a password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password
                className="h-[42px]"
                placeholder="Enter password"
              />
            </Form.Item>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              htmlType="button"
              className="border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => form.resetFields()}
            >
              Clear
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Add
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ManageAccounts

// import { useEffect, useState } from 'react'
// import {
//   Table,
//   Switch,
//   Button,
//   Input,
//   Form,
//   Popconfirm,
//   message,
//   Spin,
// } from 'antd'
// import { DeleteOutlined } from '@ant-design/icons'
// import {
//   useCreateAdminMutation,
//   useGetAllAdminInformationQuery,
//   useUpdateAdminStatusMutation,
//   useDeleteAdminMutation,
// } from '../../Redux/manageAccountsApis'
// import toast from 'react-hot-toast'

// const ManageAccounts = () => {
//   const {
//     data: adminData,
//     isLoading,
//     isError,
//   } = useGetAllAdminInformationQuery()
//   const [updateAdminStatus] = useUpdateAdminStatusMutation()
//   const [createAdmin] = useCreateAdminMutation()
//   const [deleteAdmin] = useDeleteAdminMutation()

//   const [accounts, setAccounts] = useState([])
//   const [form] = Form.useForm()

//   useEffect(() => {
//     if (adminData) {
//       setAccounts(
//         adminData.data.result.map((admin) => ({
//           ...admin,
//           key: admin._id, // Use _id as key
//           access: admin.status === 'active', // Convert status to boolean
//         }))
//       )
//     }
//   }, [adminData])

//   const handleAddAccount = async (values) => {
//     toast.dismiss()
//     try {
//       const newAccount = {
//         password: values.password,
//         admin: {
//           name: values.name,
//           email: values.email,
//         },
//       }
//       const response = await createAdmin(newAccount).unwrap()
//       setAccounts([...accounts, { ...response, key: response._id }])
//       form.resetFields()
//       message.success('Admin account created successfully!')
//       // localStorage.setItem('activeTab', '3')
//       // window.location.reload()
//     } catch (error) {
//       console.error('Error creating admin account:', error)
//       message.error(
//         error?.data?.message ||
//           'Failed to create admin account. Please try again.'
//       )
//     }
//   }

//   const handleAccessChange = async (key, checked) => {
//     toast.dismiss()

//     setAccounts((prevAccounts) =>
//       prevAccounts.map((account) =>
//         account.key === key
//           ? {
//               ...account,
//               status: checked ? 'active' : 'inactive',
//               access: checked,
//             }
//           : account
//       )
//     )
//     try {
//       const admin = accounts.find((account) => account.key === key)
//       const updatedData = { status: checked ? 'active' : 'inactive' }

//       await updateAdminStatus({ id: admin._id, data: updatedData }).unwrap()

//       message.success(`Status updated to ${checked ? 'active' : 'inactive'}.`)
//     } catch (error) {
//       setAccounts((prevAccounts) =>
//         prevAccounts.map((account) =>
//           account.key === key
//             ? {
//                 ...account,
//                 status: !checked ? 'active' : 'inactive',
//                 access: !checked,
//               }
//             : account
//         )
//       )
//       console.log(error)

//       message.error('Failed to update admin status. Please try again.')
//     }
//   }

//   const handleDelete = async (key) => {
//     toast.dismiss()
//     try {
//       const admin = accounts.find((account) => account.key === key)
//       await deleteAdmin(admin._id).unwrap()

//       setAccounts(accounts.filter((account) => account.key !== key))
//       message.success('Admin account deleted successfully!')
//     } catch (error) {
//       console.log(error)
//       message.error('Failed to delete admin account. Please try again.')
//     }
//   }

//   const columns = [
//     {
//       title: '#',
//       dataIndex: 'key',
//       key: 'key',
//       align: 'center',
//       render: (text, record, index) => index + 1,
//     },
//     {
//       title: 'Account Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//       title: 'Access',
//       dataIndex: 'access',
//       key: 'access',
//       align: 'center',
//       render: (text, record) => (
//         <Switch
//           checked={record.access}
//           onChange={(checked) => handleAccessChange(record.key, checked)}
//         />
//       ),
//     },
//     {
//       title: 'Delete',
//       key: 'delete',
//       align: 'center',
//       render: (_, record) => (
//         <Popconfirm
//           title="Are you sure to delete this account?"
//           onConfirm={() => handleDelete(record.key)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <DeleteOutlined className="text-red-500 cursor-pointer" />
//         </Popconfirm>
//       ),
//     },
//   ]

//   if (isLoading) {
//     return (
//       <div className="w-full flex justify-center items-center h-64">
//         <Spin tip="Loading admin accounts..." />
//       </div>
//     )
//   }

//   if (isError) {
//     return (
//       <div className="w-full flex justify-center items-center h-64">
//         <p>Failed to load admin accounts. Please try again later.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="w-full bg-white p-8 rounded-lg">
//       <Table
//         columns={columns}
//         dataSource={accounts}
//         pagination={false}
//         bordered
//         rowKey="key"
//       />

//       <div className="mt-6">
//         <h3 className="text-2xl font-bold mb-1">Add New Account</h3>
//         <Form form={form} layout="vertical" onFinish={handleAddAccount}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <Form.Item
//               name="name"
//               label="Account Name"
//               rules={[
//                 { required: true, message: 'Please enter account name!' },
//               ]}
//             >
//               <Input className="h-[42px]" placeholder="Enter name" />
//             </Form.Item>
//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[
//                 { required: true, message: 'Please enter email!' },
//                 { type: 'email', message: 'Please enter a valid email!' },
//               ]}
//             >
//               <Input className="h-[42px]" placeholder="Enter email" />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[
//                 { required: true, message: 'Please enter a password!' },
//                 { min: 6, message: 'Password must be at least 6 characters!' },
//               ]}
//             >
//               <Input.Password
//                 className="h-[42px]"
//                 placeholder="Enter password"
//               />
//             </Form.Item>
//           </div>
//           <div className="flex justify-end gap-4 mt-4">
//             <Button
//               htmlType="button"
//               className="border border-gray-300 text-gray-700 hover:bg-gray-100"
//               onClick={() => form.resetFields()}
//             >
//               Clear
//             </Button>
//             <Button
//               htmlType="submit"
//               type="primary"
//               className="bg-teal-600 hover:bg-teal-700 text-white"
//             >
//               Add
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   )
// }

// export default ManageAccounts
