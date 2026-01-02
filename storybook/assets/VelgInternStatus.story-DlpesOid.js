import{O as s,j as i}from"./iframe-BCPU83ju.js";import{V as n}from"./VelgInternStatus-BFwnlGCE.js";import{w as d,c as o}from"./ContextDecorators-C32Uu8nB.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-u6K3cVH8.js";import"./Tag-BRiTi-pB.js";import"./CircleSlash-nt1b4HFI.js";import"./XMarkOctagon-D_YmgmRb.js";import"./Reception-CIiyg-gW.js";import"./SealCheckmark-D4C056vq.js";import"./PersonChat-B0Ou65XE.js";import"./MagnifyingGlass-Dkf3Qmf3.js";import"./KandidatlisteContext-SWJxKa3q.js";import"./OrganisasjonsnummerAlert-B9fdaAF-.js";import"./VStack-BIz_V_1H.js";import"./BasePrimitive-C43Zdv_H.js";import"./List-DE7Xqmfm.js";import"./Link-BsYdxGte.js";import"./KandidatHendelseTag-CepaBxAT.js";import"./ChatExclamationmark-z02UnKbf.js";import"./FileXMark-DpM3u4VL.js";import"./Trash-Cta86JYs.js";import"./HandShakeHeart-BjjfjrpZ.js";import"./Calendar-CrUnjqKD.js";import"./ThumbUp-DJ19LnAF.js";import"./ExclamationmarkTriangle-BA7dsrnv.js";import"./Table-DXeSb6gu.js";import"./index-iHPVhBfh.js";import"./index-B40KJ5b4.js";import"./util-DoVIJkK9.js";import"./Dropdown-09I-eiul.js";import"./useControllableState-BmfeGQkw.js";import"./Popover-DGBcDy_L.js";import"./floating-ui.react-CkmWww4U.js";import"./Date.Input-DKZMtCa6.js";import"./useFormField-CPCdGz6D.js";import"./ChevronDown-j4ejZ-3f.js";import"./Modal.context-WcZRHucM.js";import"./DismissableLayer-CPHSRetD.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C0hqye8N.js";import"./Pencil-DxLkemFI.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
