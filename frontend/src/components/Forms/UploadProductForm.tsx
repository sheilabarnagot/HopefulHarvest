import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Button,
  Stack,
} from '@chakra-ui/react';
import { IFormInput } from '../Drawers/UploadProductDrawer';
import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from 'react-hook-form';

interface Props {
  handleSubmit: UseFormHandleSubmit<IFormInput>;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  isSubmitting: boolean;
  onSubmit: (values: IFormInput) => void;
  setFile: React.Dispatch<React.SetStateAction<File | ''>>;
  imgPreviewJSX: React.ReactNode;
}

export default function UploadProductForm({
  handleSubmit,
  register,
  onSubmit,
  errors,
  imgPreviewJSX,
  isSubmitting,
  setFile,
}: Props) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <FormControl isInvalid={!!errors.product_name}>
          <FormLabel>Produkt namn</FormLabel>
          <FormErrorMessage id="edit-user-product_name-error">
            {errors.product_name && errors.product_name.message}
          </FormErrorMessage>
          <Input
            id="edit-user-product_name"
            placeholder="Produkt namn"
            {...register('product_name', {
              minLength: {
                value: 2,
                message: 'Minimum length should be 2',
              },
            })}
          />
        </FormControl>
        <FormControl isInvalid={!!errors.price}>
          <FormLabel marginTop={2}>Pris</FormLabel>
          <FormErrorMessage id="edit-user-price-error">
            {errors.price && errors.price.message}
          </FormErrorMessage>
          <Input
            id="edit-user-price"
            placeholder="Beskrivning"
            {...register('price')}
          />
        </FormControl>
        <FormControl isInvalid={!!errors.stock_quantity}>
          <FormLabel marginTop={2}>Kvantitet av produkten</FormLabel>
          <FormErrorMessage id="edit-user-stock_quantity-error">
            {errors.stock_quantity && errors.stock_quantity.message}
          </FormErrorMessage>
          <Input
            id="edit-user-stock_quantity"
            placeholder="Kvantitet i lager"
            {...register('stock_quantity')}
          />
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
          <FormLabel marginTop={2}>Beskrivning</FormLabel>
          <FormErrorMessage id="edit-user-description-error">
            {errors.description && errors.description.message}
          </FormErrorMessage>
          <Textarea
            id="edit-user-description"
            placeholder="Beskrivning"
            {...register('description', {
              minLength: {
                value: 2,
                message: 'Minimum length should be 2',
              },
            })}
          />
        </FormControl>
        <FormLabel marginTop={2} marginBottom={0}>
          Ladda upp bild
        </FormLabel>
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
        {imgPreviewJSX}
        <Button isLoading={isSubmitting} type="submit">
          Publicera
        </Button>
      </Stack>
    </form>
  );
}
