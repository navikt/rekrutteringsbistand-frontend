import{P as s,j as i}from"./iframe-uGpH5bHE.js";import{V as n}from"./VelgInternStatus-DikXni0f.js";import{w as d,c as o}from"./ContextDecorators-DnXWeFBs.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BWzW7xEI.js";import"./Tag-CIu7y533.js";import"./CircleSlash-CNaeZZyi.js";import"./XMarkOctagon-EujPivqV.js";import"./Reception-DLH2xjN5.js";import"./SealCheckmark-MpB1_3lp.js";import"./PersonChat-QTzZk3P1.js";import"./MagnifyingGlass-CVAlh5g5.js";import"./KandidatlisteContext-BNBMcZ4m.js";import"./OrganisasjonsnummerAlert-CrfVppIj.js";import"./VStack-C6U3-jpr.js";import"./BasePrimitive-DdQYhl9r.js";import"./List-6Cq_JyoF.js";import"./Link-_i-0pCB8.js";import"./KandidatHendelseTag-CbIcfoqq.js";import"./ChatExclamationmark-BGMJYM-O.js";import"./FileXMark-CiYdMBRl.js";import"./Trash-wnzU6iti.js";import"./HandShakeHeart-BBHlLIgg.js";import"./Calendar-EBOO-NN0.js";import"./ThumbUp-DPUW51cg.js";import"./Table-CD4SeFGN.js";import"./util-B5BZJM_V.js";import"./parse-_VpaQtsM.js";import"./getDefaultOptions-CP7UEA2u.js";import"./parseISO-DFYNu8uR.js";import"./index-DzCzZi3c.js";import"./index-B40KJ5b4.js";import"./isBefore-RPGehvCy.js";import"./util-Dr85VjP5.js";import"./Dropdown-BzvYps5N.js";import"./useControllableState-DSpD-_vb.js";import"./Popover-B226ZaKm.js";import"./floating-ui.react-dxPmWD31.js";import"./Date.Input-CDvyQSFD.js";import"./useFormField-Bl3PAVkQ.js";import"./ChevronDown-DrGBd-hu.js";import"./Modal.context-e5xMW6Fz.js";import"./DismissableLayer-Cjhp46-H.js";import"./useDescendant-B1BoJk-w.js";import"./useClientLayoutEffect-Z9eXB4or.js";import"./Pencil-WB3hm_d6.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
