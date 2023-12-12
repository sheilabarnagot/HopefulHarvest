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
} from '@chakra-ui/react';

import { useRef, FormEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
interface UploadProductDrawerProps {
  isOpenUploadDrawer: boolean;
  onCloseUploadDrawer: () => void;
  onOpenUploadDrawer: () => void;
}

interface IFormInput {
  name: string; // required field
  species: string; // required field
  breed: string;
  color: string;
  age: number;
  lastSeen: string;
  description: string;
  owner_id: number;
}

export default function UploadProductDrawer({
  onCloseUploadDrawer,
  isOpenUploadDrawer,
  onOpenUploadDrawer,
}: UploadProductDrawerProps) {
  const [file, setFile] = useState<File | ''>('');
  const [imageName, setImageName] = useState('');
  const [srcImg, setSrcImg] = useState('');
  const [closeAndNextAction, setCloseAndNextAction] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    try {
      const result = await fetch('http://localhost:8080/api/images', {
        headers: {
          contentType: 'multipart/form-data',
        },
        method: 'POST',
        body: formData,
      });
      if (!result.ok) {
        throw new Error('Error uploading image');
      }
      const data = await result.json();
      setImageName(data.imageName);
    } catch (error) {
      console.error({ error });
    } finally {
      setCloseAndNextAction(true);
    }
  };
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
            <form onSubmit={submit}>
              <div className="flex flex-col">
                <input
                  className="text-sm text-stone-500
            file:mr-5 file:py-1 file:px-3 file:border-[1px]
            file:text-xs file:font-medium
            file:bg-stone-50 file:text-stone-700
            hover:file:cursor-pointer hover:file:bg-blue-50
            hover:file:text-blue-700 border-0"
                  onChange={e => e.target.files && setFile(e.target.files[0])}
                  placeholder="Here is a sample placeholder"
                  type="file"
                />
                <Button type="submit">Ladda upp bild</Button>
              </div>
            </form>
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
