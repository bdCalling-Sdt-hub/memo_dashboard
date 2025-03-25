import { useState, useEffect } from 'react'
import { Form, Input, Button, Upload, message, Spin, Alert } from 'antd'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {
  useGetProfileInformationQuery,
  useUpdateProfileInformationMutation,
  useUpdateSuperAdminProfileInformationMutation,
} from '../../Redux/profileApis'
import { UploadOutlined } from '@ant-design/icons'
import { url } from '../../Redux/server'
import { IoCameraOutline } from 'react-icons/io5'

const PersonalDetails = () => {
  const navigate = useNavigate()

  // Get the current user's role (from localStorage or context)
  const role = localStorage.getItem('role')

  console.log(role)

  const { data, isLoading, isError } = useGetProfileInformationQuery()
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateProfileInformationMutation()
  const [updateSuperAdminProfile] =
    useUpdateSuperAdminProfileInformationMutation()

  const [form] = Form.useForm()
  const [profileImage, setProfileImage] = useState(null)
  const [localImage, setLocalImage] = useState('')
  const [name, setName] = useState('') // State for name
  const [image, setImage] = useState(null)
  const handleChange = (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0]
    setImage(file)
    setProfileImage(file)
  }

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name) // Initialize name state
      setProfileImage(data.data.profile_image) // Initialize profile image state
    }
  }, [data])
  console.log(localImage)
  const onFinish = async (values) => {
    try {
      let formData
      if (role == '"superAdmin"') {
        formData = new FormData()

        if (profileImage) {
          formData.append('profile_image', profileImage)
        }
        formData.append('name', values.personalName)
        const response = await updateSuperAdminProfile(formData).unwrap()
        message.success('Super Admin profile updated successfully!')
      } else {
        // For other roles, use FormData
        formData = new FormData()
        formData.append('name', values.personalName)
        role !== '"superAdmin"' &&
          formData.append('phoneNumber', values.contact)
        if (profileImage) {
          formData.append('profile_image', profileImage)
        }
        const response = await updateProfile(formData).unwrap()
        message.success(response.message || 'Profile updated successfully!')
      }
      setName(values.personalName) // Update name in the state dynamically
    } catch (error) {
      message.error(
        error?.data?.message ||
          'Failed to update profile. Please try again later.'
      )
    }
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin tip="Loading profile details..." />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Alert
          message="Error"
          description="Failed to load profile details. Please try again later."
          type="error"
          showIcon
        />
      </div>
    )
  }

  const profileData = data.data || {}

  return (
    <div className="w-full bg-white p-8 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4 ">
          <div className="relative w-[140px] h-[124px] mx-auto ">
            <input
              type="file"
              onInput={handleChange}
              id="img"
              style={{ display: 'none' }}
            />
            <img
              style={{ width: 140, height: 140, borderRadius: '100%' }}
              src={`${
                image ? URL.createObjectURL(image) : `${url}/${profileImage}`
              }`}
              alt=""
              className="border-2  p-[2px] object-cover"
            />

            <label
              htmlFor="img"
              className="
                            absolute top-[80px] -right-2
                            bg-[var(--primary-color)]
                            rounded-full
                            w-6 h-6
                            flex items-center justify-center
                            cursor-pointer
                        "
            >
              <div className="bg-yellow p-1 rounded-full">
                <IoCameraOutline className="text-3xl -ml-5 mt-10 font-bold" />
              </div>
            </label>
          </div>

          <div>
            <h1 className="text-xl font-semibold">{name || 'N/A'}</h1>
            <p className="text-gray-500">{profileData.email || 'N/A'}</p>
          </div>
        </div>
        <Link
          to={`/change-password`}
          className="px-4 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 flex items-center"
        >
          Change password
          <span className="ml-2">↗</span>
        </Link>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          personalName: profileData.name || '',
          email: profileData.email || '',
          contact: profileData.phoneNumber || '',
        }}
      >
        <Form.Item
          label="Personal Name"
          name="personalName"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input className="h-[42px]" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input className="h-[42px] cursor-not-allowed" readOnly />
        </Form.Item>

        {role !== '"superAdmin"' && (
          <Form.Item
            label="Contact"
            name="contact"
            rules={[
              { required: true, message: 'Please enter your contact number!' },
              {
                pattern: /^\+?\d+$/,
                message: 'Please enter a valid phone number!',
              },
            ]}
          >
            <Input className="h-[42px]" />
          </Form.Item>
        )}

        <div className="mt-8 flex justify-end gap-4">
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
            loading={isUpdating}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            Save changes
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default PersonalDetails

// import { useEffect, useState } from 'react'
// import { Form, Input, Button, Upload, message, Spin, Alert } from 'antd'
// import { PlusOutlined } from '@ant-design/icons'
// import { Link } from 'react-router-dom'
// import {
//   useGetProfileInformationQuery,
//   useUpdateProfileInformationMutation,
// } from '../../Redux/profileApis'
// import { url } from '../../Redux/server'

