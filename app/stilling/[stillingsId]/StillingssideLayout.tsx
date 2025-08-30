// 'use client';

// import StillingHeader from './StillingHeader';
// import { useStillingsContext } from './StillingsContext';
// import WindowFinnKandidater from '@/app/_windows/finn-kandidater-window/WindowFinnKandidater';
// import WindowVisKandidat from '@/app/_windows/vis-kandidat-window/WindowVisKandidat';
// import * as React from 'react';

// interface StillingSideLayoutProps {
//   children?: React.ReactNode;
// }

// const StillingSideLayout: React.FC<StillingSideLayoutProps> = ({
//   children,
// }) => {
//   const { stillingsData } = useStillingsContext();

//   const ugyldigStilling =
//     stillingsData?.stilling?.medium === 'DIR' &&
//     (stillingsData?.stilling?.employer?.orgnr ?? null) === null;

//   console.log('🎺 "hei"', 'hei');
//   return (
//     <>
//       <StillingHeader />
//       <WindowFinnKandidater stillingsId={stillingsData.stilling.uuid} />
//       <WindowVisKandidat />
//       {children}
//     </>
//   );
// };

// export default StillingSideLayout;
