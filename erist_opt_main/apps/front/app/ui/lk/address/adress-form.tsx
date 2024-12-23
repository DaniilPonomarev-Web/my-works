// 'use client';

// import React, { useState } from 'react';

// import AddressCard from './address-card';
// import { useFormStatus } from 'react-dom';
// import { Button } from '../../button';
// // import AddAddressForm from './add-address-form';

// export default function AddressInfoForm({ addresses }: { addresses: any[] }) {
//   const [isAdd, setAdd] = useState(false);
//   const onAdd = () => setAdd(true);
//   const onClose = () => setAdd(false);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Адреса для доставки</h2>
//       {addresses.map((address: any, index: number) => (
//         <AddressCard
//           key={index}
//           address={address}
//           isAllowDelete={addresses.length > 1}
//         />
//       ))}
//       {isAdd ? (
//         <AddAddressForm onClose={onClose} />
//       ) : (
//         <AddAddress onAction={onAdd} />
//       )}
//     </div>
//   );
// }

// function AddAddress({ onAction }: { onAction: () => void }) {
//   const { pending } = useFormStatus();

//   return (
//     <Button
//       className="ml-auto mt-2 rounded-md bg-neutral-950 text-white hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4"
//       aria-disabled={pending}
//       onClick={onAction}
//     >
//       Добавить новый адрес
//     </Button>
//   );
// }
