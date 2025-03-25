import React, { useState, useEffect } from 'react'
import { Popover, Spin } from 'antd'
import { MdNotificationsNone } from 'react-icons/md'
import { GoDotFill } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { useGetProfileInformationQuery } from '../../Redux/profileApis'
import { url } from '../../Redux/server'
import {
  useGetAllNotificationsQuery,
  useReadAllNotificationsMutation,
} from '../../Redux/notificationApis'
import { useSocket } from './SocketContext'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const { data: profileData } = useGetProfileInformationQuery()

  const [notifications, setNotifications] = useState([]) 
  const [notificationComing, setNotificationComing] = useState('') 
  const [currentPage, setCurrentPage] = useState(1)
  const { socket } = useSocket()

  const {
    data: notificationsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllNotificationsQuery({
    page: currentPage,
    limit: 5,
  })
  // console.log(notificationsData);
  const [readAllNotification] = useReadAllNotificationsMutation()

  useEffect(() => {
    if (notificationsData?.data?.result) {
      setNotifications(notificationsData?.data?.result) 
      setNotificationComing(notificationsData?.data?.unseenNotificationCount)
    }
    if (socket) {
      socket.on('admin-notification', (notification) => {
        setNotificationComing(notification)
        setNotifications(notificationsData?.data?.result)
        refetch()
      })
    }
  }, [notificationsData, socket, refetch])

  const handleVisibleChange = (visible) => {
    setVisible(visible)
    // setNotificationComing('')
  }

  const handleAllAsRead = async () => {
    await readAllNotification().unwrap()
    setVisible(!visible)
  }

  const NotificationContent = () => {
    if (isLoading) {
      return (
        <div className="w-96 max-h-[500px] overflow-y-auto bg-white rounded-md shadow-md border">
          <Spin tip="Loading notifications..." />
        </div>
      )
    }

    if (isError) {
      return (
        <div className="w-96 max-h-[500px] overflow-y-auto bg-white rounded-md shadow-md border">
          <p>Failed to load notifications. Please try again later.</p>
        </div>
      )
    }

    return (
      <div className="w-96 max-h-[500px] overflow-y-auto bg-white rounded-md shadow-md border">
        <div className="border-b">
          <div className="p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <h1
              className="text-blue-500 text-sm hover:underline cursor-pointer "
              onClick={handleAllAsRead}
            >
              Mark all as read
            </h1>
          </div>
        </div>

        <div className="p-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="flex items-start gap-3 p-4 border-b last:border-none"
              >
                {notification.seen === true ? (
                  <>
                    <img
                      src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 bg-blue-100 py-3 flex gap-2">
                    <img
                      src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No new notifications</p>
          )}

          <div className="flex justify-end   py-1 ">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="py-2 px-4 rounded-md"
              disabled={currentPage === 1}
            >
              <FaArrowLeft
                style={{ color: currentPage === 1 ? 'gray' : 'black' }}
              />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="py-2 px-4 rounded-md"
              disabled={currentPage === notificationsData?.data?.meta.totalPage}
            >
              <FaArrowRight
                style={{
                  color:
                    currentPage === notificationsData?.data?.meta.totalPage
                      ? 'gray'
                      : 'black',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-between items-center bg-[#FFFFFF] p-3 rounded-md relative">
      <p className="text-2xl text-[#016A70]">Carenes Statistics</p>
      <div className="flex justify-end items-center gap-2">
        <Popover
          content={NotificationContent}
          trigger="click"
          placement="bottomRight"
          visible={visible}
          onVisibleChange={handleVisibleChange}
          overlayClassName="notification-popover"
        >
          <button className="text-2xl text-[#016A70] p-2 rounded-full border relative">
            <MdNotificationsNone />
            {notificationComing > 0 && (
              <div>
                <span className="absolute text-xs text-red-500 font-extrabold  p-0.5 rounded-full  right-[5%] top-[7%] ">
                  {notificationComing}
                </span>
              </div>
            )}
          </button>
        </Popover>

        <button className="flex justify-end gap-2 items-center border-2 rounded-md p-1 px-2">
          <img
            src={
              profileData?.data?.profile_image
                ? `${url}/${profileData?.data?.profile_image}`
                : 'https://placehold.co/400'
            }
            className="w-10 h-10 border rounded-full object-cover"
            alt=""
          />
          <Link to={`/profile`} className="text-left">
            <p className="text-sm font-semibold">{profileData?.data?.name}</p>
            <p className="text-xs text-gray-500">{profileData?.data?.email}</p>
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Navbar
