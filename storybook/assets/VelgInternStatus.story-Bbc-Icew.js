import{X as s,j as i}from"./iframe-B3f5JsBL.js";import{V as n}from"./VelgInternStatus-CVzLPBtK.js";import{w as d,c as o}from"./ContextDecorators-CdwUs38w.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CAckKLcT.js";import"./Tag-HQflId7t.js";import"./CircleSlash-DEgrw5vK.js";import"./XMarkOctagon-OvdDW0f2.js";import"./Reception-fdRvBGCV.js";import"./SealCheckmark-8yeGlhOB.js";import"./PersonChat-DIp0r1_l.js";import"./MagnifyingGlass-Dg69MDGC.js";import"./KandidatlisteContext-DSj3oEba.js";import"./OrganisasjonsnummerAlert-CqrFfl1R.js";import"./VStack-Cyq1zcSi.js";import"./BasePrimitive-DTcZC2Ka.js";import"./List-Bi1mPzw3.js";import"./Link-CxIdyMM9.js";import"./KandidatHendelseTag-C75U9OOQ.js";import"./ChatExclamationmark--mKgA6Ru.js";import"./FileXMark-CYLbex1x.js";import"./Trash-BRSLg01_.js";import"./HandShakeHeart-TSLWLIqu.js";import"./Calendar-DxUVfheH.js";import"./ThumbUp-sInhpK6j.js";import"./ExclamationmarkTriangle-BMukC4AA.js";import"./Table--483cipR.js";import"./index-Cnf-X_bH.js";import"./index-B40KJ5b4.js";import"./util-B6Mcalfs.js";import"./Dropdown-BInAyqvn.js";import"./useControllableState-CmSO-Fnv.js";import"./Popover-vbAlY7mj.js";import"./floating-ui.react-BuFQUhpN.js";import"./Date.Input-Clf8B4hK.js";import"./useFormField-CIGIYXae.js";import"./ChevronDown-Bq9uvc-y.js";import"./Modal.context-DKfjR89r.js";import"./DismissableLayer-COB3spCf.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-ARtV7_eE.js";import"./Pencil-LCoRoc1K.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
