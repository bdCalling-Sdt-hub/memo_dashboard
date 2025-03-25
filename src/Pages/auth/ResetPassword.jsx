import { Form, Input, Button, Checkbox } from 'antd'
import login from '../../assets/login.png' // Importing the login image
import { useResetPasswordMutation } from '../../Redux/authApis'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
const ResetPassword = () => {
  const [reset] = useResetPasswordMutation()
  console.log(reset)
  const onFinish = (values) => {
    values.email = localStorage.getItem('email')
    reset(values)
      .unwrap()
      .then((res) => {
        localStorage.removeItem('email')
        localStorage.setItem('token', JSON.stringify(res?.data?.accessToken))
        toast.success(res.message)
        window.location.href = '/'
      })
      .catch((err) => {
        toast.error(err?.data?.message)
      })
  }

  return (
    <div className="h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <h1 className="text-3xl font-bold text-teal-600 mb-2">CARENES</h1>
        <p className="text-lg text-gray-700 mb-8">Enter new password</p>

        <Form layout="vertical" onFinish={onFinish} className="w-full max-w-sm">
          {/* New Password */}
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your new password!' },
              {
                min: 6,
                message: 'Password must be at least 6 characters long!',
              },
            ]}
          >
            <Input.Password
              placeholder="New password"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          {/* Repeat Password */}
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="confirm password"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          {/* Keep Me Logged In */}
          <Form.Item>
            <Checkbox className="text-gray-700">Keep me logged in</Checkbox>
          </Form.Item>

          {/* Reset Password Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white h-[42px] rounded-md"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Link to="/login" className="text-teal-600 hover:underline text-sm">
            Sign in instead
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2">
        <img src={login} alt="Login" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default ResetPassword
