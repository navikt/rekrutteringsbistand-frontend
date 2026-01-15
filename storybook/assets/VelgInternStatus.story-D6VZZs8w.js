import{O as s,j as i}from"./iframe-D9efq7gm.js";import{V as n}from"./VelgInternStatus-D9DikRAV.js";import{w as d,c as o}from"./ContextDecorators-WYe_o80N.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BNr3Dgbb.js";import"./Tag-VuDPtMMo.js";import"./CircleSlash-CM6yEjZ8.js";import"./XMarkOctagon-JCcppVRc.js";import"./Reception-k8Q-JEi1.js";import"./SealCheckmark-BfSx8Q1i.js";import"./PersonChat-CThNUHPJ.js";import"./MagnifyingGlass-BysrBsTI.js";import"./KandidatlisteContext-Qovu6sPZ.js";import"./OrganisasjonsnummerAlert-zOlyC-ht.js";import"./VStack-D9lq_a4Y.js";import"./BasePrimitive-BzWnuIU4.js";import"./List-4TSCPVGQ.js";import"./Link-BHqVFeiD.js";import"./KandidatHendelseTag-CqGO6C7b.js";import"./ChatExclamationmark-DE2gpsk9.js";import"./FileXMark-BxcFT4qE.js";import"./Trash-D_YgXyyT.js";import"./HandShakeHeart-BIe_nHom.js";import"./Calendar-B870ooCh.js";import"./ThumbUp-C_Rne1Rb.js";import"./ExclamationmarkTriangle-DoHZ6yS1.js";import"./Table-m3oZFwvc.js";import"./index-BzgkzeDT.js";import"./index-B40KJ5b4.js";import"./util-M2qWKBBT.js";import"./Dropdown-Da8_QX1T.js";import"./useControllableState-CeE_Zg6y.js";import"./Popover-D-tV0aE0.js";import"./floating-ui.react-Bp_BnijO.js";import"./Date.Input-Dcou4NvS.js";import"./useFormField-BjBsX3sj.js";import"./ChevronDown-BkInPlEQ.js";import"./Modal.context-BS_OZFTE.js";import"./DismissableLayer-wq39k6jE.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-dTbrXiSO.js";import"./Pencil-CbiadFAv.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
