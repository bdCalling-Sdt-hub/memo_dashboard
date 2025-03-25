import {
  FaHome,
  FaStore,
  FaCogs,
  FaUsers,
  FaUserTie,
  FaTags,
  FaFileAlt,
  FaShieldAlt,
  FaSignOutAlt,
} from 'react-icons/fa'
import { HiArrowTrendingUp } from 'react-icons/hi2'
import { RiSettingsFill } from 'react-icons/ri'
import { NavLink, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const menuItems = [
    { name: 'Home', link: '/', icon: <FaHome /> },
    { name: 'Shops', link: '/shops', icon: <FaStore /> },
    {
      name: 'Services',
      link: `/services`,
      icon: <FaCogs />,
    },
    // { name: 'Products', link: '/products', icon: <FaBoxOpen /> },
    { name: 'Customers', link: '/customers', icon: <FaUsers /> },
    { name: 'Staff', link: '/staff', icon: <FaUserTie /> },
    { name: 'Categories', link: '/categories', icon: <FaTags /> },
    { name: 'Pay on Shop', link: '/pay-on-shop', icon: <RiSettingsFill /> },
    { name: 'Transaction', link: '/transaction', icon: <HiArrowTrendingUp /> },
    {
      name: 'Terms & Conditions',
      link: '/terms-&-conditions',
      icon: <FaFileAlt />,
    },
    { name: 'Privacy Policy', link: '/privacy-policy', icon: <FaShieldAlt /> },
  ]
  const navigate = useNavigate()
  const handleLogout = () => {
    // Add your logout logic here, e.g., clearing session, redirecting, etc.
    localStorage.removeItem('token')
    navigate('/login')
    // For example, if using localStorage for auth:
    // localStorage.removeItem('authToken');
    // Or redirecting to the login page:
    // window.location.href = '/login';
  }

  return (
    <div className="bg-[#016A70] w-[250px] h-[96vh] overflow-y-scroll px-3">
      <h2 className="text-white text-center py-6 text-3xl font-semibold">
        CARENES
      </h2>
      <ul className="text-white">
        {menuItems.map((item, index) => (
          <NavLink
            to={item?.link}
            key={index}
            className="flex items-center py-3 rounded-3xl my-1 pl-6 hover:bg-[#014F56] cursor-pointer hover:text-white"
          >
            <span className="mr-4 text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center py-4 pl-6 text-white cursor-pointer rounded-lg"
        >
          <FaSignOutAlt className="mr-4 text-xl" />
          Logout
        </button>
      </ul>
    </div>
  )
}

export default Sidebar
