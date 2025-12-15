import{X as s,j as i}from"./iframe-BaixhwPd.js";import{V as n}from"./VelgInternStatus-9bSmeqrm.js";import{w as d,c as o}from"./ContextDecorators-Daoy0zKj.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BRmF0zhC.js";import"./Tag-BqtJBFrm.js";import"./CircleSlash-CobJ7Nzf.js";import"./XMarkOctagon-Be_wvco4.js";import"./Reception-CsNX5AAf.js";import"./SealCheckmark-C8Rl8kQB.js";import"./PersonChat-CiHnOUjY.js";import"./MagnifyingGlass-Blq-zoBV.js";import"./KandidatlisteContext-C9OJfunF.js";import"./OrganisasjonsnummerAlert-CsqeIAFI.js";import"./VStack-D_dma6vx.js";import"./BasePrimitive-B10oB-GC.js";import"./List-Cp9scLmz.js";import"./Link-B-dOmAvL.js";import"./KandidatHendelseTag-CzAGVoTu.js";import"./ChatExclamationmark-NyUq3Q5b.js";import"./FileXMark-uIcWe4hD.js";import"./Trash-DnK28rAm.js";import"./HandShakeHeart-CmPEhmhq.js";import"./Calendar-BBdMEy0D.js";import"./ThumbUp-Cf0XFTlG.js";import"./Table-D54CpVkL.js";import"./index-BQM2YZXg.js";import"./index-B40KJ5b4.js";import"./util-FeeJLEIb.js";import"./Dropdown-y74kzAE3.js";import"./useControllableState-DEuiE3NL.js";import"./Popover-DUb_YB7C.js";import"./floating-ui.react-BL0cmmOa.js";import"./Date.Input-BWutGdRi.js";import"./useFormField-CRj1shUX.js";import"./ChevronDown-CzCRaCzj.js";import"./Modal.context-DXSg-077.js";import"./DismissableLayer-DXapyLoM.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-D3dVonUg.js";import"./Pencil-DZa0TE56.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
