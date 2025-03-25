import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../Layout/Dashboard'
import DashboardHome from '../Pages/DashboardHome'
import Shops from '../Pages/Shops'
import Services from '../Pages/Services'
import ShopDetails from '../Pages/ShopDetails'
import Products from '../Pages/Products'
import Customers from '../Pages/Customers'
import Staff from '../Pages/Staff'
import CategoryDetails from '../Pages/CategoryDetails'
import Category from '../Pages/Category'
import PayOnShop from '../Pages/PayOnShop'
import Transaction from '../Pages/Transaction'
import TermsConditions from '../Pages/TermsConditions'
import PrivacyPolicy from '../Pages/PrivacyPolicy'
import RecentCustomers from '../Pages/RecentCustomers'
// aa
import Profile from '../Pages/Profile'
import ChangePassword from '../Pages/ChangePassword'
import Login from '../Pages/auth/Login'
import ForgetPassword from '../Pages/auth/ForgetPassword'
import ResetPassword from '../Pages/auth/ResetPassword'
import AdminRoute from '../ProtectedRoute/AdminRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: '/shops',
        element: <Shops />,
      },
      {
        path: '/change-password',
        element: <ChangePassword />,
      },
      {
        path: '/services',
        element: <Services />,
      },
      {
        path: '/recent-customers',
        element: <RecentCustomers />,
      },
      {
        path: '/services/:id',
        element: <CategoryDetails />,
      },
      {
        path: '/shop-details/:id',
        element: <ShopDetails />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/customers',
        element: <Customers />,
      },
      {
        path: '/staff',
        element: <Staff />,
      },
      {
        path: '/categories',
        element: <Category />,
      },
      {
        path: '/pay-on-shop',
        element: <PayOnShop />,
      },
      {
        path: '/transaction',
        element: <Transaction />,
      },
      {
        path: '/terms-&-conditions',
        element: <TermsConditions />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forget-password',
    element: <ForgetPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
])
export default router
