import { useEffect } from 'react'
import { Form, Input, Button, message, Spin, Alert } from 'antd'
import {
  useGetProfileInformationQuery,
  useUpdateProfileInformationMutation,
} from '../../Redux/profileApis'

const AccountDetails = () => {
  const { data, isLoading, isError } = useGetProfileInformationQuery()
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateProfileInformationMutation()

  const [form] = Form.useForm()

  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue({
        bankName: data.data.bankName || '',
        accountName: data.data.accountName || '',
        accountNumber: data.data.accountNumber || '',
        branchCode: data.data.branchCode || '',
      })
    }
  }, [data, form])

  const onFinish = async (values) => {
    try {
      // Convert accountNumber and branchCode to numbers
      const payload = {
        bankName: values.bankName,
        accountName: values.accountName,
        accountNumber: parseInt(values.accountNumber, 10),
        branchCode: parseInt(values.branchCode, 10),
      }

      const response = await updateProfile(payload).unwrap() // Submit data as JSON
      message.success(
        response.message || 'Account details updated successfully!'
      )
    } catch (error) {
      message.error(
        error?.data?.message ||
          'Failed to update account details. Please try again later.'
      )
    }
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin tip="Loading account details..." />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Alert
          message="Error"
          description="Failed to load account details. Please try again later."
          type="error"
          showIcon
        />
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-8 rounded-lg">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          bankName: data?.data?.bankName || '',
          accountName: data?.data?.accountName || '',
          accountNumber: data?.data?.accountNumber || '',
          branchCode: data?.data?.branchCode || '',
        }}
      >
        {/* Bank Name */}
        <Form.Item
          label="Bank Name"
          name="bankName"
          rules={[{ required: true, message: 'Please enter the bank name!' }]}
        >
          <Input className="h-[42px]" />
        </Form.Item>

        {/* Account Name */}
        <Form.Item
          label="Account Name"
          name="accountName"
          rules={[
            { required: true, message: 'Please enter the account name!' },
          ]}
        >
          <Input className="h-[42px]" />
        </Form.Item>

        {/* Account Number */}
        <Form.Item
          label="Account Number"
          name="accountNumber"
          rules={[
            { required: true, message: 'Please enter the account number!' },
            {
              pattern: /^\d+$/,
              message: 'Account number must contain only numbers!',
            },
          ]}
        >
          <Input className="h-[42px]" />
        </Form.Item>

        {/* Branch Code */}
        <Form.Item
          label="Branch Code"
          name="branchCode"
          rules={[
            { required: true, message: 'Please enter the branch code!' },
            {
              pattern: /^\d+$/,
              message: 'Branch code must contain only numbers!',
            },
          ]}
        >
          <Input className="h-[42px]" />
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

export default AccountDetails
