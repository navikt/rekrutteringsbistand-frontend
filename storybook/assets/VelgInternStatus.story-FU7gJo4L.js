import{O as s,j as i}from"./iframe-CYiyhWTI.js";import{V as n}from"./VelgInternStatus-DJ1ycjK4.js";import{w as d,c as o}from"./ContextDecorators-FbtIT-Vt.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-Bu8vE_ze.js";import"./Tag-BKIF4Jhe.js";import"./CircleSlash-D6uoY03w.js";import"./XMarkOctagon-C-_BwQge.js";import"./Reception-0K46Zo3E.js";import"./SealCheckmark-DVNd3wSc.js";import"./PersonChat-w5fk3BXe.js";import"./MagnifyingGlass-DTZvlvW5.js";import"./KandidatlisteContext-Ch3xKDrZ.js";import"./OrganisasjonsnummerAlert-3zleYlEj.js";import"./VStack-ClVH4Ku2.js";import"./BasePrimitive-BTpmfR_9.js";import"./List-BX-O7rcO.js";import"./Link-BYs-f_YW.js";import"./KandidatHendelseTag-Dr6MGsc9.js";import"./ChatExclamationmark-CoE-goaS.js";import"./FileXMark-DacbSndw.js";import"./Trash-Chy14LSL.js";import"./HandShakeHeart-CE36xryi.js";import"./Calendar-BpKyObVo.js";import"./ThumbUp-DK4Sl93n.js";import"./ExclamationmarkTriangle-ngfBzqY_.js";import"./Table-BEF106oA.js";import"./index-WIlmYY_z.js";import"./index-B40KJ5b4.js";import"./util-DW5zFozq.js";import"./Dropdown-DWNtiqxO.js";import"./useControllableState-DtSoKbzt.js";import"./Popover-DAgsnI6R.js";import"./floating-ui.react-Bfz6SC7K.js";import"./Date.Input-Bkr6PkeN.js";import"./useFormField-gfWUKjlL.js";import"./ChevronDown-BL_ttcBG.js";import"./Modal.context-DDFbhODk.js";import"./DismissableLayer-BNLVEwnI.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BS5rsZoI.js";import"./Pencil-CeSSF06Q.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,Y as default};
