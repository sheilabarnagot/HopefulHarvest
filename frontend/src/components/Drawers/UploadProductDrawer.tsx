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

import { useRef, FormEvent, useState, useEffect } from 'react';

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
  const [file, setFile] = useState<File | ''>('');
  const [imageName, setImageName] = useState('');
  const [srcImg, setSrcImg] = useState('');
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    try {
      const result = await fetch('http://localhost:3000/api/images', {
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
      console.log(data);
    } catch (error) {
      console.error({ error });
    }
  };

  const getImage = async () => {
    try {
      const result = await fetch(`http://localhost:3000/images/${imageName}`);

      const blob = await result.blob();
      const imageUrl = URL.createObjectURL(blob);
      setSrcImg(imageUrl);
    } catch (error) {
      console.error({ error });
    }
  };

  console.log(srcImg);
  useEffect(() => {
    URL.revokeObjectURL(srcImg);
    imageName && getImage();
  }, [imageName]);
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
            {imageName && <img src={srcImg} />}
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
