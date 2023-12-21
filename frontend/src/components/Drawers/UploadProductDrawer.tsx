import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import UploadProductForm from '../Forms/UploadProductForm';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

export interface IFormInput {
  product_name: string;
  description: string;
  price: number;
  stock_quantity: number;
  user_id: number;
  category_id: number;
}

interface UploadProductDrawerProps {
  isOpenUploadDrawer: boolean;
  onCloseUploadDrawer: () => void;
  onOpenUploadDrawer: () => void;
}

export default function UploadProductDrawer({
  onCloseUploadDrawer,
  isOpenUploadDrawer,
}: UploadProductDrawerProps) {
  const [file, setFile] = useState<File | ''>('');
  const [srcImg, setSrcImg] = useState('');
  const userId = Cookies.get('userId');

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (values: IFormInput) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId || '');
    formData.append('product_name', values.product_name);
    formData.append('description', values.description);
    formData.append('price', values.price.toString());
    formData.append('stock_quantity', values.stock_quantity.toString());
    try {
      const result = await fetch('http://185.112.144.228:8000/upload-image', {
        headers: {
          contentType: 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        method: 'POST',
        body: formData,
      });
      if (!result.ok) {
        throw new Error('Error uploading product');
      }
      const data = await result.json();
      data;
    } catch (error) {
      console.error({ error });
    } finally {
      reset();
    }
  };

  useEffect(() => {
    file !== '' && setSrcImg(URL.createObjectURL(file as Blob));
    URL.revokeObjectURL(srcImg);
  }, [file]);

  return (
    <>
      <Drawer
        isOpen={isOpenUploadDrawer}
        placement="left"
        onClose={onCloseUploadDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Upload</DrawerHeader>

          <DrawerBody>
            <UploadProductForm
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              setFile={setFile}
              imgPreviewJSX={<img src={srcImg} />}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button
              className="cancel-upload-button"
              variant="outline"
              mr={3}
              onClick={onCloseUploadDrawer}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
