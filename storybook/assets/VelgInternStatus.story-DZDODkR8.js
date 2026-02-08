import{N as s,j as i}from"./iframe-eUZc9IfG.js";import{V as n}from"./VelgInternStatus-D1J_4AB7.js";import{w as d,c as o}from"./ContextDecorators-BWdSNcLB.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DiGG6b2u.js";import"./Tag-AwytiWVx.js";import"./CircleSlash-D7GlXwHI.js";import"./XMarkOctagon-Babihzqq.js";import"./Reception-CHsZYWX7.js";import"./SealCheckmark-DAmiegmq.js";import"./PersonChat-1cbDqs3Y.js";import"./MagnifyingGlass-DbJqbB4y.js";import"./KandidatlisteContext-BaofHeHy.js";import"./OrganisasjonsnummerAlert-CLVHW0AS.js";import"./VStack-D2Q4wvGm.js";import"./BasePrimitive-BRb4WXsy.js";import"./Box-DdDP5BvY.js";import"./List-ywpDV0pm.js";import"./Link-DQzGJyIQ.js";import"./KandidatHendelseTag-BNbvxaRH.js";import"./ChatExclamationmark-99GpV8ND.js";import"./FileXMark-DgKNeLBr.js";import"./Trash-9L1LQghJ.js";import"./HandShakeHeart-i_x7RuNX.js";import"./Calendar-B-bYWFjj.js";import"./ThumbUp-URkaQQLm.js";import"./ExclamationmarkTriangle-BYGexLrb.js";import"./Table-Cb0Zq12V.js";import"./index-DgdLY_0B.js";import"./index-B40KJ5b4.js";import"./util-DuNLAiOk.js";import"./Dropdown-KxwKG9hP.js";import"./useControllableState-Becg88hF.js";import"./Popover-DLvT34V-.js";import"./floating-ui.react-BUuraGRi.js";import"./Modal.context-BIF9Tjeq.js";import"./DismissableLayer-BJaKTL7j.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BJpTkOfa.js";import"./Pencil-D0dRG9Xb.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
