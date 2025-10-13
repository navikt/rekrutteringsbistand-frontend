import{j as s}from"./iframe-UjNt-zBO.js";import{w as d,c as o}from"./ContextDecorators-C30PrXta.js";import{V as n}from"./VelgInternStatus-KLW5Vlah.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DAs4tGP3.js";import"./OrganisasjonsnummerAlert-BPyO27kT.js";import"./VStack-mc8H1tM0.js";import"./BasePrimitive-B__jwBzH.js";import"./List-nP_AfZ2o.js";import"./Link-wUd1tDUs.js";import"./KandidatHendelseTag-CbZOketc.js";import"./Tag-BSmjQs8J.js";import"./ChatExclamationmark-BF1mIJ-k.js";import"./FileXMark-DuHeyXFT.js";import"./Trash-C3ObPB-Y.js";import"./HandShakeHeart-DNxzqHyN.js";import"./Calendar-lsXea1Wh.js";import"./ThumbUp-vYWQfMS3.js";import"./Table-C8KeRzZn.js";import"./util-HQ_OYy-u.js";import"./format-BsgKkAMj.js";import"./match-qxZlEw6J.js";import"./parseISO-Cxtu-_IP.js";import"./parse-DABQu9wW.js";import"./getDefaultOptions-1bbeywKy.js";import"./util-puWZ81cp.js";import"./InternStatusTag-CU80D4kd.js";import"./CircleSlash-C9DxY2Zx.js";import"./XMarkOctagon-BscRHGsI.js";import"./Reception-B9_XRkvn.js";import"./SealCheckmark-D7Bxymwj.js";import"./PersonChat-DWWG3hMx.js";import"./MagnifyingGlass-DUz0al2y.js";import"./Dropdown-DHmolyD5.js";import"./useControllableState-DzzemiT1.js";import"./Popover-pyW6iWkS.js";import"./floating-ui.react-CI9_OYBn.js";import"./Date.Input-CPpcN85d.js";import"./useFormField-CJ0XBcBD.js";import"./ReadMore-nHc54yo_.js";import"./ChevronDown-BhKbsGuQ.js";import"./Modal.context-pcs4IwGf.js";import"./DismissableLayer-CAM72o7M.js";import"./useDescendant-BVGE-7tV.js";import"./useClientLayoutEffect-CYppG7qD.js";import"./Pencil-q62mR91A.js";const rt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,rt as default};
