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
  } = useDisclosure();
  const {
    isOpen: isOpenUploadDrawer,
    onOpen: onOpenDUploadDrawer,
    onClose: onCloseDUploadDrawer,
  } = useDisclosure();
  const userId = Cookies.get('userId');

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
  const getUserInformation = async () => {
    try {
      const response = await fetch('http:///185.112.144.228:8000/protected', {
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
      <div className="text-center text-2xl my-4">
        {userInfo && userInfo.user && (
          <p id="dashboard-welcome">hi {userInfo.user.username}</p>
        )}
      </div>
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
