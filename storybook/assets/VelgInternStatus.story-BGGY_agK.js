import{aK as s,j as i}from"./iframe-DZyrTSlI.js";import{w as d,c as o}from"./ContextDecorators-TmXvtnk-.js";import{V as n}from"./VelgInternStatus-DTSvxmlq.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BkAw1Mkr.js";import"./OrganisasjonsnummerAlert-fw0smuCn.js";import"./VStack-Bi3_lm1-.js";import"./BasePrimitive-DsapbUAH.js";import"./List-CypvTfcm.js";import"./Link-DpvyDfp9.js";import"./KandidatHendelseTag-DLqx-B6C.js";import"./Tag-DFzpGXaJ.js";import"./ChatExclamationmark-iuBP3eJo.js";import"./FileXMark-Bh_C5zZN.js";import"./Trash-BhVhLJs_.js";import"./HandShakeHeart-BC1s7_NO.js";import"./Calendar--tOITD5g.js";import"./ThumbUp-BO4EIKNS.js";import"./Table-B3zrRkWX.js";import"./util-D-Ql6dhl.js";import"./format-CxDBX73B.js";import"./match-Bhd-0bF1.js";import"./parse-DvmpoZJt.js";import"./getDefaultOptions-BnejP4zr.js";import"./parseISO-KPFOWa3j.js";import"./util-P4U7UwH7.js";import"./InternStatusTag-CxyH7spR.js";import"./CircleSlash-C_QNxvX-.js";import"./XMarkOctagon-XEGLCs8_.js";import"./Reception-DUC74V0a.js";import"./SealCheckmark-OpgQnX9X.js";import"./PersonChat-C4rHzVT2.js";import"./MagnifyingGlass-COn5Qm_H.js";import"./Dropdown-DXWGKRJY.js";import"./useControllableState-D5wZx8MS.js";import"./Popover-DqMyq8r_.js";import"./floating-ui.react-DdUQq2B3.js";import"./Date.Input-DYwhDOSj.js";import"./useFormField-P10hdtN7.js";import"./ChevronDown-CoI8HCn0.js";import"./Modal.context-DtBDKmOm.js";import"./DismissableLayer-BvD7YC6p.js";import"./useDescendant-VAvGN301.js";import"./useClientLayoutEffect-BxODUUc8.js";import"./Pencil-BjUL-Vnc.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
