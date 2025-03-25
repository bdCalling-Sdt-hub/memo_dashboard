import { Form, Input, Button } from 'antd'
import login from '../../assets/login.png'
import { useState } from 'react'
import {
  useForgetPasswordMutation,
  useVerifyResetOtpMutation,
} from '../../Redux/authApis'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
  const [ForgetPass] = useForgetPasswordMutation()
  const [verify] = useVerifyResetOtpMutation()
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', ''])

  const onFinish = (values) => {
    ForgetPass(values)
      .unwrap()
      .then((res) => {
        localStorage.setItem('email', values?.email)
        toast.success(res.message)
      })
      .catch((err) => {
        toast.error(err?.data?.message)
      })
  }

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }

  const onFinishOtp = () => {
    const otpValue = otp.join('')
    if (otpValue.length === 4) {
      toast.remove()
      verify({
        email: localStorage.getItem('email'),
        resetCode: Number(otpValue),
      })
        .unwrap()
        .then((res) => {
          toast.success(res.message)
          navigate('/reset-password')
        })
        .catch((err) => {
          toast.error(err?.data?.message)
        })
    } else {
      toast.error('Please enter a valid 4-digit OTP!')
    }
  }

  return (
    <div className="h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <h1 className="text-3xl font-bold text-teal-600 mb-2">CARENS</h1>
        <p className="text-lg text-gray-700 mb-8">Reset password</p>

        {/* Email Form */}
        <Form layout="vertical" onFinish={onFinish} className="w-full max-w-sm">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              placeholder="Enter email"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={localStorage.getItem('email')}
              type="primary"
              htmlType="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white h-[42px] rounded-md"
            >
              Send OTP
            </Button>
          </Form.Item>
        </Form>

        {/* OTP Verification Form */}
        <Form
          layout="vertical"
          onFinish={onFinishOtp}
          className="w-full max-w-sm"
        >
          <Form.Item name="otp">
            <div className="flex gap-2">
              {otp.map((_, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  maxLength={1}
                  className="w-12 h-[42px] text-center border-gray-300 rounded-md"
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                />
              ))}
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white h-[42px] rounded-md"
            >
              Next
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

export default ForgetPassword
