import { useEffect, useState } from 'react'
import { Tabs, Switch, Button, Spin, message } from 'antd'
import { FaArrowLeft } from 'react-icons/fa'
import PersonalDetails from '../components/ShopDetails/PersonalDetails'
import AccountDetails from '../components/ShopDetails/AccountDetails'
import ShopServices from '../components/ShopDetails/ShopServices'
import ShopStaff from '../components/ShopDetails/ShopStaff'
import ShopPhoto from '../components/ShopDetails/ShopPhoto'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useGetOneShopDetailsQuery,
  useUpdateShopMutation,
} from '../Redux/shopApis'

const { TabPane } = Tabs

const ShopDetails = () => {
  const navigate = useNavigate()

  const [isActive, setIsActive] = useState(true)
  const selectedShopName = localStorage.getItem('selectedShopName')
  const { id } = useParams()

  const [updateShop] = useUpdateShopMutation()

  const {
    data: shopData,
    isLoading,
    isError,
  } = useGetOneShopDetailsQuery({
    id,
  })
  // console.log(shopData.data.status)

  useEffect(() => {
    if (shopData?.data?.status) {
      setIsActive(shopData.data.status === 'active')
    }
  }, [shopData])

  const handleVisibilityToggle = async (checked) => {
    const updatedStatus = checked ? 'active' : 'inactive' // Toggle between active and inactive status
    try {
      await updateShop({
        id,
        data: { status: updatedStatus }, // Send the new status to the backend
      }).unwrap()
      message.success(`Shop status updated to ${updatedStatus}`)
      setIsActive(checked) // Update the local state with the new status
    } catch (error) {
      message.error('Failed to update shop status')
    }
  }

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

  return (
    <div className="w-full py-8 px-6 ShopDetails">
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <div
          className="flex items-center space-x-2"
          onClick={() => navigate(-1)}
        >
          <Button
            icon={<FaArrowLeft />}
            className="flex items-center justify-center bg-transparent text-gray-700 hover:bg-gray-100 py-1 border rounded-md"
          />
          <h1 className="text-xl font-semibold">
            Clients &gt; {selectedShopName}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">Active</span>
          <Switch
            checked={isActive}
            checkedChildren="active"
            unCheckedChildren="inactive"
            onChange={handleVisibilityToggle}
            className={isActive ? 'bg-green-500' : 'bg-gray-500'}
          />
        </div>
      </div>

      <Tabs defaultActiveKey="1" className="mb-6">
        {/* Personal Details Tab */}
        <TabPane tab="Personal details" key="1">
          <PersonalDetails shopData={shopData.data} />
        </TabPane>

        {/* Account Details Tab */}
        <TabPane tab="Account details" key="2">
          <AccountDetails shopData={shopData.data} />
        </TabPane>

        {/* Other Tabs */}
        <TabPane tab="Shop services" key="3">
          <ShopServices />
        </TabPane>
        {/* <TabPane tab="Shop products" key="4">
          <ShopProducts />
        </TabPane> */}
        <TabPane tab="Staff & timings" key="5">
          <ShopStaff />
        </TabPane>
        <TabPane tab="Shop photos" key="6">
          <ShopPhoto shopImages={shopData?.data?.shopImages} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ShopDetails
