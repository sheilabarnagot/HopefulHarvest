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
import { useForm, SubmitHandler } from 'react-hook-form';
import UploadProductForm from '../Forms/UploadProductForm';
import Cookies from 'js-cookie';
import { FormEvent, useState, useEffect } from 'react';

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
  const [imageName, setImageName] = useState('');
  const [srcImg, setSrcImg] = useState('');
  const userId = Cookies.get('userId');

  const {
    handleSubmit,
    register,
    reset,
    setError,
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
      const result = await fetch('http://localhost:3000/upload-image', {
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
    }
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId || '');
    try {
      const result = await fetch('http://localhost:3000/upload-image', {
        headers: {
          contentType: 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        method: 'POST',
        body: formData,
      });
      if (!result.ok) {
        throw new Error('Error uploading image');
      }
      const data = await result.json();
      setImageName(data.imageName);
      data;
    } catch (error) {
      console.error({ error });
    }
  };

  const getImage = async () => {
    try {
      const result = await fetch(
        `http://localhost:3000/get-image/${imageName}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );

      const blob = await result.blob();
      const imageUrl = URL.createObjectURL(blob);
      setSrcImg(imageUrl);
    } catch (error) {
      console.error({ error });
    }
  };

  srcImg;
  useEffect(() => {
    URL.revokeObjectURL(srcImg);
    URL.revokeObjectURL(file as string);
    imageName && getImage();
  }, [imageName]);
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
              reset={reset}
              setError={setError}
              errors={errors}
              isSubmitting={isSubmitting}
              setFile={setFile}
              imgPreviewJSX={
                file !== '' && <img src={URL.createObjectURL(file as Blob)} />
              }
            />
            {/* <form onSubmit={submit}>
              <div className="flex flex-col">
                <label htmlFor="image">Ladda upp en bild av produkten</label>
                <Input
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
            </form> */}
            {imageName && <img src={srcImg} />}
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
