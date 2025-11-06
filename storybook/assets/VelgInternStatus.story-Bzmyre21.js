import{P as s,j as i}from"./iframe-DxFO8IvB.js";import{V as n}from"./VelgInternStatus-CN-oIOCA.js";import{w as d,c as o}from"./ContextDecorators-5dLdHQ6D.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BNtL5Rdt.js";import"./Tag-DQBZdq-6.js";import"./CircleSlash-C84pm2Zu.js";import"./XMarkOctagon-DXOmC7Uv.js";import"./Reception-PW_D1mwX.js";import"./SealCheckmark-BhJX57Kd.js";import"./PersonChat-CvP_4Qzr.js";import"./MagnifyingGlass-DPyB2CKB.js";import"./KandidatlisteContext-Bx5Bh9AX.js";import"./OrganisasjonsnummerAlert-CUceEugp.js";import"./VStack-qaCCDpee.js";import"./BasePrimitive-BaqMTUpz.js";import"./List-DVvtlFCQ.js";import"./Link-DwpzwPgp.js";import"./KandidatHendelseTag-DBW4uWwr.js";import"./ChatExclamationmark-Ci7EBtJP.js";import"./FileXMark-COvzPyrZ.js";import"./Trash-DoeLRnir.js";import"./HandShakeHeart-l_VS9-hh.js";import"./Calendar-DV_dxZU5.js";import"./ThumbUp-CW_SQ9lV.js";import"./Table-CdzJnmri.js";import"./util-DZ3qgcJo.js";import"./parse-Dky1ezAl.js";import"./getDefaultOptions-Fdz5HjLp.js";import"./parseISO-DIXD6R6r.js";import"./index-H2AEdEPn.js";import"./index-B40KJ5b4.js";import"./isBefore-DAtEqNzd.js";import"./util-DMAiq0PX.js";import"./Dropdown-BqmbIiDs.js";import"./useControllableState-CPx_uKRc.js";import"./Popover-D7lliTNY.js";import"./floating-ui.react-BGSAD5qD.js";import"./Date.Input-CIMNl_9q.js";import"./useFormField-BSkyo7ru.js";import"./ChevronDown-DYWOWGBT.js";import"./Modal.context-zx_c4c0w.js";import"./DismissableLayer-CggqpmuT.js";import"./useDescendant-C-lIABgv.js";import"./useClientLayoutEffect-BkjQOB3H.js";import"./Pencil-CDlgidVo.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
