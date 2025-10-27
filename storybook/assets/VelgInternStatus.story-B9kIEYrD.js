import{Y as s,j as i}from"./iframe-BebJRiVm.js";import{w as d,c as o}from"./ContextDecorators-DNLxfNwR.js";import{V as n}from"./VelgInternStatus-B0YcnWs2.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-joEcD6VU.js";import"./OrganisasjonsnummerAlert-B58diLk8.js";import"./VStack-ieBgEx_9.js";import"./BasePrimitive-D6Zi2XAC.js";import"./List-D9elBhoj.js";import"./Link-4eNfuCYY.js";import"./KandidatHendelseTag-AB7hUi_-.js";import"./Tag-CL3kJ4mm.js";import"./ChatExclamationmark-Bn6IsHl0.js";import"./FileXMark-DbPiFMgP.js";import"./Trash-DqIrZuIv.js";import"./HandShakeHeart-tczTNArD.js";import"./Calendar-DanYuDDB.js";import"./ThumbUp-_prN9aAy.js";import"./Table-C_EgM2uL.js";import"./util-D15lQn--.js";import"./format-CJcTvnkY.js";import"./match-DfPDRPQM.js";import"./parse-BXYDRMTi.js";import"./getDefaultOptions-B7iLoQN-.js";import"./parseISO-CrR--Dkd.js";import"./index-CjyM3s74.js";import"./index-B40KJ5b4.js";import"./isBefore-DChyuHjT.js";import"./util-CA16XgRB.js";import"./InternStatusTag-1g0X25aP.js";import"./CircleSlash-BcIq-Uwh.js";import"./XMarkOctagon-Okfo1It2.js";import"./Reception-CRL-Y6lA.js";import"./SealCheckmark-jvH1qdGf.js";import"./PersonChat-CltuADHG.js";import"./MagnifyingGlass-CM2qzta3.js";import"./Dropdown-C1YgZa11.js";import"./useControllableState-C2NTHZgX.js";import"./Popover-B5k_G3vw.js";import"./floating-ui.react-XWokGLuC.js";import"./Date.Input-ChXEZ9KO.js";import"./useFormField-mSV91YqM.js";import"./ChevronDown-Dvj_iGkM.js";import"./Modal.context-pT0tppVX.js";import"./DismissableLayer-Dpt2aX5Q.js";import"./useDescendant-DfTKdJgi.js";import"./useClientLayoutEffect-C3jk9aW7.js";import"./Pencil-CroXyOgI.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
