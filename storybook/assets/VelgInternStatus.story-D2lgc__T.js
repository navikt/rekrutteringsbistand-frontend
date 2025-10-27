import{aK as s,j as i}from"./iframe-DwCeUcpF.js";import{w as d,c as o}from"./ContextDecorators-DosWQLJK.js";import{V as n}from"./VelgInternStatus-DAaZWyAV.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-ChP9k33A.js";import"./OrganisasjonsnummerAlert-CoXjmlwF.js";import"./VStack-D6hOBrE4.js";import"./BasePrimitive-Jh0xf_JO.js";import"./List-D9io_hwL.js";import"./Link-BOXQ--_T.js";import"./KandidatHendelseTag-DMrzV7Tn.js";import"./Tag-DVJQu9tw.js";import"./ChatExclamationmark-gKxU5Or8.js";import"./FileXMark-jm5k5WE5.js";import"./Trash-dx6nwkck.js";import"./HandShakeHeart-D82zD2iw.js";import"./Calendar-BLuLYfCH.js";import"./ThumbUp-DQKSXmIX.js";import"./Table-Dj9aueVg.js";import"./util-BItQrrej.js";import"./format-BMhxV5pv.js";import"./match-CB3mvxqp.js";import"./parse-CzlhRlc5.js";import"./getDefaultOptions-BnFjI66N.js";import"./parseISO-N1d7_gMU.js";import"./index-BEKt7dbX.js";import"./index-B40KJ5b4.js";import"./isBefore-XnSLFwsW.js";import"./util-BRXlMc76.js";import"./InternStatusTag-B0C2oIcs.js";import"./CircleSlash-DqpH1Na5.js";import"./XMarkOctagon-B0xtJLur.js";import"./Reception-B9OseJio.js";import"./SealCheckmark-CXQ_lxjm.js";import"./PersonChat-Ds1MSjOl.js";import"./MagnifyingGlass-Dmb1nV3i.js";import"./Dropdown-CEL_IAJ3.js";import"./useControllableState-CdwTxnNv.js";import"./Popover-BXOgINgC.js";import"./floating-ui.react-CFeW6sX0.js";import"./Date.Input-x0C3NBAs.js";import"./useFormField-20kFEF7J.js";import"./ChevronDown-D5-1Qh-a.js";import"./Modal.context-CbGkjZ7C.js";import"./DismissableLayer-DFUxmEzV.js";import"./useDescendant-Cz42C0A9.js";import"./useClientLayoutEffect-DOY64x3I.js";import"./Pencil-DENLPI5N.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
