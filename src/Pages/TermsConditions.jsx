import { useEffect, useState } from 'react'
import JoditEditor from 'jodit-react'
import { useNavigate } from 'react-router-dom'
import {
  useCreateTermsAndConditionsMutation,
  useGetTermsAndConditionsQuery,
} from '../Redux/termsAndConditionApis'
import toast from 'react-hot-toast'
import { Spin } from 'antd'

const TermsConditions = () => {
  const navigate = useNavigate()
  const [clientContent, setClientContent] = useState('')
  const [customerContent, setCustomerContent] = useState('')
  const [createTasks] = useCreateTermsAndConditionsMutation()

  const {
    data: termsData,
    isLoading,
    isError,
  } = useGetTermsAndConditionsQuery()

  useEffect(() => {
    if (termsData?.data) {
      setClientContent(termsData?.data?.descriptionForClientApp || '')
      setCustomerContent(termsData?.data?.descriptionForCustomerApp || '')
    }
  }, [termsData])

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin tip="Loading customer data..." />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p>Failed to load customer data. Please try again later.</p>
      </div>
    )
  }

  // Handle Clear action for Client Terms
  const handleClientClear = () => {
    setClientContent('')
  }

  // Handle Save action for Client Terms
  const handleClientSave = async () => {
    try {
      await createTasks({
        descriptionForClientApp: clientContent,
      })
      toast.success('Client Terms & Conditions saved successfully!')
    } catch (error) {
      console.error('Failed to save client terms:', error)
      toast.error('Failed to save client terms!')
    }
  }

  // Handle Clear action for Customer Terms
  const handleCustomerClear = () => {
    setCustomerContent('')
  }

  // Handle Save action for Customer Terms
  const handleCustomerSave = async () => {
    try {
      await createTasks({
        descriptionForCustomerApp: customerContent,
      })
      toast.success('Customer Terms & Conditions saved successfully!')
    } catch (error) {
      console.error('Failed to save customer terms:', error)
      toast.error('Failed to save customer terms!')
    }
  }

  return (
    <div className="w-full px-6 py-8 bg-white rounded-lg shadow-md mt-6">
      {/* Header Section */}
      <div
        className="flex items-center space-x-2 mb-6"
        onClick={() => navigate(-1)}
      >
        <button className="flex items-center justify-center bg-transparent text-gray-700 hover:bg-gray-100 py-1 px-3 border rounded-md">
          &#8592; {/* Left Arrow */}
        </button>
        <h1 className="text-xl font-semibold">Terms & Conditions</h1>
      </div>

      <div className="flex space-x-6 justify-between w-full">
        {/* Customer's Terms Editor */}
        <section className="border p-5 w-full">
          <header className="text-center font-bold text-xl">
            Customer&apos;s terms and conditions
          </header>
          <div className="mb-4">
            <JoditEditor
              id="customerContent"
              value={customerContent} // Bound to customer content, can be HTML
              onBlur={(newContent) => setCustomerContent(newContent)} // Get updated content from editor
              config={{
                buttons:
                  'bold,italic,underline,|,ul,ol,|,h1,h2,paragraph,|,align,|,image,link,|,source', // Configure editor
                height: 400,
                placeholder: 'Type anything...',
              }}
              className="border rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCustomerClear}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              onClick={handleCustomerSave}
              className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Save
            </button>
          </div>
        </section>

        {/* Client's Terms Editor */}
        <section className="border p-5 w-full">
          <header className="text-center font-bold text-xl">
            Client&apos;s terms and conditions
          </header>
          <div className="mb-4">
            <JoditEditor
              id="clientContent"
              value={clientContent} // Bound to client content, can be HTML
              onBlur={(clientContent) => setClientContent(clientContent)} // Get updated content from editor
              config={{
                buttons:
                  'bold,italic,underline,|,ul,ol,|,h1,h2,paragraph,|,align,|,image,link,|,source', // Configure editor
                height: 400,
                placeholder: 'Type anything...',
              }}
              className="border rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleClientClear}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              onClick={handleClientSave}
              className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Save
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TermsConditions
