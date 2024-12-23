// import { Button } from '../../button';
// import { deleteAddress } from '../../../lib/actions';
// import { useState } from 'react';
// import UpdateAddress from './update-address-form';

// export default function AddressCard({
//   address,
//   isAllowDelete,
// }: {
//   address: any;
//   isAllowDelete: boolean;
// }) {
//   const [isEdit, setEdit] = useState(false);
//   const onClose = () => setEdit(false);
//   const onEdit = () => setEdit(true);

//   if (isEdit) return <UpdateAddress address={address} onClose={onClose} />;

//   return (
//     <AddressInfo
//       address={address}
//       onEdit={onEdit}
//       isAllowDelete={isAllowDelete}
//     />
//   );
// }

// function AddressInfo({
//   address,
//   onEdit,
//   isAllowDelete,
// }: {
//   address: any;
//   onEdit: () => void;
//   isAllowDelete: boolean;
// }) {
//   return (
//     <div key={address.id} className={`border rounded-md shadow-md p-4 mt-4`}>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-gray-700">Страна</label>
//           <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-default">
//             {address.country}
//           </p>
//         </div>
//         <div>
//           <label className="block text-gray-700">Город</label>
//           <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-default">
//             {address.city}
//           </p>
//         </div>
//         <div>
//           <label className="block text-gray-700">Улица</label>
//           <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-default">
//             {address.street}
//           </p>
//         </div>
//         <div>
//           <label className="block text-gray-700">Дом</label>
//           <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-default">
//             {address.home}
//           </p>
//         </div>
//         <div>
//           <label className="block text-gray-700">
//             Номер квартиры или офиса
//           </label>
//           <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-default">
//             {address.apartmentORoffice}
//           </p>
//         </div>
//       </div>
//       <div className="flex flex-col justify-end items-end space-y-2 mt-4">
//         {isAllowDelete && <DeleteAddress id={address.id} />}
//         <EditAddress onEdit={onEdit} />
//       </div>
//     </div>
//   );
// }

// function DeleteAddress({ id }: { id: string }) {
//   const handleDelete = async () => {
//     try {
//       await deleteAddress(id);
//       // console.log(`Адрес для доставки с ID ${id} успешно удален`); //TODO
//     } catch (error) {
//       // console.error('Ошибка при удалении адреса для доставки:', error); //TODO
//     }
//   };

//   return (
//     <Button
//       className="rounded-md bg-neutral-950 text-white hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4"
//       onClick={handleDelete}
//     >
//       Удалить адрес
//     </Button>
//   );
// }

// function EditAddress({ onEdit }: { onEdit: () => void }) {
//   return (
//     <Button
//       className="rounded-md bg-neutral-950 text-white hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4"
//       onClick={onEdit}
//     >
//       Изменить адрес
//     </Button>
//   );
// }
