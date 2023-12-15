import DashboardDrawer from '../components/Drawers/DashboardDrawer';
import { useDisclosure } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Logout from '../logout';

export interface UserInfo {
  user: {
    user_id: number;
    username: string;
    email: string;
  };
}
export default function UserDashboard() {
  // const token = Cookies.get('token');
  const {
    isOpen: isOpenDasboardDrawer,
    onOpen: onOpenDashboardDrawer,
    onClose: onCloseDashboardDrawer,
  } = useDisclosure({
    defaultIsOpen: true,
  });
  const {
    isOpen: isOpenUploadDrawer,
    onOpen: onOpenDUploadDrawer,
    onClose: onCloseDUploadDrawer,
  } = useDisclosure();
  const userId = Cookies.get('userId');

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
  const getUserInformation = async () => {
    try {
      const response = await fetch('http://localhost:3000/protected', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      const result = await response.json();

      Cookies.set('userId', result.user.user_id, {
        expires: 7,
        secure: false,
        sameSite: 'strict',
      });
      setUserInfo(result);
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  useEffect(() => {
    getUserInformation();
  }, []);

  return (
    <>
      <h2>hi {userInfo && userInfo.user && userInfo.user.username}</h2>
      <DashboardDrawer
        userInfo={userInfo}
        userId={userId}
        onOpenDashboardDrawer={onOpenDashboardDrawer}
        isOpenDashboardDrawer={isOpenDasboardDrawer}
        onCloseDashboardDrawer={onCloseDashboardDrawer}
        onOpenUploadDrawer={onOpenDUploadDrawer}
        isOpenUploadDrawer={isOpenUploadDrawer}
        onCloseUploadDrawer={onCloseDUploadDrawer}
      />
      <Outlet />
      <Logout />
    </>
  );
}
