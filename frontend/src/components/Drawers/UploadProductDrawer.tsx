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
import { useRef } from 'react';

interface UploadProductDrawerProps {
  isOpenUploadDrawer: boolean;
  onCloseUploadDrawer: () => void;
  onOpenUploadDrawer: () => void;
}

export default function UploadProductDrawer({
  onCloseUploadDrawer,
  isOpenUploadDrawer,
  onOpenUploadDrawer,
}: UploadProductDrawerProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpenUploadDrawer}>
        Open
      </Button>
      <Drawer
        isOpen={isOpenUploadDrawer}
        placement="left"
        onClose={onCloseUploadDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Upload</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
            <div className="mt-10">
              <Menu>
                <MenuItem>My Products</MenuItem>
                <MenuItem onClick={onCloseUploadDrawer}>Sold Products</MenuItem>
                <MenuItem>Upload Product</MenuItem>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <MenuItem>Profile</MenuItem>
              </Menu>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onCloseUploadDrawer}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
