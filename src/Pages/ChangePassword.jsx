import { Form, Input, Button, message } from 'antd'
import { FaArrowLeft } from 'react-icons/fa'
import { useUpdateAndChangePasswordMutation } from '../Redux/changePasswordApis'
import { use } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [updateAndChangePassword, { isLoading }] =
    useUpdateAndChangePasswordMutation()

  const onFinish = async (values) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = values
      console.log(currentPassword, newPassword, confirmPassword)
      // API payload
      const payload = {
        oldPassword: currentPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
      }

      // Call the mutation
      const response = await updateAndChangePassword(payload).unwrap()

      // Show success message
      message.success(response?.message || 'Password changed successfully!')
      form.resetFields()
    } catch (error) {
      // Show error message
      console.error('Error changing password:', error)
      message.error(
        error?.data?.message || 'Failed to change password. Please try again.'
      )
    }
  }

  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-md">
      {/* Header Section */}
      <div
        className="flex items-center space-x-2 mb-6"
        onClick={() => navigate(-1)}
      >
        <button className="flex items-center justify-center bg-transparent text-gray-700 hover:bg-gray-100 py-1 px-3 border rounded-md">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Change Password</h1>
      </div>

      {/* Form Section */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
      >
        {/* Current Password */}
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[
            { required: true, message: 'Please enter your current password!' },
          ]}
        >
          <Input.Password
            className="h-[42px]"
            placeholder="Enter current password"
          />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: 'Please enter a new password!' },
            { min: 6, message: 'Password must be at least 6 characters long!' },
          ]}
        >
          <Input.Password
            className="h-[42px]"
            placeholder="Enter new password"
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Passwords do not match!'))
              },
            }),
          ]}
        >
          <Input.Password
            className="h-[42px]"
            placeholder="Confirm new password"
          />
        </Form.Item>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <Button
            htmlType="button"
            className="border border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={() => form.resetFields()}
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            Change Password
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ChangePassword
