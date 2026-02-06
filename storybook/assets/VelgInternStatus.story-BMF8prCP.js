import{N as s,j as i}from"./iframe-CS4cw4gB.js";import{V as n}from"./VelgInternStatus-ChtR0rX_.js";import{w as d,c as o}from"./ContextDecorators-BYson2Tm.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BsMzw0Je.js";import"./Tag-DHnluFVD.js";import"./CircleSlash-Cy_b0hO1.js";import"./XMarkOctagon-CNcoGV0I.js";import"./Reception-jSC6S3De.js";import"./SealCheckmark-CyxAXdNN.js";import"./PersonChat-CTIAH8cM.js";import"./MagnifyingGlass-BpV6PsBc.js";import"./KandidatlisteContext-BtHFg94K.js";import"./OrganisasjonsnummerAlert-DjukhxoG.js";import"./VStack-BxLT0d6X.js";import"./BasePrimitive-DDMhX20D.js";import"./Box-BVPjClTp.js";import"./List-AWxqnavx.js";import"./Link-CdKIer7e.js";import"./KandidatHendelseTag-Dim6KXxF.js";import"./ChatExclamationmark-t88kacSQ.js";import"./FileXMark-Bnhenm1k.js";import"./Trash-CXIR7oXi.js";import"./HandShakeHeart-up2aL-a2.js";import"./Calendar-BxkcVKI0.js";import"./ThumbUp-CCLqk3ge.js";import"./ExclamationmarkTriangle-eudKkerf.js";import"./Table-DJs7crw0.js";import"./index-CFZJFg7l.js";import"./index-B40KJ5b4.js";import"./util-BdeMvgko.js";import"./Dropdown-BCrJWO1t.js";import"./useControllableState-d5HlKukQ.js";import"./Popover-C7vs6pPC.js";import"./floating-ui.react-CvEZw-0s.js";import"./Modal.context-Cq02MwlR.js";import"./DismissableLayer-BWglAePK.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C1L6rLPT.js";import"./Pencil-D-g0pXTM.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
