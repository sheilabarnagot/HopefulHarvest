import DashboardDrawer from '../components/Drawers/DashboardDrawer';
import { DashboardSoldPerMonthChart } from '../components/Charts/DashboardSoldPerMonthChart';
import { useDisclosure } from '@chakra-ui/react';
import Cookies from 'js-cookie';

export default function UserDashboard() {
  const token = Cookies.get('token');
  const {
    isOpen: isOpenDasboardDrawer,
    onOpen: onOpenDashboardDrawer,
    onClose: onCloseDashboardDrawer,
  } = useDisclosure({
    defaultIsOpen: true,
  });
  console.log(token);
  const {
    isOpen: isOpenUploadDrawer,
    onOpen: onOpenDUploadDrawer,
    onClose: onCloseDUploadDrawer,
  } = useDisclosure();
  return (
    <>
      <DashboardDrawer
        onOpenDashboardDrawer={onOpenDashboardDrawer}
        isOpenDashboardDrawer={isOpenDasboardDrawer}
        onCloseDashboardDrawer={onCloseDashboardDrawer}
        onOpenUploadDrawer={onOpenDUploadDrawer}
        isOpenUploadDrawer={isOpenUploadDrawer}
        onCloseUploadDrawer={onCloseDUploadDrawer}
      />
      <DashboardSoldPerMonthChart />
    </>
  );
}
