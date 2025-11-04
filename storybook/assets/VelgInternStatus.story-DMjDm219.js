import{P as s,j as i}from"./iframe-cL8k691U.js";import{V as n}from"./VelgInternStatus-CwBOkwrc.js";import{w as d,c as o}from"./ContextDecorators-DE-P30tO.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-C_hZbUx1.js";import"./Tag-CTjVIrDR.js";import"./CircleSlash-DZeLc0qE.js";import"./XMarkOctagon-CKLeOWxC.js";import"./Reception-B10YGPzZ.js";import"./SealCheckmark-vYpe0Z9w.js";import"./PersonChat-09awbdQ6.js";import"./MagnifyingGlass-DF7Pc6CA.js";import"./KandidatlisteContext-BG5hZA_D.js";import"./OrganisasjonsnummerAlert-NrQAbFYq.js";import"./VStack-D6jQNN7_.js";import"./BasePrimitive-CIPF40MM.js";import"./List-DTLTVjrE.js";import"./Link-BHJm8HGk.js";import"./KandidatHendelseTag-CvrfWkPD.js";import"./ChatExclamationmark-jLeRVtqi.js";import"./FileXMark-BrsEB1Ls.js";import"./Trash-Cz3qXP6k.js";import"./HandShakeHeart-BHN2WbX7.js";import"./Calendar-hrUqvLah.js";import"./ThumbUp-Da4_9b7o.js";import"./Table-CEVrlXgH.js";import"./util-G5pIvmc4.js";import"./parse-CiIzdRuc.js";import"./getDefaultOptions-BrAag-BB.js";import"./parseISO-D2I8ust4.js";import"./index-U826ktB1.js";import"./index-B40KJ5b4.js";import"./isBefore-CwK-2bUN.js";import"./util-CkGQiHDj.js";import"./Dropdown-CY_utg18.js";import"./useControllableState-DTJY2lFz.js";import"./Popover-CvqrIbVk.js";import"./floating-ui.react-DfESSBbJ.js";import"./Date.Input-jPYHkUOs.js";import"./useFormField-CGY7xPma.js";import"./ChevronDown-6zbRKb5v.js";import"./Modal.context-BJG8Br9n.js";import"./DismissableLayer-CAZiRAZF.js";import"./useDescendant-Cn-T47ra.js";import"./useClientLayoutEffect-DUQJUa8d.js";import"./Pencil-BvDzQrfX.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
