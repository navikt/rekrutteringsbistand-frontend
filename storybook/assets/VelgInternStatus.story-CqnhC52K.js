import{aK as s,j as i}from"./iframe-Cnqf-bcl.js";import{w as d,c as o}from"./ContextDecorators-BDN0aUta.js";import{V as n}from"./VelgInternStatus-CSV9uA7M.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BKFhtA1R.js";import"./OrganisasjonsnummerAlert-Crk21BJO.js";import"./VStack-BL1M7op8.js";import"./BasePrimitive-DxDcg_UA.js";import"./List-C4WnpohN.js";import"./Link-xmdcPjF1.js";import"./KandidatHendelseTag-DnA3LP75.js";import"./Tag-C89_9Q9a.js";import"./ChatExclamationmark-BaBPdmiJ.js";import"./FileXMark-DoWjNFhs.js";import"./Trash-Da8YnMzQ.js";import"./HandShakeHeart-Zmv_IxzJ.js";import"./Calendar-U5L3IAOx.js";import"./ThumbUp-B3AziIcu.js";import"./Table-BMgL1XGB.js";import"./util-B6xTVb4d.js";import"./format-BEtlDaco.js";import"./match-Dsf7IN36.js";import"./parse-CKfm7Msh.js";import"./getDefaultOptions-DnqILuRB.js";import"./parseISO-DTAWIXv6.js";import"./util-1LrmIP3t.js";import"./InternStatusTag-BnLXtjcw.js";import"./CircleSlash-DDRHzux4.js";import"./XMarkOctagon-IaaUjUSQ.js";import"./Reception-EAa0as-_.js";import"./SealCheckmark-ctARRjZU.js";import"./PersonChat-U3uguDbR.js";import"./MagnifyingGlass-CIgnFXdS.js";import"./Dropdown-DDsM6wAu.js";import"./useControllableState-C1wR1eYe.js";import"./Popover-BrzfSzEt.js";import"./floating-ui.react-BPTziuQR.js";import"./Date.Input-8RYFoirS.js";import"./useFormField-DSJEni5o.js";import"./ChevronDown-CrfRh_Y3.js";import"./Modal.context-b3xVmYOX.js";import"./DismissableLayer-DLwtcRFm.js";import"./useDescendant-C96LCEco.js";import"./useClientLayoutEffect-C7dti1gw.js";import"./Pencil-Dsdqj9Y0.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
