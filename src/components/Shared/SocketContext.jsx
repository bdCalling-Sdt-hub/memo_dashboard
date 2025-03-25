import React, { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { url } from '../../Redux/server'
import { jwtDecode } from 'jwt-decode'

const SocketContext = createContext({
  socket: null,
  onlineUser: [],
})

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [onlineUser, setOnlineUser] = useState([])
  const [id, setId] = useState('')
  
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken === null) return
    const decoded = jwtDecode(savedToken)
    if (savedToken) {
      setId(decoded.id)
    }
  }, [])

  useEffect(() => {
    if (!id) return

    const socketConnection = io(`${url}`, {
      query: {
        id: id,
      },
    })

    socketConnection.on('onlineUser', (data) => {
      setOnlineUser(data)
    })

    setSocket(socketConnection)

    return () => {
      socketConnection.disconnect()
    }
  }, [id])

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  )
}
