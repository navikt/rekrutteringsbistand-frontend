import{N as s,j as i}from"./iframe-D9qA_9GD.js";import{V as n}from"./VelgInternStatus-CZnt9evA.js";import{w as d,c as o}from"./ContextDecorators-CUV7kzNL.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-Bw0Pa6n-.js";import"./Tag-DTbGS8uf.js";import"./CircleSlash-BcO5s98Y.js";import"./XMarkOctagon-BYKCKXLL.js";import"./Reception-BR9-1Td5.js";import"./SealCheckmark-CiEP2N78.js";import"./PersonChat-CBs-k3bA.js";import"./MagnifyingGlass-DE0AXRUy.js";import"./KandidatlisteContext-C_BO5PDv.js";import"./OrganisasjonsnummerAlert-EKu8OGew.js";import"./VStack-F9byACb6.js";import"./BasePrimitive-BTVpI0SI.js";import"./Box-BQY138F7.js";import"./List-DC6PMjkG.js";import"./Link-CoHpPI50.js";import"./KandidatHendelseTag-Di8dUZOx.js";import"./ChatExclamationmark-D5TWuosh.js";import"./FileXMark-DvRu4AlR.js";import"./Trash-K0ldOWId.js";import"./HandShakeHeart-Dn0qVttd.js";import"./Calendar-Brz02_Oy.js";import"./ThumbUp-CmCH1kLN.js";import"./ExclamationmarkTriangle-C-9Ff1cH.js";import"./Table-8iZyNf9F.js";import"./index-DsbKVEBS.js";import"./index-B40KJ5b4.js";import"./util-LuhOfgaI.js";import"./Dropdown-BHYf7TK2.js";import"./useControllableState-BQN1ohGC.js";import"./Popover-DEBgH9We.js";import"./floating-ui.react-CBDWNK4Z.js";import"./Modal.context-B_18zVZi.js";import"./DismissableLayer-C12o3Eot.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-GzQGtyHt.js";import"./Pencil-B12-p5lM.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
