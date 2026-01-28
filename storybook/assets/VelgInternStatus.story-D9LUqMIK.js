import{N as s,j as i}from"./iframe-CeBddf6m.js";import{V as n}from"./VelgInternStatus-GpNS4lUF.js";import{w as d,c as o}from"./ContextDecorators-DSfdgtod.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-D7xtQ6CP.js";import"./Tag-C39wB8zK.js";import"./CircleSlash-CFC-8DwO.js";import"./Reception-DqHm_xqd.js";import"./SealCheckmark-B4WCnAL3.js";import"./PersonChat-Cb_SnDlw.js";import"./MagnifyingGlass-CtEtkK1R.js";import"./KandidatlisteContext-CM7QZJj3.js";import"./OrganisasjonsnummerAlert-ONyq2mZG.js";import"./VStack-BOGXFEAk.js";import"./BasePrimitive-2FA-uqyG.js";import"./Box-iXv9vOXi.js";import"./List-I1LukFvB.js";import"./Link-D7bRtTL4.js";import"./KandidatHendelseTag-C2BWAqE5.js";import"./ChatExclamationmark-CzmxQqFp.js";import"./FileXMark-BHg96SD7.js";import"./Trash-H2SbdjPz.js";import"./HandShakeHeart-9aaqo0N5.js";import"./Calendar-CNK4PSZI.js";import"./ThumbUp-qSlJSduX.js";import"./Table-MB4gVTvn.js";import"./index-COGfCL7v.js";import"./index-B40KJ5b4.js";import"./util-DZUmK0Iu.js";import"./Dropdown-Bn9Jcxqj.js";import"./useControllableState-Z5xfEuBZ.js";import"./Popover-BmAoqUAm.js";import"./floating-ui.react-yriId-T9.js";import"./Modal.context-DHabSalL.js";import"./DismissableLayer-BVglxUyP.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-LE5s5o8b.js";import"./Pencil-Bi7MUqrJ.js";const P={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,P as default};
