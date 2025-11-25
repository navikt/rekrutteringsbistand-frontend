import{Y as s,j as i}from"./iframe-k3RGaKPd.js";import{V as n}from"./VelgInternStatus-CFQk7VxY.js";import{w as d,c as o}from"./ContextDecorators-Dr1Ym308.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-_Z0wYss5.js";import"./Tag-D2EE5Q68.js";import"./CircleSlash-DM72WGCQ.js";import"./XMarkOctagon-D7haxSrn.js";import"./Reception-C8HUsjtN.js";import"./SealCheckmark-um3UXQE1.js";import"./PersonChat-Bl9isD4p.js";import"./MagnifyingGlass-C2WJLaRG.js";import"./KandidatlisteContext-DZQaD31H.js";import"./OrganisasjonsnummerAlert-DdVrF-pr.js";import"./VStack-gaRuQisA.js";import"./BasePrimitive-oWqdiEpB.js";import"./List-DO6c7SaU.js";import"./Link-m72qJRKd.js";import"./KandidatHendelseTag-BrAO8gll.js";import"./ChatExclamationmark-DF0O3gg9.js";import"./FileXMark-l5PPGv7A.js";import"./Trash-Y-vpwXcT.js";import"./HandShakeHeart-B3fF5Ubu.js";import"./Calendar-BYpfA5n7.js";import"./ThumbUp-Btvsstwl.js";import"./Table-BKOBBStb.js";import"./index-X_-WxcWH.js";import"./index-B40KJ5b4.js";import"./util-By0TYWmq.js";import"./Dropdown-BjxtcuAD.js";import"./useControllableState-GOU9ZhGX.js";import"./Popover-CNJvrg3T.js";import"./floating-ui.react-BKoOdG6k.js";import"./Date.Input-D2Xin510.js";import"./useFormField-CBigW7mh.js";import"./ChevronDown-jAKfA1Ii.js";import"./Modal.context-D1Ki8ylF.js";import"./DismissableLayer-DyUQ-l04.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CfmyerqT.js";import"./Pencil-BF6DDj5t.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
