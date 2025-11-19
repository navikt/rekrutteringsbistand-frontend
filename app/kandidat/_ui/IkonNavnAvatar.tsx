import { BodyShort, Box } from '@navikt/ds-react';

type IkonNavnAvatarProps =
  | { fulltNavn: string }
  | { fornavn: string; etternavn: string;};

export default function IkonNavnAvatar(props: IkonNavnAvatarProps) {
  const hentInitialer = () => {
    if ('fulltNavn' in props) {
      const navn = props.fulltNavn.split(' ');
      return navn.map((n) => n.charAt(0).toUpperCase()).join('');
    } else {
      return (
        props.fornavn.charAt(0).toUpperCase() +
        props.etternavn.charAt(0).toUpperCase()
      );
    }
  }

  return (
    <>
      <Box.New
        borderRadius={'full'}
        background={'neutral-moderate'}
        className='text-center py-2.5'
        width={'40px'}
        height={'40px'}
      >
        <BodyShort
          textColor='subtle'
          className='text-sm'
        >
          {hentInitialer()}
        </BodyShort>
      </Box.New>
    </>
  )
}