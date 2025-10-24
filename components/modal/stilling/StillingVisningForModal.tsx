import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import OmStillingenHeader from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingenHeader';

export interface StillingVisningForModalProps {
  stillingsId: string;
}

export default function StillingVisningForModal({
  stillingsId,
}: StillingVisningForModalProps) {
  return (
    <StillingsContextProvider stillingsId={stillingsId}>
      <OmStillingenHeader />
      <OmStillingen printRef={null} skjulKnapper />
    </StillingsContextProvider>
  );
}
