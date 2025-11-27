import { Box } from '@navikt/ds-react';
import { ReactNode } from 'react';

type IkonNavnAvatarProps =
  | {
      fulltNavn: string;
      fornavn?: never;
      etternavn?: never;
      ikon?: never;
      farge?: 'blå' | 'grønn' | 'oransje' | 'lilla' | 'grå';
      størrelse?: 'sm' | 'md' | 'lg';
      kantfarge?: boolean;
      className?: string;
    }
  | {
      fulltNavn?: never;
      fornavn: string;
      etternavn: string;
      ikon?: never;
      farge?: 'blå' | 'grønn' | 'oransje' | 'lilla' | 'grå';
      størrelse?: 'sm' | 'md' | 'lg';
      kantfarge?: boolean;
      className?: string;
    }
  | {
      fulltNavn?: never;
      fornavn?: never;
      etternavn?: never;
      ikon: ReactNode | undefined;
      farge?: 'blå' | 'grønn' | 'oransje' | 'lilla' | 'grå';
      størrelse?: 'sm' | 'md' | 'lg';
      kantfarge?: boolean;
      className?: string;
    };

export default function IkonNavnAvatar({
  fulltNavn,
  fornavn,
  etternavn,
  ikon,
  farge,
  størrelse,
  kantfarge,
  className,
}: IkonNavnAvatarProps) {
  const hentInitialer = () => {
    if (fulltNavn) {
      if (fulltNavn.trim().length !== 0) {
        const navn = fulltNavn.split(' ');
        return navn.map((n) => n.charAt(0).toUpperCase()).join('');
      }
    } else if (
      fornavn &&
      etternavn &&
      fornavn.trim().length !== 0 &&
      etternavn.trim().length !== 0
    ) {
      return (
        fornavn.charAt(0).toUpperCase() + etternavn.charAt(0).toUpperCase()
      );
    }
    return '';
  };

  const bakgrunnsfarge = () => {
    switch (farge) {
      case 'blå':
        return 'bg-(--ax-bg-brand-blue-moderate)';
      case 'grønn':
        return 'bg-(--ax-bg-success-moderate)';
      case 'oransje':
        return 'bg-(--ax-bg-warning-moderate)';
      case 'lilla':
        return 'bg-(--ax-bg-meta-purple-moderate)';
      case 'grå':
        return 'bg-(--ax-bg-neutral-moderate)';
      default:
        return 'bg-(--ax-bg-neutral-moderate)';
    }
  };

  const tekstfarge = () => {
    switch (farge) {
      case 'blå':
        return 'text-(--ax-text-accent-subtle)';
      case 'grønn':
        return 'text-(--ax-text-success-subtle)';
      case 'oransje':
        return 'text-(--ax-text-warning-subtle)';
      case 'lilla':
        return 'text-(--ax-text-meta-purple-subtle)';
      case 'grå':
        return 'text-(--ax-text-neutral-subtle)';
      default:
        return 'text-(--ax-text-neutral-subtle)';
    }
  };

  const kantlinjefarge = () => {
    if (kantfarge) {
      switch (farge) {
        case 'blå':
          return 'border-1 border-(--ax-border-accent-subtle)';
        case 'grønn':
          return 'border-1 border-(--ax-border-success-subtle)';
        case 'oransje':
          return 'border-1 border-(--ax-border-warning-subtle)';
        case 'lilla':
          return 'border-1 border-(--ax-border-meta-purple-subtle)';
        case 'grå':
          return 'border-1 border-(--ax-border-neutral-subtle)';
        default:
          return 'border-1 border-(--ax-border-neutral-subtle)';
      }
    }
    return '';
  };

  const avatarstørrelse = () => {
    switch (størrelse) {
      case 'sm':
        return 'h-6  w-6';
      case 'md':
        return 'h-8 w-8';
      case 'lg':
        return 'h-10 w-10';
      default:
        return 'h-10 w-10';
    }
  };

  const tekststørrelse = () => {
    if (ikon) {
      switch (størrelse) {
        case 'sm':
          return 'text-base';
        case 'md':
          return 'text-xl';
        case 'lg':
          return 'text-2xl';
        default:
          return 'text-xl';
      }
    } else {
      switch (størrelse) {
        case 'sm':
          return 'text-sm';
        case 'md':
          return 'text-base';
        case 'lg':
          return 'text-lg';
        default:
          return 'text-base';
      }
    }
  };

  return (
    <Box.New
      borderRadius={'full'}
      className={
        className +
        ' flex items-center justify-center text-center ' +
        bakgrunnsfarge() +
        ' ' +
        tekstfarge() +
        ' ' +
        kantlinjefarge() +
        ' ' +
        avatarstørrelse() +
        ' ' +
        tekststørrelse()
      }
    >
      {ikon ? ikon : hentInitialer()}
    </Box.New>
  );
}
