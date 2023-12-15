import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Menu,
  MenuItem,
  Divider,
} from '@chakra-ui/react';
import { UserInfo } from '../../pages/UserDashboard';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import UploadProductDrawer from './UploadProductDrawer';

interface DashboardDrawerProps {
  isOpenDashboardDrawer: boolean;
  userId: string | undefined;
  onCloseDashboardDrawer: () => void;
  onOpenDashboardDrawer: () => void;
  onOpenUploadDrawer: () => void;
  isOpenUploadDrawer: boolean;
  onCloseUploadDrawer: () => void;
  userInfo: UserInfo | undefined;
}

export default function DashboardDrawer({
  onOpenDashboardDrawer,
  isOpenDashboardDrawer,
  onCloseDashboardDrawer,
  onOpenUploadDrawer,
  isOpenUploadDrawer,
  onCloseUploadDrawer,
  userInfo,
  userId,
}: DashboardDrawerProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <div className="flex w-full justify-center">
        <Button
          id="open-dashboard-drawer"
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpenDashboardDrawer}>
          settings
        </Button>
      </div>
      <Drawer
        isOpen={isOpenDashboardDrawer}
        placement="left"
        onClose={onCloseDashboardDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton id="drawer-close-button" />
          <DrawerHeader>
            Welcome, {userInfo && userInfo.user && userInfo.user.username}!
          </DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
            <div className="mt-10">
              <Menu>
                <MenuItem>My Products</MenuItem>
                <MenuItem
                  onClick={onCloseDashboardDrawer}
                  as={NavLink}
                  to="profile/users/chart">
                  Sold Products
                </MenuItem>
                <MenuItem
                  className="upload-product-button"
                  onClick={() => {
                    onCloseDashboardDrawer();
                    onOpenUploadDrawer();
                  }}>
                  Upload Product
                </MenuItem>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <MenuItem
                  className="profile-button"
                  onClick={onCloseDashboardDrawer}
                  to={`profile/users/${userId}`}
                  as={NavLink}>
                  Profile
                </MenuItem>
              </Menu>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onCloseDashboardDrawer}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <UploadProductDrawer
        onOpenUploadDrawer={onOpenUploadDrawer}
        isOpenUploadDrawer={isOpenUploadDrawer}
        onCloseUploadDrawer={onCloseUploadDrawer}
      />
    </>
  );
}
