import{Y as s,j as i}from"./iframe-D1P1_UW8.js";import{w as d,c as o}from"./ContextDecorators-BRmtbSvJ.js";import{V as n}from"./VelgInternStatus-DimLUKV4.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C1pWQErK.js";import"./OrganisasjonsnummerAlert-DaW1RgFU.js";import"./VStack-DnXFRTfB.js";import"./BasePrimitive-DQPxH2SA.js";import"./List-C6rND9OD.js";import"./Link-DGeWC8PI.js";import"./KandidatHendelseTag-Gcto27zC.js";import"./Tag-BF0fVLzi.js";import"./ChatExclamationmark-NDb_v3yu.js";import"./FileXMark-DUHFId3R.js";import"./Trash-CcKvLfxV.js";import"./HandShakeHeart-BO6Hx1to.js";import"./Calendar-CUklSc48.js";import"./ThumbUp-BaU7Vlly.js";import"./Table-Btjy1hoN.js";import"./util-ClOszpdN.js";import"./format-lAfslPga.js";import"./match-C328oq0P.js";import"./parse-C8R03IWs.js";import"./getDefaultOptions-D8Wf4dlj.js";import"./parseISO-AXk05REW.js";import"./index-Dj3qVHhP.js";import"./index-B40KJ5b4.js";import"./isBefore-Dt5OoaD5.js";import"./util-LqgaeGCQ.js";import"./InternStatusTag-Bam_SLPL.js";import"./CircleSlash-DOT7J47t.js";import"./XMarkOctagon-BzDwNt11.js";import"./Reception-DQCqjmSD.js";import"./SealCheckmark-CTi83Qvh.js";import"./PersonChat-DDI8Q0Fw.js";import"./MagnifyingGlass-DGm-C0wu.js";import"./Dropdown-CHCfxeA9.js";import"./useControllableState-BihhkRmU.js";import"./Popover-BwDsI_Bd.js";import"./floating-ui.react-NqINbjK8.js";import"./Date.Input-9SqZ1cqs.js";import"./useFormField-DQ2U86-F.js";import"./ChevronDown-DrvMofhM.js";import"./Modal.context-wTC2bp0_.js";import"./DismissableLayer-HBItTf3b.js";import"./useDescendant-C4of8rWj.js";import"./useClientLayoutEffect-D6BRyFP4.js";import"./Pencil-CJ8diRAl.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
