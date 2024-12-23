import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@erist-opt/shadcn/components/ui/input';
import { Label } from '@erist-opt/shadcn/components/ui/label';

type PropsType = {
  placeholder: string;
  param: string;
};

export const SimpleInput = ({ placeholder, param }: PropsType) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>{placeholder}</Label>
      <Input
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get(param)?.toString()}
      />
    </div>
  );
};
