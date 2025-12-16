import{X as s,j as i}from"./iframe-rg7Mi9Fm.js";import{V as n}from"./VelgInternStatus-QlcCPP2N.js";import{w as d,c as o}from"./ContextDecorators-QaS-EKtQ.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-LZW01R0I.js";import"./Tag-CePG_4wH.js";import"./CircleSlash-BBX4CPAk.js";import"./XMarkOctagon-DcLrLSzZ.js";import"./Reception-he5FGI2p.js";import"./SealCheckmark-C6W8jzbC.js";import"./PersonChat-BMz3XXvS.js";import"./MagnifyingGlass-d9uRINEQ.js";import"./KandidatlisteContext-BiUNsutO.js";import"./OrganisasjonsnummerAlert-GRi70etK.js";import"./VStack-DrQVJZbY.js";import"./BasePrimitive-BiogUs6_.js";import"./List-B5Zb1zql.js";import"./Link-8vsD6bh1.js";import"./KandidatHendelseTag-BKKMnVDA.js";import"./ChatExclamationmark-DihCNQAw.js";import"./FileXMark-BZYKe9uf.js";import"./Trash-DhrK18Rr.js";import"./HandShakeHeart-C_UIIpYx.js";import"./Calendar-t9CMsUw1.js";import"./ThumbUp-C7iiQW3_.js";import"./Table-BphJGzOj.js";import"./index-qMbBKF_W.js";import"./index-B40KJ5b4.js";import"./util-Bnm6XJYa.js";import"./Dropdown-DFVjkALf.js";import"./useControllableState-DviLRBNa.js";import"./Popover-CiXIHFug.js";import"./floating-ui.react-5sgbQVDa.js";import"./Date.Input-DPh6gKPy.js";import"./useFormField-CH2lF7TD.js";import"./ChevronDown-DW7__CRK.js";import"./Modal.context-rK_dUd0p.js";import"./DismissableLayer-zGpqYdLX.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BrQuwOC3.js";import"./Pencil-QTlRWd5C.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
