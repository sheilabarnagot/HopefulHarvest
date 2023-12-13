import DashboardDrawer from '../components/Drawers/DashboardDrawer';
import { DashboardSoldPerMonthChart } from '../components/Charts/DashboardSoldPerMonthChart';
import { useDisclosure } from '@chakra-ui/react';

export default function UserDashboard() {
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