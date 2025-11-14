import{P as s,j as i}from"./iframe-B4tn9iAN.js";import{V as n}from"./VelgInternStatus-DnzrlAwf.js";import{w as d,c as o}from"./ContextDecorators-CoWaYXcV.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DMfEXmog.js";import"./Tag-CM4YJnHT.js";import"./CircleSlash-C2jbaSqH.js";import"./XMarkOctagon-DXVDwIjE.js";import"./Reception--EmAqW0n.js";import"./SealCheckmark-DSzhqX1b.js";import"./PersonChat-C5ygjhLv.js";import"./MagnifyingGlass-DcEuJJAA.js";import"./KandidatlisteContext-BfzvtQ6n.js";import"./OrganisasjonsnummerAlert-BSDE_l1X.js";import"./VStack-MIN_AJvI.js";import"./BasePrimitive-7zT0f-d9.js";import"./List-Bom0P9CA.js";import"./Link-CjNaC0Mm.js";import"./KandidatHendelseTag-CtnPwZg2.js";import"./ChatExclamationmark-CwcVnQEA.js";import"./FileXMark-BuZwU9yz.js";import"./Trash-CwDSnh0J.js";import"./HandShakeHeart-DUvF352I.js";import"./Calendar-CsFSA24o.js";import"./ThumbUp-CwjBLOrD.js";import"./Table-DwR1QuxA.js";import"./util-USYhdgOo.js";import"./parse-D9DFnrdL.js";import"./getDefaultOptions-LHoMVmWr.js";import"./parseISO-ClbEW8sT.js";import"./index-CNWXVBIo.js";import"./index-B40KJ5b4.js";import"./isBefore-BQtY6-NU.js";import"./util-B2JlJp7q.js";import"./Dropdown-Dy8uuB3K.js";import"./useControllableState-D36QMu8J.js";import"./Popover-Dk36nz2C.js";import"./floating-ui.react-DOp8LaL5.js";import"./Date.Input-C1ug36yG.js";import"./useFormField-aLRNU1Ej.js";import"./ChevronDown-CBGI7YRG.js";import"./Modal.context-B90kyfFI.js";import"./DismissableLayer-YTWsz1Ro.js";import"./useDescendant-BJvN3fUf.js";import"./useClientLayoutEffect-BIyNbf0Y.js";import"./Pencil-o27n51TR.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
