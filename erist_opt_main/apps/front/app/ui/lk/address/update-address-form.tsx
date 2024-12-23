// import { useFormState, useFormStatus } from 'react-dom';
// import { Button } from '../../button';
// import { updateAddress } from '../../../lib/actions';
// import { useEffect } from 'react';
// import { toast } from '@erist-opt/shadcn/components/ui/use-toast';

// export default function UpdateAddress({
//   address,
//   onClose,
// }: {
//   address: any;
//   onClose: () => void;
// }) {
//   const updateAddressWithId = updateAddress.bind(null, address.id);
//   const initialState = { success: false, message: null, errors: null } as any;
//   const [state, dispatch] = useFormState(updateAddressWithId, initialState);

//   useEffect(() => {
//     if (state.success) {
//       onClose();
//       toast({
//         title: state.message,
//         duration: 1500,
//       });
//     }
//   }, [onClose, state.message, state.resetKey, state.success]);

//   return (
//     <form
//       id={address.id}
//       action={dispatch}
//       className="border rounded-md shadow-md p-4 mt-4"
//     >
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-gray-700">Страна</label>
//           <input
//             type="text"
//             name="country"
//             className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full"
//             aria-describedby="country-error"
//             defaultValue={address.country}
//           />
//           <div id="country-error" aria-live="polite" aria-atomic="true">
//             {state.errors?.country &&
//               state.errors.country.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))}
//           </div>
//         </div>
//         <div>
//           <label className="block text-gray-700">Город</label>
//           <input
//             type="text"
//             name="city"
//             className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full"
//             aria-describedby="city-error"
//             defaultValue={address.city}
//           />
//           <div id="city-error" aria-live="polite" aria-atomic="true">
//             {state.errors?.city &&
//               state.errors.city.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))}
//           </div>
//         </div>
//         <div>
//           <label className="block text-gray-700">Улица</label>
//           <input
//             type="text"
//             name="street"
//             className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full"
//             aria-describedby="street-error"
//             defaultValue={address.street}
//           />
//           <div id="street-error" aria-live="polite" aria-atomic="true">
//             {state.errors?.street &&
//               state.errors.street.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))}
//           </div>
//         </div>
//         <div>
//           <label className="block text-gray-700">Дом</label>
//           <input
//             type="text"
//             name="home"
//             className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full"
//             aria-describedby="home-error"
//             defaultValue={address.home}
//           />
//           <div id="home-error" aria-live="polite" aria-atomic="true">
//             {state.errors?.home &&
//               state.errors.home.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))}
//           </div>
//         </div>
//         <div>
//           <label className="block text-gray-700">
//             Номер квартиры или офиса
//           </label>
//           <input
//             type="text"
//             name="apartmentORoffice"
//             className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full"
//             aria-describedby="apartmentORoffice-error"
//             defaultValue={address.apartmentORoffice}
//           />
//           <div
//             id="apartmentORoffice-error"
//             aria-live="polite"
//             aria-atomic="true"
//           >
//             {state.errors?.apartmentORoffice &&
//               state.errors.apartmentORoffice.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))}
//           </div>
//         </div>
//         <div className="col-span-2 flex justify-end space-x-2">
//           <SaveAddress />
//           <CancelEdit onClose={onClose} />
//         </div>
//       </div>
//     </form>
//   );
// }

// function SaveAddress() {
//   const { pending } = useFormStatus();
//   return (
//     <Button
//       className=" rounded-none bg-neutral-950 text-white hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4"
//       aria-disabled={pending}
//     >
//       Сохранить
//     </Button>
//   );
// }

// function CancelEdit({ onClose }: { onClose: () => void }) {
//   return (
//     <Button
//       className="rounded-none bg-neutral-950 text-white hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4"
//       onClick={onClose}
//     >
//       Отменить
//     </Button>
//   );
// }
