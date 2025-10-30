import{Y as s,j as i}from"./iframe-Dn6oOtbf.js";import{w as d,c as o}from"./ContextDecorators-BSbBHpwK.js";import{V as n}from"./VelgInternStatus-CGdRjvBq.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-dK394pnf.js";import"./OrganisasjonsnummerAlert-D5-jFYKp.js";import"./VStack-1Y06ajMB.js";import"./BasePrimitive-M-VNSZSQ.js";import"./List-Bu_qaqD6.js";import"./Link-DeUJpW5N.js";import"./KandidatHendelseTag-DVdlj2i_.js";import"./Tag-BaUOFaZU.js";import"./ChatExclamationmark-9Thb-iIS.js";import"./FileXMark-cXbFvwSu.js";import"./Trash-B9vT4zgD.js";import"./HandShakeHeart-rKAmRAyZ.js";import"./Calendar-CHtXvFtN.js";import"./ThumbUp-BGxaKFAm.js";import"./Table-By0dovrZ.js";import"./util-BLWTfEaX.js";import"./format-C0S4jMUI.js";import"./match-DH_fZqpI.js";import"./parse-VVjy0MJj.js";import"./getDefaultOptions-DBO-DaTO.js";import"./parseISO-Cf7-iP2x.js";import"./index-Cc-rxqI-.js";import"./index-B40KJ5b4.js";import"./isBefore-B9Mk30_B.js";import"./util-Bsw3rW9y.js";import"./InternStatusTag-NEWfUCD9.js";import"./CircleSlash-CzbwozWE.js";import"./XMarkOctagon-ySHZMimH.js";import"./Reception-DnSnA2Qj.js";import"./SealCheckmark-CiMVogXV.js";import"./PersonChat-zXcrBmO7.js";import"./MagnifyingGlass-Bh93ovlZ.js";import"./Dropdown-CNvv6Ga6.js";import"./useControllableState-CgPyIzFT.js";import"./Popover-CUlSyV2L.js";import"./floating-ui.react-506kzj2V.js";import"./Date.Input-C-6OEEjw.js";import"./useFormField-CXUgeBOA.js";import"./ChevronDown-n1n2toSX.js";import"./Modal.context-3AglHSQc.js";import"./DismissableLayer-rE89-BAl.js";import"./useDescendant-BLB7meWF.js";import"./useClientLayoutEffect-BczMoVgo.js";import"./Pencil-C12a6eCX.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
