import Carousel from '../components/DashboardHome/Carousel'
import SalesOverview from '../components/DashboardHome/SalesOverview'
import RecentCustomer from '../components/DashboardHome/RecentCustomer'
import ShopsRegistration from '../components/DashboardHome/ShopsRegistration'

const DashboardHome = () => {
  return (
    <div>
      <Carousel />
      <div className="flex space-x-8 p-6">
        {/* Sales Overview with custom width and height */}
        <div className="flex-1 bg-white p-6 rounded-lg card-shadow">
          <SalesOverview width="80%" height="200px" />
        </div>
        {/* Recent Customers Component */}
        <div className="w-80 bg-white p-6 rounded-lg card-shadow">
          <RecentCustomer />
        </div>
      </div>
      <div className="p-6">
        <div className=" bg-white p-6 rounded-lg card-shadow">
          <ShopsRegistration />
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
