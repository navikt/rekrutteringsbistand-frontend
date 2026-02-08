import{N as s,j as i}from"./iframe-YHW4kXZv.js";import{V as n}from"./VelgInternStatus-Dp9WA2Js.js";import{w as d,c as o}from"./ContextDecorators-DDTpUM0F.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BsO2B9tE.js";import"./Tag-BAyHvYyb.js";import"./CircleSlash-BzIYmOkh.js";import"./XMarkOctagon-LWogM7VU.js";import"./Reception-D72900jt.js";import"./SealCheckmark-BYeeIdu7.js";import"./PersonChat-BgTCYp_a.js";import"./MagnifyingGlass-DMrzBzFV.js";import"./KandidatlisteContext-BvkxYlct.js";import"./OrganisasjonsnummerAlert-DV8gw3L3.js";import"./VStack-Dp5vHBfm.js";import"./BasePrimitive-C-ojZHC8.js";import"./Box-1ghu6X00.js";import"./List-CQBFO1Og.js";import"./Link-DlrFKguL.js";import"./KandidatHendelseTag-LcSqDNI6.js";import"./ChatExclamationmark-DIOXg4cS.js";import"./FileXMark-CBMm6RAT.js";import"./Trash-D6xaqT6E.js";import"./HandShakeHeart-CqGmJPyT.js";import"./Calendar-CtAhEP7Z.js";import"./ThumbUp-DwgYdscX.js";import"./ExclamationmarkTriangle-DMpQqrc7.js";import"./Table-DDuqGOmb.js";import"./index-7WDwZ5Wk.js";import"./index-B40KJ5b4.js";import"./util-BiAbxkke.js";import"./Dropdown-DoE10UUu.js";import"./useControllableState-DBDJpPfm.js";import"./Popover-BwGeo-R_.js";import"./floating-ui.react-Db5h8fgu.js";import"./Modal.context-C4wiLZa4.js";import"./DismissableLayer-BjppdLKT.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BQ4GNSxx.js";import"./Pencil-Fvj561DJ.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
