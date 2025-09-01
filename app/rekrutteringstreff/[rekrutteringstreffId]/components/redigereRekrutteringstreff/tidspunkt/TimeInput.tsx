'use client';

import { TextField } from '@navikt/ds-react';
import React, { forwardRef, useState } from 'react';

const KLOKKESLETT_OPTIONS = [...Array(24)].flatMap((_, h) =>
  [0, 15, 30, 45].map(
    (m) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
  ),
);

type Props = React.ComponentProps<typeof TextField>;

const TimeInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [listId] = useState(`time-list-${Math.random()}`);

  return (
    <>
      <TextField
        {...props}
        value={props.value ?? ''}
        ref={ref}
        autoComplete='off'
        list={listId}
        className='min-w-[6rem]'
      />
      <datalist id={listId}>
        {KLOKKESLETT_OPTIONS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </datalist>
    </>
  );
});

TimeInput.displayName = 'TimeInput';

export default TimeInput;
