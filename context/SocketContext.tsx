'use client';

import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface iSocketContext {}

export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const session = useSession();
  const user = session.data?.user;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  console.log('Socket connected>>> ', isSocketConnected);

  // Initialise a new socket
  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // Listen for connection
  useEffect(() => {
    if (socket === null) return;

    function onConnect() {
      setIsSocketConnected(true);
      console.log('New Connection>>>');
    }
    function onDisconnect() {
      setIsSocketConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [socket]);

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (context === null) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};
