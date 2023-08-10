import ShippingAddressModal from '@/app/components/shipping-address/ShippingAddressModal';
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useForm } from '@mantine/form';
import { BiPlus } from 'react-icons/bi';
import { IAddressFormValues } from '../../user/addresses/UserAddresses';
import {
  IAddress,
  createUserAddress,
  updateUserAddress,
} from '@/graphql/users';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as yup from 'yup';
import * as _ from 'lodash';
import { IFormattedResponse } from '@/graphql/apollo-client';
import { IGovernment } from '@/graphql/governments';

interface IShippingAddressProps {
  governments: IGovernment[];
  addresses: IAddress[];
  setAddresses: Dispatch<SetStateAction<IAddress[]>>;
  selectedAddressId: string;
  setSelectedAddressId: Dispatch<SetStateAction<string>>;
}

const ShippingAddress = ({
  governments,
  addresses,
  setAddresses,
  selectedAddressId,
  setSelectedAddressId,
}: IShippingAddressProps) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [addressToEdit, setAddressToEdit] = useState<IAddress | null>(null);

  const {
    isOpen: isAddressFormModalOpen,
    onOpen: onOpenAddressFormModal,
    onClose: onCloseAddressFormModal,
  } = useDisclosure();
  const toast = useToast();

  const addressForm = useForm<IAddressFormValues>({
    initialValues: {
      governmentId: 0,
      city: '',
      street: '',
      phone: '',
    },
    validate: {
      governmentId: (value) =>
        yup.number().integer().positive().required().isValidSync(value)
          ? null
          : 'invalid government',

      city: (value) =>
        yup.string().required().isValidSync(value) ? null : 'invalid city',

      street: (value) =>
        yup.string().required().isValidSync(value) ? null : 'invalid street',

      phone: (value) =>
        yup.string().length(11).required().isValidSync(value)
          ? null
          : 'invalid phone',
    },
  });

  const handleOpenAddressModal = (address: IAddress) => {
    setAddressToEdit(address);
    addressForm.setValues(_.omit(address, ['id', 'government']));
    onOpenAddressFormModal();
  };

  const handleCloseAddressModal = () => {
    onCloseAddressFormModal();
    addressForm.reset();
    setAddressToEdit(null);
  };

  const handleSubmitAddress = async () => {
    addressForm.validate();
    if (addressForm.isValid()) {
      setIsSaving(true);
      let response: IFormattedResponse<IAddress>;
      if (addressToEdit) {
        response = await updateUserAddress(
          addressToEdit.id,
          addressForm.values
        );
      } else {
        response = await createUserAddress(addressForm.values);
      }
      if (response?.error) {
        toast({
          position: 'top-right',
          title: 'حدث خطأ',
          description: 'من فضلك أدخل بيانات صحيحة',
          status: 'error',
          variant: 'left-accent',
        });
      } else {
        if (addressToEdit) {
          setAddresses((currentAddresses) =>
            currentAddresses.map((address) =>
              address.id === addressToEdit.id
                ? { ...address, ...response.data }
                : address
            )
          );
        } else {
          setAddresses((currentAddresses) => [
            ...currentAddresses,
            response.data!,
          ]);
          setSelectedAddressId(response.data!.id.toString());
        }
        toast({
          position: 'top-right',
          title: `تم ${addressToEdit ? 'تعديل' : 'إضافة'} العنوان`,
          description: `تم ${addressToEdit ? 'تعديل' : 'إضافة'} العنوان بنجاح`,
          status: 'success',
          variant: 'left-accent',
        });
      }
      setIsSaving(false);
      handleCloseAddressModal();
    }
  };

  return (
    <Stack>
      <Heading as='h3' fontSize='md'>
        العنوان
      </Heading>
      <Divider />
      <RadioGroup
        shadow='sm'
        bg='bgPrimary'
        rounded='lg'
        value={selectedAddressId}
        onChange={setSelectedAddressId}>
        {addresses.map(
          ({ id, government, governmentId, city, street, phone }) => (
            <HStack key={id} p='2' justifyContent='space-between'>
              <Radio value={id.toString()}>
                {[government.name, city, street, phone].join('، ')}
              </Radio>
              <Button
                variant='link'
                colorScheme='blue'
                size='sm'
                fontSize='sm'
                fontWeight='normal'
                onClick={() =>
                  handleOpenAddressModal({
                    id,
                    governmentId,
                    government,
                    city,
                    street,
                    phone,
                  })
                }>
                تعديل
              </Button>
            </HStack>
          )
        )}
      </RadioGroup>
      {Boolean(addresses.length) && <Divider />}
      <Box>
        <Button
          display='flex'
          variant='link'
          colorScheme='blue'
          size='sm'
          fontSize='sm'
          fontWeight='normal'
          justifyContent='center'
          alignItems='center'
          leftIcon={<Icon as={BiPlus} boxSize={5} />}
          onClick={onOpenAddressFormModal}>
          إضافة عنوان جديد
        </Button>
      </Box>
      <ShippingAddressModal
        isOpen={isAddressFormModalOpen}
        onClose={handleCloseAddressModal}
        form={addressForm}
        onSave={handleSubmitAddress}
        governments={governments}
        valueToEdit={addressToEdit}
        isSaving={isSaving}
      />
    </Stack>
  );
};

export default ShippingAddress;
