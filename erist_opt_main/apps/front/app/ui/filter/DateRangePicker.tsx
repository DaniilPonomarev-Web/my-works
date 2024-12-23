'use client';

import * as React from 'react';
import { format, parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { Calendar } from '@erist-opt/shadcn/components/ui/calendar';
import { cn } from '@erist-opt/shadcn/lib/utils';
import { Button } from '@erist-opt/shadcn/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@erist-opt/shadcn/components/ui/popover';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const from = searchParams.get('from') ?? undefined;
  const to = searchParams.get('to') ?? undefined;

  React.useEffect(() => {
    setDate({
      from: from ? parseISO(from) : undefined,
      to: to ? new Date(to) : undefined,
    });
  }, []);

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (date?.from) params.set('from', format(date.from, 'yyyy-MM-dd'));
    if (date?.to) params.set('to', format(date.to, 'yyyy-MM-dd'));

    replace(`${pathname}?${params.toString()}`);
  }, [date]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd LLL y')} -{' '}
                  {format(date.to, 'dd LLL y')}
                </>
              ) : (
                format(date.from, ' dd LLL y')
              )
            ) : (
              <span>Дата</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
