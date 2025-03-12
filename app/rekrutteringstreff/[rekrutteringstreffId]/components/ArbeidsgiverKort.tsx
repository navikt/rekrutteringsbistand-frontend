import { BodyShort, Box } from '@navikt/ds-react';
import * as React from 'react';

interface ArbeidsgiverKortProps {
    organisasjonsnummer?: string;
    navn?: string;
    organisasjonsform?: string;
    antallAnsatte?: number;
    adresse?: ArbeidsgiverAdresse | null;
}

type ArbeidsgiverAdresse = {
    adresse?: string;
    postnummer?: string;
    poststed?: string;
    kommune?: string;
    kommunenummer?: string;
    land?: string;
    landkode?: string;
};

const ArbeidsgiverKort: React.FC<ArbeidsgiverKortProps> = ({
    navn,
    adresse
}) => {
    return (
        <Box>
            <BodyShort>{navn}</BodyShort>
            <BodyShort>{adresse?.adresse}, {adresse?.postnummer} {adresse?.poststed}</BodyShort>
        </Box>
    );
};

export default ArbeidsgiverKort;
