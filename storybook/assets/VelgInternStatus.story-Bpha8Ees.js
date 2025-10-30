import{P as s,j as i}from"./iframe-DwwpuTFP.js";import{w as d,c as o}from"./ContextDecorators-BIoayw4p.js";import{V as n}from"./VelgInternStatus-Y-qXek6M.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Dga9qocn.js";import"./OrganisasjonsnummerAlert-Dsxpzlk0.js";import"./VStack-BN8fhrlC.js";import"./BasePrimitive-CF6MQeVw.js";import"./List-CX9xI7S7.js";import"./Link-CSctH9gV.js";import"./KandidatHendelseTag-BAi-T6SF.js";import"./Tag-6mjVNMQk.js";import"./ChatExclamationmark-BSK7N_cZ.js";import"./FileXMark-BZ2Ib8x0.js";import"./Trash-IEaWH2zW.js";import"./HandShakeHeart-ejnaLvQS.js";import"./Calendar-CvieklPO.js";import"./ThumbUp-wdeyXNkp.js";import"./Table-DBWICR8j.js";import"./util--TOvclJc.js";import"./parse-CZkEaCBT.js";import"./getDefaultOptions-D6tGVtc1.js";import"./parseISO-Q4MDVn8O.js";import"./index-B4g5cUh7.js";import"./index-B40KJ5b4.js";import"./isBefore-CmUWRxsX.js";import"./util-D_fvgQrs.js";import"./InternStatusTag-hl9D8nGR.js";import"./CircleSlash-DvQCEffq.js";import"./XMarkOctagon-VU2RMlaT.js";import"./Reception-DiEdBjqA.js";import"./SealCheckmark-DeX_iI-c.js";import"./PersonChat-DFqNTiUn.js";import"./MagnifyingGlass-DMIY4pTz.js";import"./Dropdown-U_x3Mhgn.js";import"./useControllableState-Xz6eYXrU.js";import"./Popover-BPpEh29r.js";import"./floating-ui.react-C4ZL8j1u.js";import"./Date.Input-Cr-2ulbS.js";import"./useFormField-B46YkHgM.js";import"./ChevronDown-COPvl1Il.js";import"./Modal.context-D7vtMZZl.js";import"./DismissableLayer-BnNft1r5.js";import"./useDescendant-BHMuV25M.js";import"./useClientLayoutEffect-BxGn7POO.js";import"./Pencil-BKdYdqw7.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,at as default};
