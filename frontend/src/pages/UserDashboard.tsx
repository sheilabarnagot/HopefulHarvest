import DashboardDrawer from '../components/Drawers/DashboardDrawer';
import { DashboardSoldPerMonthChart } from '../components/Charts/DashboardSoldPerMonthChart';
import { Button, useDisclosure } from '@chakra-ui/react';

export default function UserDashboard() {
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
