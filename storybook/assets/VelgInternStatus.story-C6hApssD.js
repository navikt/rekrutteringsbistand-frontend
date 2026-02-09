import{N as s,j as i}from"./iframe-DBllXDE6.js";import{V as n}from"./VelgInternStatus-Dha1u-rZ.js";import{w as d,c as o}from"./ContextDecorators-B_BK9iNO.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-B_sCUXta.js";import"./Tag-ppAPxM7K.js";import"./CircleSlash-BFeQ1KgF.js";import"./XMarkOctagon-C45wKq-z.js";import"./Reception-B2mJd0ZY.js";import"./SealCheckmark-zeT83CBZ.js";import"./PersonChat-BE-pDjoc.js";import"./MagnifyingGlass-6nVkGLY0.js";import"./KandidatlisteContext-kXblc7I7.js";import"./OrganisasjonsnummerAlert-ChauTF1b.js";import"./VStack-BD7vwMWP.js";import"./BasePrimitive-Dy27TjR7.js";import"./Box-B8ditvDu.js";import"./List-BHSGpnq6.js";import"./Link-X5_nQ1b-.js";import"./KandidatHendelseTag-BPulh5dW.js";import"./ChatExclamationmark-DwgjDjfq.js";import"./FileXMark-CS2GvD_8.js";import"./Trash-CPjP9X6q.js";import"./HandShakeHeart-YFQvRBxE.js";import"./Calendar-DtsvWMGM.js";import"./ThumbUp-BujwmZbZ.js";import"./ExclamationmarkTriangle-DgAc2FcK.js";import"./Table-DftGWK19.js";import"./index-DjVoES3y.js";import"./index-B40KJ5b4.js";import"./util-BOT7NFvd.js";import"./Dropdown-OS_XDnQS.js";import"./useControllableState-DZW3T6vT.js";import"./Popover-s67kx-HJ.js";import"./floating-ui.react-nbAYDEcq.js";import"./Modal.context-BeoIJEhX.js";import"./DismissableLayer-BqVzK-jb.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-XU4krQMi.js";import"./Pencil-UV_U6fYC.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
