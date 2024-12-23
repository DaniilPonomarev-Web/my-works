import { TrashIcon } from '@radix-ui/react-icons';
import { deleteProductFromCart } from '../../lib/actions';

export function DeleteProduct({ id }: { id: string }) {
  const deleteProductWithId = deleteProductFromCart.bind(null, id);

  return (
    <form action={deleteProductWithId} className="flex">
      <button
        type="submit"
        className="font-medium text-black-600 hover:text-black-500"
      >
        <TrashIcon width={24} />
      </button>
    </form>
  );
}
