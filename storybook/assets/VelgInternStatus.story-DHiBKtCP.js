import{P as s,j as i}from"./iframe-BHoMFX67.js";import{V as n}from"./VelgInternStatus-xRRuyQae.js";import{w as d,c as o}from"./ContextDecorators-DQhViAGk.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CJ_lczlB.js";import"./Tag-DCWS9W5D.js";import"./CircleSlash-BDsGxOpt.js";import"./XMarkOctagon-B7B1kDZ0.js";import"./Reception-CSIj1yXC.js";import"./SealCheckmark-DldJbsQC.js";import"./PersonChat-CLqsvMXs.js";import"./MagnifyingGlass-Bbob-WbF.js";import"./KandidatlisteContext-BIJDxCd7.js";import"./OrganisasjonsnummerAlert-CtyKFJ16.js";import"./VStack-Cb4Fd9NL.js";import"./BasePrimitive-BGvCM3ff.js";import"./List-Ba5nzO8b.js";import"./Link-CfecVY-4.js";import"./KandidatHendelseTag-Bo0o7sHX.js";import"./ChatExclamationmark-DL4qS7ce.js";import"./FileXMark-BVRHyc_E.js";import"./Trash-BTATC9D6.js";import"./HandShakeHeart-DzqcfAnc.js";import"./Calendar-C88ffwOa.js";import"./ThumbUp-Cg6pKAH2.js";import"./Table-Cgi7RIp6.js";import"./util-D6kNqDHc.js";import"./parse-BRSXN0qK.js";import"./getDefaultOptions-DBXf_iNK.js";import"./parseISO-CNxmnplC.js";import"./index-DLOipvgg.js";import"./index-B40KJ5b4.js";import"./isBefore-BK0dGRff.js";import"./util-BVx09jAu.js";import"./Dropdown-CuEKtRT6.js";import"./useControllableState-Diyq5Leq.js";import"./Popover-Ch1sJeSV.js";import"./floating-ui.react-rhOpBHqT.js";import"./Date.Input-DFcY_nsR.js";import"./useFormField-LKhzjTW5.js";import"./ChevronDown-BdJQRWr_.js";import"./Modal.context-CZsrP9EO.js";import"./DismissableLayer-8LE6nfrO.js";import"./useDescendant-DbiH3W67.js";import"./useClientLayoutEffect-CdSSBJMX.js";import"./Pencil--41thc8f.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
