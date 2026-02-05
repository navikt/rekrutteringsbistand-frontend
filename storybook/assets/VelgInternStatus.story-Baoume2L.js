import{N as s,j as i}from"./iframe-C9qr6ajT.js";import{V as n}from"./VelgInternStatus-Dd6f5Eb_.js";import{w as d,c as o}from"./ContextDecorators-DTv2s1e8.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-B5nOKPlv.js";import"./Tag-DTpHsMkP.js";import"./CircleSlash-DsP5rppw.js";import"./XMarkOctagon-BEID2A0z.js";import"./Reception-BVSH_38Z.js";import"./SealCheckmark-DR_czv3l.js";import"./PersonChat-C3ujdHBo.js";import"./MagnifyingGlass-DYt-GQmi.js";import"./KandidatlisteContext-DCvRCgz8.js";import"./OrganisasjonsnummerAlert-Cxu3-gsQ.js";import"./VStack-sPDQevDu.js";import"./BasePrimitive-Do5WjwtA.js";import"./Box-CqzY5P6E.js";import"./List-BE3Qx1bR.js";import"./Link-hPgkhGBp.js";import"./KandidatHendelseTag-B7_qO63l.js";import"./ChatExclamationmark-OHyhugA4.js";import"./FileXMark-BjBZIB9l.js";import"./Trash-DWh3-6YG.js";import"./HandShakeHeart-CNcTNguu.js";import"./Calendar-Bgrd5uO8.js";import"./ThumbUp-ChhFSAgX.js";import"./ExclamationmarkTriangle-NYyxQjsX.js";import"./Table-CEb8gThy.js";import"./index-Cs4qgHe1.js";import"./index-B40KJ5b4.js";import"./util-B6mb53Gu.js";import"./Dropdown-DsvsQyxI.js";import"./useControllableState-ysvxf6Tl.js";import"./Popover-lD4eHY-s.js";import"./floating-ui.react-bRhtECzu.js";import"./Modal.context-DGkPTSJ2.js";import"./DismissableLayer-szL1Inc1.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DTYWJsJ9.js";import"./Pencil-CWWibKjR.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,W as default};
