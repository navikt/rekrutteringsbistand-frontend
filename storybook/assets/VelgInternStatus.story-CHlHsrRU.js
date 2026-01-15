import{O as s,j as i}from"./iframe-Bj5Axd2a.js";import{V as n}from"./VelgInternStatus-BNGWF5Rf.js";import{w as d,c as o}from"./ContextDecorators-BNFnTqhy.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DFTYoeKy.js";import"./Tag-Bnz-8_u2.js";import"./CircleSlash-BfVCzmBr.js";import"./XMarkOctagon-CG2DHjFo.js";import"./Reception-BemItTLG.js";import"./SealCheckmark-B0h_7Win.js";import"./PersonChat-Cee6CDyh.js";import"./MagnifyingGlass-DXN75gUW.js";import"./KandidatlisteContext-_P279Ly7.js";import"./OrganisasjonsnummerAlert-CRCkZtle.js";import"./VStack-Dupokvod.js";import"./BasePrimitive-cTR1YpC5.js";import"./List-d0CjXUih.js";import"./Link-WQBFb_AD.js";import"./KandidatHendelseTag-BvMAo_wz.js";import"./ChatExclamationmark-dFgH5DKp.js";import"./FileXMark-BpCAMeUo.js";import"./Trash-pUZYdyL5.js";import"./HandShakeHeart-C2hjOipz.js";import"./Calendar-C1HI89R9.js";import"./ThumbUp-DCJbsUd4.js";import"./ExclamationmarkTriangle-DiXuGWym.js";import"./Table-CPOhTROf.js";import"./index-nohZSnzY.js";import"./index-B40KJ5b4.js";import"./util-CK_ZSrem.js";import"./Dropdown-KpyiHDZZ.js";import"./useControllableState-Cl8hL-Ro.js";import"./Popover-6eUUlR8P.js";import"./floating-ui.react-lQrPabDz.js";import"./Date.Input-B6M7frCw.js";import"./useFormField-f0voTv_i.js";import"./ChevronDown-DHnTEC1o.js";import"./Modal.context-C6n_bFcK.js";import"./DismissableLayer-DKDlAsE7.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CVS_CXbr.js";import"./Pencil-CTpCGTcA.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
