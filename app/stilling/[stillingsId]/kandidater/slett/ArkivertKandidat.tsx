// import { kandidaterSchemaDTO } from '../../../../api/kandidat/schema.zod';
// import { storForbokstavString } from '../../../../kandidat/util';
// import { Table, Tag } from '@navikt/ds-react';
// import * as React from 'react';

// export interface ArkivertKandidatProps {
//   kandidat: kandidaterSchemaDTO;
// }

// const ArkivertKandidat: React.FC<ArkivertKandidatProps> = ({ kandidat }) => {
//   return (
//     <Table.Row>
//       <Table.DataCell colSpan={2} />
//       <Table.DataCell>
//         {storForbokstavString(kandidat?.etternavn ?? '')},{' '}
//         {storForbokstavString(kandidat?.fornavn ?? '')}
//       </Table.DataCell>
//       <Table.DataCell colSpan={2}>
//         Kandidaten er slettet (arkivert)
//       </Table.DataCell>
//       <Table.DataCell colSpan={3}>
//         <Tag size={'small'} variant='warning'>
//           Arkivert
//         </Tag>
//       </Table.DataCell>
//     </Table.Row>
//   );
// };

// export default ArkivertKandidat;
