import{P as s,j as i}from"./iframe-CeRr706s.js";import{V as n}from"./VelgInternStatus-D2P9glVR.js";import{w as d,c as o}from"./ContextDecorators-Bfu2QykV.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CsmrJS1e.js";import"./Tag-COiHsKc8.js";import"./CircleSlash-HTsgclPV.js";import"./XMarkOctagon-BIm4hFV9.js";import"./Reception-CcfRWoRq.js";import"./SealCheckmark-mgXXYRMa.js";import"./PersonChat-BB-gSrc5.js";import"./MagnifyingGlass-BjmLB6zi.js";import"./KandidatlisteContext-t-NNv3ML.js";import"./OrganisasjonsnummerAlert-DArB_n8_.js";import"./VStack-BelJx2wb.js";import"./BasePrimitive-bH-Ec4lL.js";import"./List-DubIZyNA.js";import"./Link-GZDYPOdI.js";import"./KandidatHendelseTag-BrwLnTpB.js";import"./ChatExclamationmark-BgHOufrW.js";import"./FileXMark-DkNPmIu-.js";import"./Trash-C3RC9Rc8.js";import"./HandShakeHeart-DLwMcxfs.js";import"./Calendar-CZar09bd.js";import"./ThumbUp-DN-XLfoI.js";import"./Table-Cp34OQwR.js";import"./util-D6FuQLJq.js";import"./parse-Lh68j0Qc.js";import"./getDefaultOptions-Cs_8Py5K.js";import"./parseISO-Bt3-2cgb.js";import"./index-CdPV1OIk.js";import"./index-B40KJ5b4.js";import"./isBefore-BnvwDNL_.js";import"./util-8YNgQF5q.js";import"./Dropdown-BgEN_ODn.js";import"./useControllableState-7aLFU1jC.js";import"./Popover-By5I6R24.js";import"./floating-ui.react-a2IcLYZ2.js";import"./Date.Input-CTpRzzmZ.js";import"./useFormField-DpsMMUoM.js";import"./ChevronDown-DQUdOqVl.js";import"./Modal.context-CbsAixuf.js";import"./DismissableLayer-DntprCGM.js";import"./useDescendant-DZUSmoVV.js";import"./useClientLayoutEffect-VV1lGVs7.js";import"./Pencil-JfcnNTCC.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
