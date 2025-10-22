import{aK as s,j as i}from"./iframe-C97ZE7sg.js";import{w as d,c as o}from"./ContextDecorators-DNnHVWqB.js";import{V as n}from"./VelgInternStatus-BO5pq3q6.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D8K9ewFu.js";import"./OrganisasjonsnummerAlert-D-BJV996.js";import"./VStack-UVKBDTSt.js";import"./BasePrimitive--wAx-l74.js";import"./List-BELJIMKe.js";import"./Link-CokqFeTg.js";import"./KandidatHendelseTag-C2KYmOIC.js";import"./Tag-iPE2K53n.js";import"./ChatExclamationmark-ZO-_zv82.js";import"./FileXMark-Bv0ZFBeU.js";import"./Trash-BT-FVWpx.js";import"./HandShakeHeart-B3GyMym4.js";import"./Calendar-CzqPLvaE.js";import"./ThumbUp-fgEACwNE.js";import"./Table-B96hvVL5.js";import"./util-ByCv2TR0.js";import"./format-Dpd-SLgv.js";import"./match-Cb4eL_Of.js";import"./parse-C5RlZesN.js";import"./getDefaultOptions-Bw1oc0Sy.js";import"./parseISO-BNRoldpU.js";import"./util-BZtQgFRo.js";import"./InternStatusTag-ChopO9Cc.js";import"./CircleSlash-D55qNFyE.js";import"./XMarkOctagon-kDmCmosA.js";import"./Reception-CSkil6-n.js";import"./SealCheckmark-B9BTX1Rs.js";import"./PersonChat-Cpyf7UNi.js";import"./MagnifyingGlass-CNUBQZHM.js";import"./Dropdown-B5ZTwVpB.js";import"./useControllableState-D5C62osY.js";import"./Popover-yTs2qXim.js";import"./floating-ui.react-BWdrZTEV.js";import"./Date.Input-GNTXNypm.js";import"./useFormField-Clw1DWDD.js";import"./ChevronDown-DxB1dxI9.js";import"./Modal.context-CU_WWhvz.js";import"./DismissableLayer-B89bgzrm.js";import"./useDescendant-oS4vfHus.js";import"./useClientLayoutEffect-ywDazjGd.js";import"./Pencil-B-pYRNdF.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
