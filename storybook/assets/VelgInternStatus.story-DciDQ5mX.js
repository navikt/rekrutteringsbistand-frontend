import{O as s,j as i}from"./iframe-BYISswbs.js";import{V as n}from"./VelgInternStatus-ClaKIsad.js";import{w as d,c as o}from"./ContextDecorators-B5GHDvbu.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CCjC77AF.js";import"./Tag-D22eWKzC.js";import"./CircleSlash-B342U9jj.js";import"./XMarkOctagon-M8rFn9zv.js";import"./Reception-CbjyofsG.js";import"./SealCheckmark-CQRWmNGe.js";import"./PersonChat-DMSAQzKb.js";import"./MagnifyingGlass-CwbCjfZW.js";import"./KandidatlisteContext-BaZtCo5m.js";import"./OrganisasjonsnummerAlert-CqzePRBy.js";import"./VStack-CFJ3tPOL.js";import"./BasePrimitive-CtkwkOJy.js";import"./List-BzdgGNSZ.js";import"./Link-CbujZ1sb.js";import"./KandidatHendelseTag-nra8tFi-.js";import"./ChatExclamationmark-DFvXRn5F.js";import"./FileXMark-B5wZpbyl.js";import"./Trash-9nM6IHnp.js";import"./HandShakeHeart-DPnFj-9F.js";import"./Calendar-d4CBC7_P.js";import"./ThumbUp-DlM8UKEn.js";import"./ExclamationmarkTriangle-DszJHhmG.js";import"./Table-4YP9nRVg.js";import"./index-BEl2lAyJ.js";import"./index-B40KJ5b4.js";import"./util-BeZJZ_MM.js";import"./Dropdown-BFqLIM6I.js";import"./useControllableState-C4jTtRT3.js";import"./Popover-DZ8cLWws.js";import"./floating-ui.react-DcW5Mqvr.js";import"./Date.Input-DsBuwcal.js";import"./useFormField-XJ0gedfQ.js";import"./ChevronDown-Cu0PDR1P.js";import"./Modal.context-B2PCIQn6.js";import"./DismissableLayer-C7ReiRv2.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CKwr79zC.js";import"./Pencil-q73ghBtx.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
