import {
  Table,
  Input,
  Button,
  Switch,
  Popconfirm,
  message,
  Spin,
  Modal,
  Upload,
  Image,
} from 'antd'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetMyCategoriesQuery,
  useUpdateCategoryMutation,
} from '../Redux/categoryApis'
import { useState } from 'react'
import { url } from '../Redux/server'

const Category = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10) // Default page size

  // Get all categories from the backend
  const {
    data: categoryData,
    isLoading,
    isError,
  } = useGetMyCategoriesQuery({
    page: currentPage,
    limit: pageSize,
  })
  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const [newCategory, setNewCategory] = useState('') // Local state for new category name
  const [image, setImage] = useState(null) // Local state for the image file
  const [imageUrl, setImageUrl] = useState('') // To show the uploaded image
  const [isModalVisible, setIsModalVisible] = useState(false) // Modal visibility for adding new category

  // Loading and error state handling
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

  // Handle Delete Category
  const handleDelete = (id) => {
    deleteCategory(id)
      .unwrap()
      .then(() => {
        message.success('Category deleted successfully')
      })
      .catch((error) => {
        message.error('Failed to delete category')
      })
  }

  // Handle Add Category with FormData
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      message.error('Category name cannot be empty')
      return
    }

    const formData = new FormData()
    formData.append('categoryName', newCategory) // Append the category name to FormData
    if (image) {
      formData.append('shop_category_image', image) // Append the selected image to FormData
    }

    createCategory(formData)
      .unwrap()
      .then((response) => {
        message.success('Category added successfully')
        setNewCategory('') // Clear the input field
        setImage(null) // Clear the selected image
        setImageUrl('') // Clear the image url
        setIsModalVisible(false) // Close the modal
      })
      .catch((error) => {
        message.error('Failed to add category')
      })
  }

  // Handle Update Category Status (visibility)
  const handleVisibilityToggle = (id, visible) => {
    const updatedStatus = visible ? 'active' : 'inactive' // Toggle between active and inactive status
    updateCategory({ id, data: { status: updatedStatus } })
      .unwrap()
      .then(() => {
        message.success(`Category status updated to ${updatedStatus}`)
      })
      .catch((error) => {
        message.error('Failed to update category status')
      })
  }

  // Prepare table data with serial index
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text, record, index) => (
        <span className="text-gray-500">{index + 1}</span>
      ),
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Category Image',
      dataIndex: 'categoryImage',
      key: 'categoryImage',
      render: (text, record) => {
        return (
          <Image.PreviewGroup>
            <Image
              src={record.categoryImage}
              alt={record.categoryName}
              width={50}
              height={50}
              preview={{
                src: record.categoryImage,
              }}
              style={{
                cursor: 'pointer',
                backgroundSize: 'contain',
                objectFit: 'contain',
              }}
            />
          </Image.PreviewGroup>
        )
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Switch
          checked={status === 'active'}
          onChange={(checked) => handleVisibilityToggle(record.key, checked)}
          checkedChildren="unhide"
          unCheckedChildren="hide"
        />
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this category?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined
            className="text-red-500 cursor-pointer hover:text-red-700"
            style={{ fontSize: '18px' }}
          />
        </Popconfirm>
      ),
    },
  ]

  const data = categoryData?.data?.result.map((category, index) => ({
    key: category._id,
    index: index + 1,
    categoryName: category.categoryName || 'Not provided',
    categoryImage: category.image
      ? `${url}/${category.image}`
      : `https://cdn-icons-png.flaticon.com/512/149/149071.png`,
    status: category.status,
  }))

  return (
    <div className="w-full py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <Button
            icon={<FaArrowLeft />}
            className="bg-transparent text-gray-700 hover:bg-gray-100 py-1 border rounded-md"
          />
          <h1 className="text-xl font-semibold">
            Categories ({categoryData?.data?.meta?.total})
          </h1>
        </div>
        {/* Add Category Section */}
        <div>
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            className="mb-4"
          >
            + Add new category
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: categoryData?.data?.meta?.total,
          onChange: (page) => setCurrentPage(page),
          position: ['bottomCenter'],
          defaultPageSize: 10,
          showSizeChanger: false,
          nextIcon: (
            <Button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md border">
              Next <FaArrowRight />
            </Button>
          ),
          prevIcon: (
            <Button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md border">
              <FaArrowLeft /> Previous
            </Button>
          ),
        }}
        bordered
        rowClassName="text-sm"
      />

      {/* Modal for Adding Category */}
      <Modal
        title="Add New Category"
        visible={isModalVisible}
        onOk={handleAddCategory}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddCategory}>
            Save
          </Button>,
        ]}
      >
        <div className="mb-4">
          <label>Category Name</label>
          <Input
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div>Category Image</div>
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              setImage(file)
              const reader = new FileReader()
              reader.onload = () => {
                setImageUrl(reader.result)
              }
              reader.readAsDataURL(file) // Set the image preview
              return false // Prevent default upload behavior
            }}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </div>
        {/* Show Image Preview */}
        {imageUrl && (
          <div className="mb-4">
            <Image src={imageUrl} alt="Uploaded Image" width={100} />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Category
