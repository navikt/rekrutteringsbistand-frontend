import{Y as s,j as i}from"./iframe-BA8lGxgc.js";import{V as n}from"./VelgInternStatus-BLpHKZWV.js";import{w as d,c as o}from"./ContextDecorators-BnDH9sr3.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DUWuxGJ6.js";import"./Tag-CYMsqiOQ.js";import"./CircleSlash-ocsVngus.js";import"./XMarkOctagon-DKyImvnb.js";import"./Reception-XeXay7mI.js";import"./SealCheckmark-Cf185uiy.js";import"./PersonChat-CNIvwipg.js";import"./MagnifyingGlass-DlQ3UPSN.js";import"./KandidatlisteContext-xIeaODv6.js";import"./OrganisasjonsnummerAlert-2VNoVFHS.js";import"./VStack-DqzLThnb.js";import"./BasePrimitive-CzcpJyoT.js";import"./List-D5E-FGmL.js";import"./Link-DeXU7FXb.js";import"./KandidatHendelseTag-BcjMiIdK.js";import"./ChatExclamationmark-B6cQYi_k.js";import"./FileXMark-BAgWfogE.js";import"./Trash-C1yt_cag.js";import"./HandShakeHeart-DZhiV6m5.js";import"./Calendar-CwN-hPGG.js";import"./ThumbUp-BAiA4eiW.js";import"./Table-CqBmIssP.js";import"./index-Bx4qJFrm.js";import"./index-B40KJ5b4.js";import"./util-Cu4x6vVJ.js";import"./Dropdown-DlVbYCV8.js";import"./useControllableState-sTcONFh0.js";import"./Popover-EC24xk5G.js";import"./floating-ui.react-oXij7_b1.js";import"./Date.Input-DD4Kcipt.js";import"./useFormField-DmljyEKY.js";import"./ChevronDown-BTdMiVCP.js";import"./Modal.context-B3p26qHn.js";import"./DismissableLayer-Cs8olJS3.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CGYyINhG.js";import"./Pencil-CdLSCBUn.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
