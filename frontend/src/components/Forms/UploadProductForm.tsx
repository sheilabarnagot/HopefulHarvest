import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';
import { IFormInput } from '../Drawers/UploadProductDrawer';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormReset,
  UseFormHandleSubmit,
} from 'react-hook-form';

interface Props {
  handleSubmit: UseFormHandleSubmit<IFormInput>;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  reset: UseFormReset<IFormInput>;
  setError: UseFormSetError<IFormInput>;
  isSubmitting: boolean;
  onSubmit: (values: IFormInput) => void;
}

export default function UploadProductForm({
  handleSubmit,
  register,
  onSubmit,
  errors,
  reset,
  setError,
  isSubmitting,
}: Props) {
  return (
    <>
      <form>
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
          <FormLabel>Pris</FormLabel>
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
          <FormLabel>Kvantitet av produkten</FormLabel>
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
          <FormLabel>Beskrivning</FormLabel>
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
      </form>
    </>
  );
}
