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
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import UploadProductDrawer from './UploadProductDrawer';

interface DashboardDrawerProps {
  isOpenDashboardDrawer: boolean;
  onCloseDashboardDrawer: () => void;
  onOpenDashboardDrawer: () => void;
  onOpenUploadDrawer: () => void;
  isOpenUploadDrawer: boolean;
  onCloseUploadDrawer: () => void;
}

export default function DashboardDrawer({
  onOpenDashboardDrawer,
  isOpenDashboardDrawer,
  onCloseDashboardDrawer,
  onOpenUploadDrawer,
  isOpenUploadDrawer,
  onCloseUploadDrawer,
}: DashboardDrawerProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <Button
        id="open-dashboard-drawer"
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpenDashboardDrawer}>
        Open
      </Button>
      <Drawer
        isOpen={isOpenDashboardDrawer}
        placement="left"
        onClose={onCloseDashboardDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton id="drawer-close-button" />
          <DrawerHeader>My Dashboard</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
            <div className="mt-10">
              <Menu>
                <MenuItem>My Products</MenuItem>
                <MenuItem>Sold Products</MenuItem>
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
                <MenuItem to="/" as={NavLink}>
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
