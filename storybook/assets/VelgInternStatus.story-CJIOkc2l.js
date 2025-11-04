import{P as s,j as i}from"./iframe-BqqySmLp.js";import{V as n}from"./VelgInternStatus-2icUe3G7.js";import{w as d,c as o}from"./ContextDecorators-B5oB19gW.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BKHZX3gU.js";import"./Tag-IBbczY_i.js";import"./CircleSlash-BKiEDOHP.js";import"./XMarkOctagon-CicQDwMi.js";import"./Reception-QGNHdyS4.js";import"./SealCheckmark-C39UMSCa.js";import"./PersonChat-CoHcV8Ft.js";import"./MagnifyingGlass-DDVgTIni.js";import"./KandidatlisteContext-B9OXJk3i.js";import"./OrganisasjonsnummerAlert-kkbhqWlF.js";import"./VStack-BtxADtMi.js";import"./BasePrimitive-BWzRNP55.js";import"./List-Dl1pxlvW.js";import"./Link-Aullpp7r.js";import"./KandidatHendelseTag-lpezpa5f.js";import"./ChatExclamationmark-CXSpNDx3.js";import"./FileXMark-C4vWb03I.js";import"./Trash-DCOqJRkl.js";import"./HandShakeHeart-3fqyHM30.js";import"./Calendar-0jmLLsES.js";import"./ThumbUp-0bgjpBki.js";import"./Table-Ct2DEnrv.js";import"./util-DU_KQZE4.js";import"./parse-C6VNkl2A.js";import"./getDefaultOptions-DvDgDEsD.js";import"./parseISO-CNsO-bOz.js";import"./index-CveF8mzD.js";import"./index-B40KJ5b4.js";import"./isBefore-CVPzrcI2.js";import"./util-vYIPvJw_.js";import"./Dropdown-BaQY3VEK.js";import"./useControllableState-CEMIviyc.js";import"./Popover-Cp2U-ZeG.js";import"./floating-ui.react-B-xuQX2d.js";import"./Date.Input-jDUq28oh.js";import"./useFormField-7OmZcCS_.js";import"./ChevronDown-BnApHggW.js";import"./Modal.context-CnB7G1fS.js";import"./DismissableLayer-BBWvjv4X.js";import"./useDescendant-BLkzZ4qU.js";import"./useClientLayoutEffect-Bb3HpSJf.js";import"./Pencil-B22dur5y.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