// const PersonalDetails = () => {
//   const { data, isLoading, isError } = useGetProfileInformationQuery()
//   const [updateProfile, { isLoading: isUpdating }] =
//     useUpdateProfileInformationMutation()

//   const [form] = Form.useForm()
//   const [profileImage, setProfileImage] = useState(null)
//   const [name, setName] = useState('') // State for name

//   const role = localStorage.getItem('role')

//   console.log(role)

//   useEffect(() => {
//     if (data?.data) {
//       setName(data.data.name) // Initialize name state
//       setProfileImage(data.data.profile_image) // Initialize profile image state
//       console.log(data.data.profile_image)
//     }
//   }, [data])

//   // const handleImageUpload = async ({ file }) => {
//   //   const formData = new FormData()
//   //   formData.append('image', file.originFileObj)

//   //   try {
//   //     const response = await fetch(`${url}/upload-profile-image`, {
//   //       method: 'POST',
//   //       body: formData,
//   //     })

//   //     if (!response.ok) {
//   //       throw new Error('Failed to upload image')
//   //     }

//   //     const responseData = await response.json()
//   //     setProfileImage(responseData.url) // Save the URL returned by the backend
//   //     message.success('Image uploaded successfully!')
//   //   } catch (error) {
//   //     console.error(error)
//   //     message.error('Image upload failed!')
//   //   }
//   // }

//   const onFinish = async (values) => {
//     try {
//       const formData = new FormData()
//       formData.append('name', values.personalName)
//       formData.append('email', values.email)
//       formData.append('phoneNumber', values.contact)
//       if (profileImage) {
//         formData.append('profile_image', profileImage)
//       }

//       const response = await updateProfile(formData).unwrap() // Use form data for submission
//       setName(values.personalName) // Update name in the state dynamically
//       message.success(response.message || 'Profile updated successfully!')
//     } catch (error) {
//       message.error(
//         error?.data?.message ||
//           'Failed to update profile. Please try again later.'
//       )
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="w-full flex justify-center items-center h-64">
//         <Spin tip="Loading profile details..." />
//       </div>
//     )
//   }

//   if (isError || !data) {
//     return (
//       <div className="w-full flex justify-center items-center h-64">
//         <Alert
//           message="Error"
//           description="Failed to load profile details. Please try again later."
//           type="error"
//           showIcon
//         />
//       </div>
//     )
//   }

//   const profileData = data.data || {}

//   return (
//     <div className="w-full bg-white p-8 rounded-lg">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <img
//               src={
//                 profileImage
//                   ? `${url}/${profileImage}`
//                   : 'https://via.placeholder.com/100'
//               }
//               alt="Profile"
//               className="w-20 h-20 rounded-full object-cover"
//             />
//             <Upload
//               showUploadList={false}
//               accept="image/*"
//               customRequest={({ file, onSuccess }) => {
//                 setTimeout(() => onSuccess('ok'), 0) // Simulate success
//               }}
//               // onChange={}
//             >
//               <div className="absolute bottom-6 right-0 bg-teal-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer">
//                 <PlusOutlined />
//               </div>
//             </Upload>
//           </div>
//           <div>
//             <h1 className="text-xl font-semibold">{name || 'N/A'}</h1>{' '}
//             {/* Updated to use state */}
//             <p className="text-gray-500">{profileData.email || 'N/A'}</p>
//           </div>
//         </div>
//         <Link
//           to={`/change-password`}
//           className="px-4 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 flex items-center"
//         >
//           Change password
//           <span className="ml-2">↗</span>
//         </Link>
//       </div>

//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         initialValues={{
//           personalName: profileData.name || '',
//           email: profileData.email || '',
//           contact: profileData.phoneNumber || '',
//         }}
//       >
//         <Form.Item
//           label="Personal Name"
//           name="personalName"
//           rules={[{ required: true, message: 'Please enter your name!' }]}
//         >
//           <Input className="h-[42px]" />
//         </Form.Item>

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             { required: true, message: 'Please enter your email!' },
//             { type: 'email', message: 'Please enter a valid email!' },
//           ]}
//         >
//           <Input className="h-[42px] cursor-not-allowed" readOnly />
//         </Form.Item>

//         <Form.Item
//           label="Contact"
//           name="contact"
//           rules={[
//             { required: true, message: 'Please enter your contact number!' },
//             {
//               pattern: /^\+?\d+$/,
//               message: 'Please enter a valid phone number!',
//             },
//           ]}
//         >
//           <Input className="h-[42px]" />
//         </Form.Item>

//         <div className="mt-8 flex justify-end gap-4">
//           <Button
//             htmlType="button"
//             className="border border-gray-300 text-gray-700 hover:bg-gray-100"
//             onClick={() => form.resetFields()}
//           >
//             Cancel
//           </Button>
//           <Button
//             htmlType="submit"
//             type="primary"
//             loading={isUpdating}
//             className="bg-teal-600 hover:bg-teal-700 text-white"
//           >
//             Save changes
//           </Button>
//         </div>
//       </Form>
//     </div>
//   )
// }

// export default PersonalDetails
