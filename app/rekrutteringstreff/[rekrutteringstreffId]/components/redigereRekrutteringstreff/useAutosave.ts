import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useFormContext } from 'react-hook-form';

type UseAutosaveProps = {
  disabled?: boolean;
};

export const useAutosave = ({ disabled = false }: UseAutosaveProps = {}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { trigger, getValues } = useFormContext();
  const { mutate } = useRekrutteringstreff(rekrutteringstreffId);

  const save = async (fields: string | string[]) => {
    if (disabled) return;

    const fieldNames = Array.isArray(fields) ? fields : [fields];
    const result = await trigger(fieldNames);

    if (!result) return;

    const values = getValues();
    const payload = fieldNames.reduce((acc, field) => {
      acc[field] = values[field];
      return acc;
    }, {} as any);

    await oppdaterRekrutteringstreff(rekrutteringstreffId, payload);
    await mutate();
  };

  return { save };
};
