import{N as s,j as i}from"./iframe-iYTVubkb.js";import{V as n}from"./VelgInternStatus-xBqhXU5C.js";import{w as d,c as o}from"./ContextDecorators-DpKP4PxZ.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-ByVF6LfH.js";import"./Tag-Bo6lmjnk.js";import"./CircleSlash-DP1rypeg.js";import"./XMarkOctagon-CYJQW3ES.js";import"./Reception-CYoUZvBK.js";import"./SealCheckmark-B-SRr_9p.js";import"./PersonChat-HVnxUi9q.js";import"./MagnifyingGlass-CB6XmMoW.js";import"./KandidatlisteContext-y7ebpxGz.js";import"./OrganisasjonsnummerAlert-DAEs0rwZ.js";import"./VStack-CkGe8GD2.js";import"./BasePrimitive-boMTAT3N.js";import"./Box-BfsKMp9T.js";import"./List-B7AiJCK7.js";import"./Link-C2bgvx0K.js";import"./KandidatHendelseTag-2jNrj2wf.js";import"./ChatExclamationmark-JmG1reqm.js";import"./FileXMark-CPW7kJ2g.js";import"./Trash-BFfxe-zj.js";import"./HandShakeHeart-CXOdnKtA.js";import"./Calendar-BfOwb4Q1.js";import"./ThumbUp-C9CFps8H.js";import"./ExclamationmarkTriangle-BsjgR85I.js";import"./Table-CPKuIuGE.js";import"./index-BJx6qXND.js";import"./index-B40KJ5b4.js";import"./util-CvOq8zPN.js";import"./Dropdown-BPVeiGGF.js";import"./useControllableState-B7MdJ9VK.js";import"./Popover-BaFwoxII.js";import"./floating-ui.react-DyKrx9yB.js";import"./Modal.context-0kHKZyTP.js";import"./DismissableLayer-B6vF3936.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-D2kexCYt.js";import"./Pencil-DSJ8pzM-.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
