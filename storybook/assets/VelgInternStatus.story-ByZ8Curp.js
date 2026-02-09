import{N as s,j as i}from"./iframe-SGs9n5AY.js";import{V as n}from"./VelgInternStatus-BSbf28MB.js";import{w as d,c as o}from"./ContextDecorators-D847BpTw.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-bBZH-IP2.js";import"./Tag-d0gHNfmq.js";import"./CircleSlash-L7jkpvt2.js";import"./XMarkOctagon-DUi84JSc.js";import"./Reception-B6WXyrvJ.js";import"./SealCheckmark-DF4sww9V.js";import"./PersonChat-DH-Ab2f1.js";import"./MagnifyingGlass-B5r9mTK6.js";import"./KandidatlisteContext-CSR3K4NQ.js";import"./OrganisasjonsnummerAlert-CCXd5l36.js";import"./VStack-DVblRpQg.js";import"./BasePrimitive-DhMYuIXn.js";import"./Box-Cbnrm5kp.js";import"./List-z0o5hgu8.js";import"./Link-BN-rLTot.js";import"./KandidatHendelseTag-lnlzUuNp.js";import"./ChatExclamationmark-BqsYhffn.js";import"./FileXMark-D89fD8rJ.js";import"./Trash-BHgd6Yc7.js";import"./HandShakeHeart-DIjNO2Ne.js";import"./Calendar-BwVmCUoI.js";import"./ThumbUp-G0OPQQAC.js";import"./ExclamationmarkTriangle-Cj_6dZL1.js";import"./Table-BhNtlHIL.js";import"./index-CbUQqlOu.js";import"./index-B40KJ5b4.js";import"./util-Ae9jxT6g.js";import"./Dropdown-BPsXZoK7.js";import"./useControllableState-B3K6rjpl.js";import"./Popover-CRHxe-Ds.js";import"./floating-ui.react-_myRbqhk.js";import"./Modal.context-BKWfvGQj.js";import"./DismissableLayer-qvel5ih6.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-B_bLdoEO.js";import"./Pencil-BdVWVAmb.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,W as default};
