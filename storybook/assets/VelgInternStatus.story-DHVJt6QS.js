import{N as s,j as i}from"./iframe-D2qk06b9.js";import{V as n}from"./VelgInternStatus-DE53zxSJ.js";import{w as d,c as o}from"./ContextDecorators-vL06ZVxm.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-Dlw2R1Ml.js";import"./Tag-39UELPPM.js";import"./CircleSlash-BauTotxO.js";import"./XMarkOctagon-Ck7mazMB.js";import"./Reception-C30-oLXE.js";import"./SealCheckmark-CNpjAHDO.js";import"./PersonChat-BIRZP9jX.js";import"./MagnifyingGlass-DA8wvtjn.js";import"./KandidatlisteContext-CGiBosJt.js";import"./OrganisasjonsnummerAlert-DUc8mytz.js";import"./VStack-D9NjHXKD.js";import"./BasePrimitive-DHsUWIon.js";import"./Box-ev7bPFwZ.js";import"./List-B4XJgJoc.js";import"./Link-DDxFzdGY.js";import"./KandidatHendelseTag-C0GrFqnq.js";import"./ChatExclamationmark-DyTKy811.js";import"./FileXMark-CuxCy8Dh.js";import"./Trash-Csb-g1YU.js";import"./HandShakeHeart-DKiNlJu4.js";import"./Calendar-BJ2HVi-_.js";import"./ThumbUp-Bgy4vdnc.js";import"./ExclamationmarkTriangle-BtGVo-c4.js";import"./Table-BriCsZse.js";import"./index-DJbTq8sZ.js";import"./index-B40KJ5b4.js";import"./util-DOM9QJYQ.js";import"./Dropdown-C6uJGbc-.js";import"./useControllableState-DW-IcaiN.js";import"./Popover-B5CbIcRB.js";import"./floating-ui.react-C52pHC-p.js";import"./Modal.context-HFXbj7pd.js";import"./DismissableLayer-Cl6K_98h.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CAHRMErA.js";import"./Pencil-C0AiBLQ6.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
