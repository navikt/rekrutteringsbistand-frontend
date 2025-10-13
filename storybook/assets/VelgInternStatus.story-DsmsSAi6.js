import{j as s}from"./iframe-Dbv-ZY6m.js";import{w as d,c as o}from"./ContextDecorators-B5zeZMYj.js";import{V as n}from"./VelgInternStatus-dxYezu-_.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BfPHHPX5.js";import"./OrganisasjonsnummerAlert-CMN6RSC3.js";import"./VStack-DZNJyLn1.js";import"./BasePrimitive-ClHlo-1x.js";import"./List-Bh8CwDuZ.js";import"./Link-BnDDjZ4T.js";import"./KandidatHendelseTag-BtPcl_FJ.js";import"./Tag-Cqu0347d.js";import"./FileXMark-BOGsNA63.js";import"./Trash-Bf_kz-Y4.js";import"./HandShakeHeart-Cm8qLszF.js";import"./Calendar-Bu5eC4tK.js";import"./ThumbUp-D9H6k4pI.js";import"./Table-PASOvmf2.js";import"./util-BzjSVB_a.js";import"./format-Bjj9PWS-.js";import"./match-C0AC_sxS.js";import"./parseISO-C6AtVv5J.js";import"./parse-CoDqBx_5.js";import"./getDefaultOptions-BEMMC4OI.js";import"./util-zb_msfsb.js";import"./InternStatusTag-EFRi_cxP.js";import"./CircleSlash-BN6avT7o.js";import"./XMarkOctagon-D8DUV2wI.js";import"./Reception-DHXVafWN.js";import"./SealCheckmark-D-4bZD4x.js";import"./PersonChat-BpE9bybZ.js";import"./MagnifyingGlass-SDBZL1nC.js";import"./Dropdown-9bqkh3Tl.js";import"./useControllableState-CuovWR7y.js";import"./Popover-v6bY7A7i.js";import"./floating-ui.react-HGTfdzo0.js";import"./Date.Input-BAQUwUKS.js";import"./useFormField-B25Nx7HO.js";import"./ChevronDown-BT8bNVDr.js";import"./Modal.context-AsKyuXOL.js";import"./DismissableLayer-DmuPEZeO.js";import"./useDescendant-DSn6aWUY.js";import"./useClientLayoutEffect-BOrB_Ep7.js";import"./Pencil-lvORBKmP.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,tt as default};
