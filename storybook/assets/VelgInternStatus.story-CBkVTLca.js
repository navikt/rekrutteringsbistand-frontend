import{Y as s,j as i}from"./iframe-Xu6LCdLp.js";import{w as d,c as o}from"./ContextDecorators-DWwF5DWm.js";import{V as n}from"./VelgInternStatus-l2iN-ul-.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CxrfUA4z.js";import"./OrganisasjonsnummerAlert-DEF4CGMU.js";import"./VStack-B8yWg0yF.js";import"./BasePrimitive-Do-NJpc0.js";import"./List-CqCvDNK_.js";import"./Link-BY2fBes3.js";import"./KandidatHendelseTag-2e-ynWB9.js";import"./Tag-ChTYVXm_.js";import"./ChatExclamationmark-D3hGO4dV.js";import"./FileXMark-CwcxO-Ee.js";import"./Trash-C3OJiBqw.js";import"./HandShakeHeart-CZCByx4B.js";import"./Calendar-CnhQo0Li.js";import"./ThumbUp-Dt52FnrT.js";import"./Table-Bl65rNr_.js";import"./util-CAiyUaV6.js";import"./format-DPX7Su2y.js";import"./match-JhzIkmE4.js";import"./parse-BCmSvDHV.js";import"./getDefaultOptions-DViSjfbX.js";import"./parseISO-DtzgeS_I.js";import"./util-D_4CsoMS.js";import"./InternStatusTag-BLzdeJfV.js";import"./CircleSlash-D7VLjvYJ.js";import"./XMarkOctagon-BhWrGKos.js";import"./Reception-DyjbzTRx.js";import"./SealCheckmark-Ds6qqjzc.js";import"./PersonChat-CqAgQRjP.js";import"./MagnifyingGlass-B8OISjOW.js";import"./Dropdown-DJey6BJ7.js";import"./useControllableState-BPvVIkLJ.js";import"./Popover-DNgvg7pU.js";import"./floating-ui.react-BSQ1kU2M.js";import"./Date.Input-jERI6tCM.js";import"./useFormField-CFXIANGa.js";import"./ChevronDown-DWtuC2j8.js";import"./Modal.context-X5ow3xPo.js";import"./DismissableLayer-D53PC-bl.js";import"./useDescendant-DrDuq-kT.js";import"./useClientLayoutEffect-COLXtTwU.js";import"./Pencil-DAq-kYCv.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,tt as default};
