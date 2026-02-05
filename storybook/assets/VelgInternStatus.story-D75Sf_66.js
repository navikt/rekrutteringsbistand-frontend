import{N as s,j as i}from"./iframe-MRLikfE6.js";import{V as n}from"./VelgInternStatus-Btg2WF_U.js";import{w as d,c as o}from"./ContextDecorators-BAyHZ9FA.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CYnoKLwA.js";import"./Tag-C5lbsKPJ.js";import"./CircleSlash-CTkB1tST.js";import"./XMarkOctagon-BsiEdqGb.js";import"./Reception-Dl82XEo1.js";import"./SealCheckmark-q1Zm79vS.js";import"./PersonChat-3fV2-f4v.js";import"./MagnifyingGlass-BJBpzmTe.js";import"./KandidatlisteContext-DEaKwyD5.js";import"./OrganisasjonsnummerAlert-v9-YnsVe.js";import"./VStack-CKga3UqI.js";import"./BasePrimitive-WcRKw7Lq.js";import"./Box-bxckNUtE.js";import"./List-BP1uHXI-.js";import"./Link-BeQsjFWu.js";import"./KandidatHendelseTag-D-p_npeq.js";import"./ChatExclamationmark-iKGH1a-g.js";import"./FileXMark-e4FmmKnZ.js";import"./Trash-BEOwnfEK.js";import"./HandShakeHeart-B9dRyKdy.js";import"./Calendar-fbNZIAKe.js";import"./ThumbUp-DHaJAsfw.js";import"./ExclamationmarkTriangle-D2tLiDIf.js";import"./Table-o5a0zq4E.js";import"./index-ClcRPOe_.js";import"./index-B40KJ5b4.js";import"./util-BK0NQHj-.js";import"./Dropdown-BiiI-dMq.js";import"./useControllableState-CXTqdpiU.js";import"./Popover-EqKKh5VZ.js";import"./floating-ui.react-CPMB3lDK.js";import"./Modal.context-Qf00d-Ga.js";import"./DismissableLayer-BZ4kC1EZ.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Cls70-9d.js";import"./Pencil--NSwDsDi.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
