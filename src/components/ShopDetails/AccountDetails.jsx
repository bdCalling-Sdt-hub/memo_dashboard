import { Input } from 'antd'

const AccountDetails = ({ shopData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Bank Name
        </label>
        {/* Dynamically populate the bank name */}
        <Input value={shopData?.bankName || 'Not provided'} readOnly />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Account Name
        </label>
        {/* Dynamically populate the account name */}
        <Input value={shopData?.bankAccountName || 'Not provided'} readOnly />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Account Number
        </label>
        {/* Dynamically populate the account number */}
        <Input value={shopData?.bankAccountNumber || 'Not provided'} readOnly />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Branch Code
        </label>
        {/* Dynamically populate the branch code */}
        <Input value={shopData?.branchCode || 'Not provided'} readOnly />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Bank City
        </label>
        {/* Dynamically populate the bank city */}
        <Input value={shopData?.bankCity || 'Not provided'} readOnly />
      </div>
    </div>
  )
}

export default AccountDetails
