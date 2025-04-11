import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../../../../../components/ui/sheet';
import { KandidatContextProvider } from '../../../../../kandidat/[kandidatId]/KandidatContext';
import KandidatSide from '../../../../../kandidat/[kandidatId]/KandidatSide';
import KandidatSideLayout from '../../../../../kandidat/[kandidatId]/KandidatsideLayout';
import { useKandidatlisteContext } from '../../KandidatlisteContext';
import { KandidatVisningProps } from '../KandidatlisteFilter/useFiltrerteKandidater';
import KandidatHandlingerForStilling from './KandidatHandlingerForStilling';
import {
  ChevronDownIcon,
  ChevronRightDoubleIcon,
  ChevronUpIcon,
} from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatVisningSidebarProps {
  kandidat: KandidatVisningProps;
}

const KandidatVisningSidebar: React.FC<KandidatVisningSidebarProps> = ({
  kandidat,
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <span className='aksel-link aksel-link--action'>
          {kandidat.etternavn}, {kandidat.fornavn}
        </span>
      </SheetTrigger>
      <KandidatVisningSidebarContent kandidatnr={kandidat.kandidatnr} />
    </Sheet>
  );
};

const KandidatVisningSidebarContent = ({
  kandidatnr,
}: {
  kandidatnr: string;
}) => {
  const { kandidater } = useKandidatlisteContext();

  const [currentKandidatnr, setCurrentKandidatnr] =
    React.useState<string>(kandidatnr);
  const [kandidat, setKandidat] = React.useState<KandidatVisningProps | null>(
    null,
  );

  const kandidaIndex = kandidater.findIndex(
    (kandidat) => kandidat.kandidatnr === currentKandidatnr,
  );

  const forrigeKandidatIndex = kandidaIndex > 0 ? kandidaIndex - 1 : null;

  const nesteKandidatIndex =
    kandidaIndex < kandidater.length - 1 ? kandidaIndex + 1 : null;

  React.useEffect(() => {
    const currentKandidat = kandidater.find(
      (k) => k.kandidatnr === currentKandidatnr,
    );

    if (currentKandidat) {
      setKandidat(currentKandidat);
    }
  }, [currentKandidatnr, kandidater]);

  const handlePreviousClick = () => {
    if (forrigeKandidatIndex !== null) {
      setCurrentKandidatnr(kandidater[forrigeKandidatIndex].kandidatnr);
    }
  };

  const handleNextClick = () => {
    if (nesteKandidatIndex !== null) {
      setCurrentKandidatnr(kandidater[nesteKandidatIndex].kandidatnr);
    }
  };

  if (!kandidat) {
    return null;
  }

  return (
    <SheetContent className='w-[600px] overflow-y-auto max-h-screen'>
      <div className='sticky top-0 z-10 flex items-center justify-between bg-background p-3 '>
        <div className='flex items-center'>
          <SheetClose>
            <div className='aksel-button aksel-button--tertiary aksel-button--small aksel-button--icon-only '>
              <ChevronRightDoubleIcon />
            </div>
          </SheetClose>
          <div className='w-0 h-4 outline outline-offset-[-0.50px] outline-Border-Accent-Accent-Subtle mx-1' />
          <div>
            <Button
              variant='tertiary'
              size='small'
              disabled={!forrigeKandidatIndex}
              onClick={handlePreviousClick}
              icon={<ChevronUpIcon />}
            />
          </div>
          <div>
            <Button
              size='small'
              variant='tertiary'
              disabled={!nesteKandidatIndex}
              onClick={handleNextClick}
              icon={<ChevronDownIcon />}
            />
          </div>
        </div>
      </div>
      <SheetHeader>
        <SheetTitle>
          <div className='pl-5 pt-6 text-3xl'>
            {kandidat.fornavn} {kandidat.etternavn}
          </div>
        </SheetTitle>
        <SheetDescription className='sr-only'>
          Kandidatinformasjon for {kandidat.fornavn} {kandidat.etternavn}
        </SheetDescription>
      </SheetHeader>

      <div className='px-5 pb-5'>
        <KandidatContextProvider kandidatId={kandidat.kandidatnr}>
          <KandidatSideLayout sidebar>
            <KandidatHandlingerForStilling kandidat={kandidat} />
            <KandidatSide sidebar />
          </KandidatSideLayout>
        </KandidatContextProvider>
      </div>
    </SheetContent>
  );
};

export default KandidatVisningSidebar;
