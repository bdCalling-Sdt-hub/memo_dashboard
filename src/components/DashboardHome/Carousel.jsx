import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { useGetMetaDataQuery } from '../../Redux/metaApis'
import { Spin } from 'antd'

const Carousel = () => {
  const { data: metaData, isLoading, isError } = useGetMetaDataQuery()

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin tip="Loading data..." />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p>Failed to load data. Please try again later.</p>
      </div>
    )
  }

  const data = [
    {
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/11497/11497765.png"
          alt="icon"
          className="w-10 h-10 mx-auto "
        />
      ),
      title: 'Total sales',
      value: `£${metaData?.data?.totalSales.toFixed(2) || 0}`,
      change: `${metaData?.data?.totalSalesChange == 'decrease' ? '↓' : '↑'} ${
        metaData?.data?.totalSalesChangePercentage
      }% vs last month`,
    },
    {
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/11497/11497765.png"
          alt="icon"
          className="w-10 h-10 mx-auto "
        />
      ),
      title: 'Profit on sales',
      value: `£${metaData?.data?.totalProfit.toFixed(2) || 0}`,
      change: `${
        metaData?.data?.totalProfitChangeType == 'decrease' ? '↓' : '↑'
      } ${metaData?.data?.totalProfitChangePercentage}% vs last month`,
    },
    {
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/1057/1057317.png"
          alt="icon"
          className="w-10 h-10 mx-auto "
        />
      ),
      title: 'Total services',
      value: `${metaData?.data?.totalService || 0} services`,
      change: `${metaData?.data?.serviceChangeType == 'decrease' ? '↓' : '↑'} ${
        metaData?.data?.serviceChangePercentage
      }% vs last month`,
    },

    {
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/10033/10033281.png"
          alt="icon"
          className="w-10 h-10 mx-auto "
        />
      ),
      title: 'Total clients',
      value: `${metaData?.data?.totalClient || 0}`,
      change: `${metaData?.data?.clientChangeType == 'decrease' ? '↓' : '↑'} ${
        metaData?.data?.clientChangePercentage
      }% vs last month`,
    },
    {
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/1999/1999625.png"
          alt="icon"
          className="w-10 h-10 mx-auto "
        />
      ),
      title: 'Total Customers',
      value: `${metaData?.data?.totalCustomer || 0}`,
      change: `${
        metaData?.data?.customerChangeType == 'decrease' ? '↓' : '↑'
      } ${metaData?.data?.customerChangePercentage}% vs last month`,
    },
  ]

  return (
    <div className="w-full px-6 mt-10 relative">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={4}
        spaceBetween={30}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-center p-6 bg-white rounded-lg  ">
              <div className="text-4xl mb-4 text-blue-500">{item.icon}</div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-2xl font-bold mt-2">{item.value}</p>
              <small
                className={`text-${
                  item.change.includes('↓') ? 'red' : 'green'
                }-500`}
              >
                {item.change}
              </small>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button className="swiper-button-next-custom absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
        </svg>
      </button>
    </div>
  )
}

export default Carousel
