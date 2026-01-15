import{O as s,j as i}from"./iframe-BVpQlhXu.js";import{V as n}from"./VelgInternStatus-CJXbicU8.js";import{w as d,c as o}from"./ContextDecorators-POtdOfgt.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DAAFyhKK.js";import"./Tag-C3Ns-E6i.js";import"./CircleSlash-BIQ2EaNy.js";import"./XMarkOctagon-BmMg5mwn.js";import"./Reception-CejcQ8_A.js";import"./SealCheckmark-ClrsZBOK.js";import"./PersonChat-DcpvuHRs.js";import"./MagnifyingGlass-CVO-V0p-.js";import"./KandidatlisteContext-xWK2vGKb.js";import"./OrganisasjonsnummerAlert-D88qbzcp.js";import"./VStack-BlOHU-0T.js";import"./BasePrimitive-CjllcUPO.js";import"./List-DNLt3jEI.js";import"./Link-BFymvS_W.js";import"./KandidatHendelseTag-0d_ofy_p.js";import"./ChatExclamationmark-CN_Z3M77.js";import"./FileXMark-Cqwhuf8x.js";import"./Trash-CXt3Z_EP.js";import"./HandShakeHeart-BlEIaLmf.js";import"./Calendar-WyB0cMbI.js";import"./ThumbUp-AQ4KgzJP.js";import"./ExclamationmarkTriangle-3r4Z2Jmc.js";import"./Table-ClebMMPG.js";import"./index-C9yN7hBY.js";import"./index-B40KJ5b4.js";import"./util-Dq2C0rzv.js";import"./Dropdown-BphWxb5E.js";import"./useControllableState-J-GqUv9G.js";import"./Popover-NiLXsyyw.js";import"./floating-ui.react-3U288saN.js";import"./Date.Input-KCgvmNDy.js";import"./useFormField-YVNxZSU4.js";import"./ChevronDown-BiNlS0AG.js";import"./Modal.context-n9RJuXC-.js";import"./DismissableLayer-DNoYzt-k.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C2oyJy3J.js";import"./Pencil-DoMHDGWr.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
