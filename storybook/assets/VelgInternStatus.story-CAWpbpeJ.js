import{N as s,j as i}from"./iframe-C0RnufXY.js";import{V as n}from"./VelgInternStatus-eJBj4YKn.js";import{w as d,c as o}from"./ContextDecorators-DSK2hJy6.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BVNY5H2R.js";import"./Tag-DRzUowny.js";import"./CircleSlash-D8jCZ0JP.js";import"./XMarkOctagon-Bum01GiJ.js";import"./Reception-CpT6zxnu.js";import"./SealCheckmark-DdfFw32_.js";import"./PersonChat-BH0CtMA0.js";import"./MagnifyingGlass-CH9oasaw.js";import"./KandidatlisteContext-wB6bumNi.js";import"./OrganisasjonsnummerAlert-BCxdIMXO.js";import"./VStack-BCxO0S0u.js";import"./BasePrimitive-BpW17Mon.js";import"./Box-vRWMR1wU.js";import"./List-DRDq3cqn.js";import"./Link-Byz21SDj.js";import"./KandidatHendelseTag-BBnI298W.js";import"./ChatExclamationmark-2nn0xS5c.js";import"./FileXMark-BosuBZnb.js";import"./Trash-CjDRZ1Gk.js";import"./HandShakeHeart-GRgLuVNm.js";import"./Calendar-6loLCvZB.js";import"./ThumbUp-C6OwJlt6.js";import"./ExclamationmarkTriangle-QPfihTJi.js";import"./Table-CAsc9rbz.js";import"./index-ieblspgF.js";import"./index-B40KJ5b4.js";import"./util-Of1ExplY.js";import"./Dropdown-CIAJeJkU.js";import"./useControllableState-lgVaH3ap.js";import"./Popover-CUe2V1LX.js";import"./floating-ui.react-CGo4gJhe.js";import"./Modal.context-wSuQQ2Dw.js";import"./DismissableLayer-CJroQpy8.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C6JTGAWP.js";import"./Pencil-B-p77gxX.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
