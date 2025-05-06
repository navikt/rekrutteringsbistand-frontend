import { GeografiDTO } from '../app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export function getWorkLocationsAsString(
  location?: GeografiDTO | null,
): string {
  const workLocations: string[] = [];
  if (!location) {
    return '';
  }

  if (location.postalCode) {
    let tmp = location.address ? `${location.address}, ` : '';
    tmp += `${location.postalCode} ${capitalizeLocation(location.city ?? '')}`;
    workLocations.push(tmp);
  } else if (location.municipal) {
    workLocations.push(capitalizeLocation(location.municipal));
  } else if (location.county) {
    workLocations.push(capitalizeLocation(location.county));
  } else if (location.country) {
    workLocations.push(capitalizeLocation(location.country));
  }

  const arbeidsSteder = workLocations.join(', ');
  return arbeidsSteder;
}

export default function capitalizeLocation(text: string) {
  const separators = [
    ' ', // NORDRE LAND skal bli Nordre Land
    '-', // AUST-AGDER skal bli Aust-Agder
    '(', // BØ (TELEMARK) skal bli Bø (Telemark)
  ];

  const ignore = [
    'i',
    'og', // MØRE OG ROMSDAL skal bli Møre og Romsdal
  ];

  if (text) {
    let capitalized = text.toLowerCase();

    for (let i = 0, len = separators.length; i < len; i += 1) {
      const fragments = capitalized.split(separators[i]);
      for (let j = 0, x = fragments.length; j < x; j += 1) {
        if (!ignore.includes(fragments[j])) {
          fragments[j] =
            (fragments[j][0] || '').toUpperCase() + fragments[j].substr(1);
        }
      }
      capitalized = fragments.join(separators[i]);
    }

    return capitalized;
  }
  return text;
}
