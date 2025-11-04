import{P as s,j as i}from"./iframe-D5Hx8MOI.js";import{V as n}from"./VelgInternStatus-CpA6ekOM.js";import{w as d,c as o}from"./ContextDecorators-D2NPIL1V.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DPBocJmg.js";import"./Tag-sqViv2P5.js";import"./CircleSlash-DCgDXSuu.js";import"./XMarkOctagon-BRXK11hm.js";import"./Reception--CKLfROy.js";import"./SealCheckmark-C5h7HzMO.js";import"./PersonChat-Dwf8xkJt.js";import"./MagnifyingGlass-BeO3Pc2G.js";import"./KandidatlisteContext-CY2SUsP-.js";import"./OrganisasjonsnummerAlert-ekewJOh6.js";import"./VStack--Wd9bffL.js";import"./BasePrimitive-0g_Rn9vf.js";import"./List-DT2p30nz.js";import"./Link-e5cgoETk.js";import"./KandidatHendelseTag-DBavK9Jn.js";import"./ChatExclamationmark-BBZeh-kH.js";import"./FileXMark-YL5z_ic7.js";import"./Trash-D4lyxCuc.js";import"./HandShakeHeart-CCsq3XV6.js";import"./Calendar-bCXJqlLh.js";import"./ThumbUp-Bkl_gHlE.js";import"./Table-J1I1xChK.js";import"./util-BPTmFIB5.js";import"./parse-BtZCxJNG.js";import"./getDefaultOptions-BSV_6W0p.js";import"./parseISO-Bj7jC2Qz.js";import"./index-DvbjUxB4.js";import"./index-B40KJ5b4.js";import"./isBefore-dcDV6Iu_.js";import"./util-BVg7me_Z.js";import"./Dropdown-OZ-g9eUk.js";import"./useControllableState-BC3SVwpK.js";import"./Popover-bHn5RopZ.js";import"./floating-ui.react-B7GcXC42.js";import"./Date.Input-BNoCn-WA.js";import"./useFormField-CRwOs4JE.js";import"./ChevronDown-sV2brkBk.js";import"./Modal.context-ByVlJ93D.js";import"./DismissableLayer-DCtW6fPx.js";import"./useDescendant-BarimCuy.js";import"./useClientLayoutEffect-Borw-cDB.js";import"./Pencil-JzGUZ_wD.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,at as default};
