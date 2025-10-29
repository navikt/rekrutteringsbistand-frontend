import{Y as s,j as i}from"./iframe-Bh0pRwlZ.js";import{w as d,c as o}from"./ContextDecorators-MrDHF-eo.js";import{V as n}from"./VelgInternStatus-CBEbyLch.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-zV2xek0y.js";import"./OrganisasjonsnummerAlert-DatBQDbt.js";import"./VStack-Bh5sqxvP.js";import"./BasePrimitive-CIdD0BN-.js";import"./List-CkvlSpuE.js";import"./Link-BX1sqZdd.js";import"./KandidatHendelseTag-CUy4BaC0.js";import"./Tag-JF9Q_tVq.js";import"./ChatExclamationmark-Cd1zPmOB.js";import"./FileXMark-BvjtqqGQ.js";import"./Trash-hvYogGAv.js";import"./HandShakeHeart-Oy_UEsjg.js";import"./Calendar-BcJnnO4v.js";import"./ThumbUp-B1m6WSdd.js";import"./Table-9ymDlq_U.js";import"./util-DvR9_Q0B.js";import"./format-BTbsmh5O.js";import"./match-xCq9uoL5.js";import"./parse-3E_CXpw1.js";import"./getDefaultOptions-C7QosIqT.js";import"./parseISO-4oYzmIp5.js";import"./index-Dt1xWJOQ.js";import"./index-B40KJ5b4.js";import"./isBefore-ml4Crlyx.js";import"./util-BGdIx1Ov.js";import"./InternStatusTag-Dme0rDad.js";import"./CircleSlash-BjUx_z8H.js";import"./XMarkOctagon-BNr7aE-U.js";import"./Reception-rWcvYj6B.js";import"./SealCheckmark-Em352kX-.js";import"./PersonChat-BXhZNA9z.js";import"./MagnifyingGlass-CHbKf2Ub.js";import"./Dropdown-HHH5dE36.js";import"./useControllableState-D5MDUlNd.js";import"./Popover-LcuTt5HB.js";import"./floating-ui.react-BDVOfHzl.js";import"./Date.Input-D_w9FTP8.js";import"./useFormField-BxOERrPH.js";import"./ChevronDown-sDjvEBsh.js";import"./Modal.context-D0P2soZO.js";import"./DismissableLayer-BUXRPJdy.js";import"./useDescendant-CeoMm-b3.js";import"./useClientLayoutEffect-Bt8IcS1D.js";import"./Pencil-EiQ5y6fN.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'kandidatnr-1',
    status: InternKandidatstatus.VURDERES,
    lukketKandidatliste: false
  },
  render: args => withStillingsKandidatliste(() => <VelgInternStatus {...args} />)
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'kandidatnr-1',
    status: InternKandidatstatus.AKTUELL,
    lukketKandidatliste: true
  },
  render: args => withStillingsKandidatliste(() => <VelgInternStatus {...args} />, createKandidatlisteMock({
    lukket: true
  }))
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'dummy',
    status: InternKandidatstatus.VURDERES,
    lukketKandidatliste: false
  },
  render: () => withStillingsKandidatliste(() => <div className='flex flex-col gap-4'>
        {Object.values(InternKandidatstatus).map(s => <VelgInternStatus key={s} kandidatnr={\`kandidat-\${s}\`} status={s} lukketKandidatliste={false} />)}
      </div>)
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,et as default};
