import{aP as s,j as i}from"./iframe-CnEkfJjQ.js";import{w as d,c as o}from"./ContextDecorators-CZZjZOOl.js";import{V as n}from"./VelgInternStatus-E8g_nxfK.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-HIRI-J95.js";import"./OrganisasjonsnummerAlert-B23Jmmg0.js";import"./VStack-D3_cDo5O.js";import"./BasePrimitive-CJsxFWaA.js";import"./List-CMa3XxGU.js";import"./Link-Bub8b3KC.js";import"./KandidatHendelseTag-B5dnEu9y.js";import"./Tag-DmHnnT3j.js";import"./ChatExclamationmark-CaxCUB7e.js";import"./FileXMark-Bpe-BWEB.js";import"./Trash-DLfbYG6b.js";import"./HandShakeHeart-G1PY24Kb.js";import"./Calendar-C6MR1ehC.js";import"./ThumbUp-BqHABY98.js";import"./Table-CftjquAj.js";import"./util-C2UfT_2f.js";import"./format-Dd_rkWUl.js";import"./match-CfPkVkUS.js";import"./parseISO-CaaYQBsI.js";import"./parse-Cx8TZIRr.js";import"./getDefaultOptions-0dENDqjq.js";import"./util-BX4E7U5l.js";import"./InternStatusTag-BI8wEdLe.js";import"./CircleSlash-C-mA8Cq2.js";import"./XMarkOctagon-BjrcIiFe.js";import"./Reception-_JFQO1X9.js";import"./SealCheckmark-CxyrnOnG.js";import"./PersonChat-JrZzQVkS.js";import"./MagnifyingGlass-CpHSBPfZ.js";import"./Dropdown-c0r4DbgB.js";import"./useControllableState-D9VP06Xz.js";import"./Popover-Dc0VJ7Xw.js";import"./floating-ui.react-CS8Kbatp.js";import"./Date.Input-CkEuVDaW.js";import"./useFormField-yhmtRsl4.js";import"./ChevronDown-BA6G5vv2.js";import"./Modal.context-Wi_6ZnAF.js";import"./DismissableLayer-BpGxaF4X.js";import"./useDescendant-DEaDV0OM.js";import"./useClientLayoutEffect-BziDiKhG.js";import"./Pencil-DKbE5lfO.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
