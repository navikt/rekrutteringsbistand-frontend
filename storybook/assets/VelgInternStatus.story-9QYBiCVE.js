import{N as s,j as i}from"./iframe-BjEgG8Bz.js";import{V as n}from"./VelgInternStatus-Rgs1PFcw.js";import{w as d,c as o}from"./ContextDecorators-D_NaaITc.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-Cz71V_bS.js";import"./Tag-BQZGLJBi.js";import"./CircleSlash-DeVmcSHM.js";import"./XMarkOctagon-CK4_RlU0.js";import"./Reception-CR0i2pwX.js";import"./SealCheckmark-ByL_F7Fi.js";import"./PersonChat-BOSiHkvU.js";import"./MagnifyingGlass-BpM96OXS.js";import"./KandidatlisteContext-CqAnCG-y.js";import"./OrganisasjonsnummerAlert-DF_RoieK.js";import"./VStack-DIKon2VT.js";import"./BasePrimitive-B0t64DbI.js";import"./Box-ByEKtJEc.js";import"./List-RFuLUqQ4.js";import"./Link-ChdFwBS1.js";import"./KandidatHendelseTag-B54LIVIK.js";import"./ChatExclamationmark-LdK6mvnt.js";import"./FileXMark-DBbj60vg.js";import"./Trash-CzOzhYhB.js";import"./HandShakeHeart-B-lHUtgJ.js";import"./Calendar-wRSe2NZ1.js";import"./ThumbUp-B2nMwgVw.js";import"./ExclamationmarkTriangle-D-jj1427.js";import"./Table-CqOTa5Ih.js";import"./index-C2glyhwD.js";import"./index-B40KJ5b4.js";import"./util-Cf5Ur_0N.js";import"./Dropdown-BFec80au.js";import"./useControllableState-C98CIYum.js";import"./Popover-qj8UGUCK.js";import"./floating-ui.react-B2Z9rU6x.js";import"./Modal.context-C6v3fOVZ.js";import"./DismissableLayer-C6zBdjV7.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BNLWoC8N.js";import"./Pencil-D23ixREo.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
