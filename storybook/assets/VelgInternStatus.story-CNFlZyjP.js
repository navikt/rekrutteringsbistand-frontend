import{Y as s,j as i}from"./iframe-vxlhYioC.js";import{w as d,c as o}from"./ContextDecorators-hMBTRyOi.js";import{V as n}from"./VelgInternStatus-Bs6k_isk.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BsXHsMDf.js";import"./OrganisasjonsnummerAlert-x2My_1Eb.js";import"./VStack-BZfHHrnb.js";import"./BasePrimitive-D5ktlNqm.js";import"./List-DjDlZYKP.js";import"./Link-D-UIIivm.js";import"./KandidatHendelseTag-nyFbxxtt.js";import"./Tag-CHdgDEIm.js";import"./ChatExclamationmark-CeH_4DOl.js";import"./FileXMark-DHSIBz7p.js";import"./Trash-KKPL1OMN.js";import"./HandShakeHeart-Bl_VA7Hk.js";import"./Calendar-mLj0Fd57.js";import"./ThumbUp-DL2Wo1MI.js";import"./Table-BPWMJHa8.js";import"./util-Dcl-up4a.js";import"./format-CPcFKb8h.js";import"./match-CkHEsP0d.js";import"./parse-CiNqO_-e.js";import"./getDefaultOptions-NvUiPm5I.js";import"./parseISO-tgOundRI.js";import"./index-IahZpkRC.js";import"./index-B40KJ5b4.js";import"./isBefore-BsF4uDyc.js";import"./util-DvTFOeO4.js";import"./InternStatusTag-Dpu_m6aW.js";import"./CircleSlash-BwTpr_tw.js";import"./XMarkOctagon-BY667NNn.js";import"./Reception-bFfKNGtW.js";import"./SealCheckmark-BpKa5CkF.js";import"./PersonChat-D8oKvH85.js";import"./MagnifyingGlass-DrVeKzN9.js";import"./Dropdown-CagPtA9c.js";import"./useControllableState-C8bmfjbm.js";import"./Popover-DxSU7LVu.js";import"./floating-ui.react-NB48aGkL.js";import"./Date.Input-KE5qtxC1.js";import"./useFormField-zskv9Rr_.js";import"./ChevronDown-C0Rp9KsQ.js";import"./Modal.context-1XeiDYLf.js";import"./DismissableLayer-CFXz1sLV.js";import"./useDescendant-BEvTWtx7.js";import"./useClientLayoutEffect-CAAJPNEI.js";import"./Pencil-D5ql2y5k.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,et as default};
