import{aP as s,j as i}from"./iframe-BfAWemmc.js";import{w as d,c as o}from"./ContextDecorators-5ZTJWDL7.js";import{V as n}from"./VelgInternStatus-vAJSVJXK.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CZJinPC_.js";import"./OrganisasjonsnummerAlert-CKNMwV2M.js";import"./VStack-E2AkkOI-.js";import"./BasePrimitive-4Bt1Qine.js";import"./List-CdDpv4YP.js";import"./Link-A-VeEQkm.js";import"./KandidatHendelseTag-COFRiu6Y.js";import"./Tag-BBcODoZp.js";import"./FileXMark-Cs2HeL1G.js";import"./Trash-lyimBUCL.js";import"./HandShakeHeart-BfGlbeYf.js";import"./Calendar-DLBjDSR0.js";import"./ThumbUp-BFmFnThU.js";import"./Table-C32uQCgO.js";import"./util-Cl7DppeK.js";import"./format-T6eo1b8A.js";import"./match-C_qGV_hU.js";import"./parseISO-NZvD22OB.js";import"./parse-B4iPNoV8.js";import"./getDefaultOptions-D1iwA5_5.js";import"./util-BF-xeARd.js";import"./InternStatusTag-EsXzUZsr.js";import"./CircleSlash-DBqKmmWO.js";import"./XMarkOctagon-DXYaAGVk.js";import"./Reception-Ds7z2KW-.js";import"./SealCheckmark-xcz7Fsod.js";import"./PersonChat-WlWjQDfP.js";import"./MagnifyingGlass-B8cYn3ga.js";import"./Dropdown-Wg0Z2Wga.js";import"./useControllableState-DoW-j5pQ.js";import"./Popover-Dslb5inT.js";import"./floating-ui.react-DNWRPkoZ.js";import"./Date.Input-wd6poww_.js";import"./useFormField-Ckq-4NQw.js";import"./ChevronDown-BkwjVMbn.js";import"./Modal.context-BsYtDPHn.js";import"./DismissableLayer-BkoMDDdv.js";import"./useDescendant-ClfCo3QU.js";import"./useClientLayoutEffect-DBvfcbCB.js";import"./Pencil-kBHDTqRZ.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,_ as default};
