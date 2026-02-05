import{N as s,j as i}from"./iframe-8PA8JIpM.js";import{V as n}from"./VelgInternStatus-Dww9l00R.js";import{w as d,c as o}from"./ContextDecorators-693wbuSs.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BlDqFLH3.js";import"./Tag-DdN6yDgJ.js";import"./CircleSlash-C8qKVGTO.js";import"./XMarkOctagon-CcSAYD00.js";import"./Reception-CH3bAfLY.js";import"./SealCheckmark-BblUMZrK.js";import"./PersonChat-Q6AFZMlx.js";import"./MagnifyingGlass-Cx_BJ-z8.js";import"./KandidatlisteContext-DjDIdn6k.js";import"./OrganisasjonsnummerAlert-BF-uqVZd.js";import"./VStack-C5TklDBs.js";import"./BasePrimitive-CS6dP3kN.js";import"./Box-lNhXOLcS.js";import"./List-L5kmjqNb.js";import"./Link-DwOhcXtK.js";import"./KandidatHendelseTag-D1-JW3PQ.js";import"./ChatExclamationmark-C76uizCL.js";import"./FileXMark-DW8LQ00M.js";import"./Trash-CsbrXyGo.js";import"./HandShakeHeart-BeW9pxc7.js";import"./Calendar-CiGgD1Wd.js";import"./ThumbUp-CyJ_juv6.js";import"./ExclamationmarkTriangle-U8KhXais.js";import"./Table-BnGeDy7b.js";import"./index-CP1sWLEr.js";import"./index-B40KJ5b4.js";import"./util-Qt-ynxAK.js";import"./Dropdown-CpjBlGu8.js";import"./useControllableState-BO1oWSXl.js";import"./Popover-B0-KeiIa.js";import"./floating-ui.react-DA3NzabH.js";import"./Modal.context-D15DMEGj.js";import"./DismissableLayer-D5QKxWcX.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BuANfnd3.js";import"./Pencil-lIymkSgC.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
