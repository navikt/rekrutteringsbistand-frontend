import{X as s,j as i}from"./iframe-Dp6nHdOg.js";import{V as n}from"./VelgInternStatus-XsKzcBzn.js";import{w as d,c as o}from"./ContextDecorators-eDVedWAx.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CeCxcoAa.js";import"./Tag-CV7NXTin.js";import"./CircleSlash-DfENX3go.js";import"./XMarkOctagon-DHjSCAW1.js";import"./Reception-C7ely_Vn.js";import"./SealCheckmark-BsD2qBKe.js";import"./PersonChat-DJ5SWHLI.js";import"./MagnifyingGlass-DA0xeDzK.js";import"./KandidatlisteContext-DCEF9UD9.js";import"./OrganisasjonsnummerAlert-CuEWXB_R.js";import"./VStack-C5sZiGcO.js";import"./BasePrimitive-DXQCNI91.js";import"./List-BNJVmnt7.js";import"./Link-l82fbgQu.js";import"./KandidatHendelseTag-BQSUv-pa.js";import"./ChatExclamationmark-CtBwm2Fa.js";import"./FileXMark-DT-X0bwF.js";import"./Trash-Y6EFmEhJ.js";import"./HandShakeHeart-CrIT-FAb.js";import"./Calendar-L7c72Jnf.js";import"./ThumbUp-C-mqTuPv.js";import"./Table-CXDsAoNd.js";import"./index-CO49fOIc.js";import"./index-B40KJ5b4.js";import"./util-0VcbYtNN.js";import"./Dropdown-ByIrSdDk.js";import"./useControllableState-Cfuho32D.js";import"./Popover-BojWV3Ao.js";import"./floating-ui.react-BGp16BDI.js";import"./Date.Input--SdJUnDs.js";import"./useFormField-TwllRpup.js";import"./ChevronDown-BrwQWDe4.js";import"./Modal.context-n3x3Fqud.js";import"./DismissableLayer-Dt4vpDcl.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-O96VxCt4.js";import"./Pencil-DQ-QcAuU.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
