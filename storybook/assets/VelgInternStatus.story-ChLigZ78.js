import{O as s,j as i}from"./iframe-Dyt_T7m6.js";import{V as n}from"./VelgInternStatus-BMR8Pg8v.js";import{w as d,c as o}from"./ContextDecorators-DMvTp1PY.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BN5X8rh0.js";import"./Tag-D4Y1Cqw5.js";import"./CircleSlash-2likqTnr.js";import"./XMarkOctagon-Q5tAXbRK.js";import"./Reception-BslrWEAv.js";import"./SealCheckmark-B4VhrFrV.js";import"./PersonChat-BIaxMZy9.js";import"./MagnifyingGlass-D6ZEtkSZ.js";import"./KandidatlisteContext-BmQ3_LZW.js";import"./OrganisasjonsnummerAlert-DTZjl3VS.js";import"./VStack-DWc1CUQh.js";import"./BasePrimitive-C1_093tT.js";import"./List-Bt7-k4HX.js";import"./Link-BCv8MBzM.js";import"./KandidatHendelseTag-Y0mgIzOj.js";import"./ChatExclamationmark-BVdSPkea.js";import"./FileXMark-DoKWH1ss.js";import"./Trash-DZwPj-5f.js";import"./HandShakeHeart-DPccg_IV.js";import"./Calendar-CeSAK0Un.js";import"./ThumbUp-Dzc_N9Xd.js";import"./ExclamationmarkTriangle-BdW4S9lt.js";import"./Table-BuuVOVox.js";import"./index-BRPiLR4n.js";import"./index-B40KJ5b4.js";import"./util-DIY1dJO9.js";import"./Dropdown-CNOZkpkY.js";import"./useControllableState-eGZPEQXj.js";import"./Popover-DIA0-Xf2.js";import"./floating-ui.react-3SqnOr-M.js";import"./Date.Input-CBzSduVo.js";import"./useFormField-dlOh0Y30.js";import"./ChevronDown-B0uTgkqP.js";import"./Modal.context-BfInQaLM.js";import"./DismissableLayer-C1EC1IHS.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Ckgmqoa4.js";import"./Pencil-Coe4K03a.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
