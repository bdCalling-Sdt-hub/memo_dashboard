import { Form, Input, Button, Checkbox } from 'antd'
import login from '../../assets/login.png' // Importing the login image
import { Link } from 'react-router-dom'
import { useLoginMutation } from '../../Redux/authApis'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'

const Login = () => {
  const [loginUser] = useLoginMutation()
  const onFinish = (values) => {
    // console.log(values)
    values.email = values.email.trim()
    values.password = values.password.trim()

    toast.remove()
    loginUser(values)
      .unwrap()
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', JSON.stringify(res?.data?.accessToken))
        toast.success(res?.message)
        const decoded = jwtDecode(localStorage.getItem('token'))
        console.log(decoded)
        localStorage.setItem('role', JSON.stringify(decoded?.role))
        window.location.href = '/'
      })
      .catch((err) => {
        toast.error(err?.data?.message)
      })
    // alert("Logged in successfully!");
  }

  return (
    <div className="h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <h1 className="text-3xl font-bold text-teal-600 mb-2">CARENS</h1>
        <p className="text-lg text-gray-700 mb-8">Welcome to Carenes!</p>

        <Form layout="vertical" onFinish={onFinish} className="w-full max-w-sm">
          {/* Username / Email */}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your username or email!',
              },
            ]}
          >
            <Input
              placeholder="Enter  Email"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              placeholder="Enter password"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          {/* Remember Me */}
          <Form.Item>
            <Checkbox className="text-gray-700">Keep me logged in</Checkbox>
          </Form.Item>

          {/* Login Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white h-[42px] rounded-md"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <span className="">Forgot password?</span>{' '}
          <span className="text-gray-500 text-sm"></span>{' '}
          <Link
            to={`/forget-password`}
            className="text-teal-600 hover:underline text-sm"
          >
            Reset password
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

export default Login
