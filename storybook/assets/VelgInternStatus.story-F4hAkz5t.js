import{O as s,j as i}from"./iframe-rNYAyblL.js";import{V as n}from"./VelgInternStatus-BpL9PLCe.js";import{w as d,c as o}from"./ContextDecorators-BPqfRnt5.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-HvJR0OWV.js";import"./Tag-DNkrPWyg.js";import"./CircleSlash-r14Ixkrr.js";import"./XMarkOctagon-CLuFEiG5.js";import"./Reception-CvlVFUYc.js";import"./SealCheckmark-DTsVL1QQ.js";import"./PersonChat-QmsuIko-.js";import"./MagnifyingGlass-DEUhBIMg.js";import"./KandidatlisteContext-CO2ddy-5.js";import"./OrganisasjonsnummerAlert-CzgwYpbA.js";import"./VStack-WqRGF644.js";import"./BasePrimitive-COwr9NLk.js";import"./List-DRmwuA5i.js";import"./Link-CkTrfJ0n.js";import"./KandidatHendelseTag-DOyvrsmz.js";import"./ChatExclamationmark-CFF3Z5I6.js";import"./FileXMark-BFXbi50E.js";import"./Trash-PlHm6ZLG.js";import"./HandShakeHeart-BjvBEiNL.js";import"./Calendar-CE0uly1Q.js";import"./ThumbUp-CJVDHSEb.js";import"./ExclamationmarkTriangle-CzgBjDOA.js";import"./Table-Cw4Ncz0q.js";import"./index-C_IauyVk.js";import"./index-B40KJ5b4.js";import"./util-1Zl6MYV7.js";import"./Dropdown-B-KO37Zy.js";import"./useControllableState-BIhpMQIW.js";import"./Popover-CzVy6RM6.js";import"./floating-ui.react-CEwq9UDB.js";import"./Date.Input-u30QZWYL.js";import"./useFormField-DO874rDX.js";import"./ChevronDown-DNHVLjgA.js";import"./Modal.context-BOFYqOBv.js";import"./DismissableLayer-sCDQcEC2.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-B9Y6M99n.js";import"./Pencil-CliO7El6.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,Y as default};
