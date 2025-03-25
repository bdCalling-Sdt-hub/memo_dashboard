import { Input } from 'antd'

const PersonalDetails = ({ shopData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <Input
          value={`${shopData?.firstName} ${shopData?.lastName}`}
          readOnly
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Shop Name
        </label>
        <Input value={shopData?.shopName || 'Not provided'} readOnly />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Shop Type
        </label>
        <Input value={shopData?.shopCategory || 'Not provided'} readOnly />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <Input value={shopData?.email || 'Not provided'} readOnly />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Contact</label>
        <Input value={shopData?.phoneNumber || 'Not provided'} readOnly />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">City</label>
        <Input value={shopData?.city || 'Not provided'} readOnly />
      </div>
    </div>
  )
}

export default PersonalDetails
