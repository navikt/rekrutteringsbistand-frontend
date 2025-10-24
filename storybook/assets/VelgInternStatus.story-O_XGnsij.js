import{aK as s,j as i}from"./iframe-CvAsB_PP.js";import{w as d,c as o}from"./ContextDecorators-qU537RQf.js";import{V as n}from"./VelgInternStatus-B_nTqwqi.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DHEfE7VN.js";import"./OrganisasjonsnummerAlert-DWhn1SoA.js";import"./VStack-AxHc-0un.js";import"./BasePrimitive-77yr22IN.js";import"./List-DGM51Xar.js";import"./Link-D4f6l7hj.js";import"./KandidatHendelseTag-DJk4h79r.js";import"./Tag-BlcEA2XO.js";import"./ChatExclamationmark-U-mAqd6d.js";import"./FileXMark-BvZo3mlC.js";import"./Trash-DE-JZ4Of.js";import"./HandShakeHeart-CfWBIzRT.js";import"./Calendar-AGKkvLA3.js";import"./ThumbUp-BoD78Ibw.js";import"./Table-KjrGy8Rv.js";import"./util-BHiovH0e.js";import"./format-sZiXwGYw.js";import"./match-C6g0stLX.js";import"./parse-nHoLI9xT.js";import"./getDefaultOptions-G1ntk7f0.js";import"./parseISO-B2cUmngl.js";import"./index-CmwULg7v.js";import"./index-B40KJ5b4.js";import"./isBefore-DF09tqDQ.js";import"./util-B6ET-IeG.js";import"./InternStatusTag-MFe38NVe.js";import"./CircleSlash-CIl1xLrM.js";import"./XMarkOctagon-LlJY0Aqq.js";import"./Reception-D1OMzkSJ.js";import"./SealCheckmark-COBg6Yhy.js";import"./PersonChat-Cuw0l2L4.js";import"./MagnifyingGlass-CWjqcwnI.js";import"./Dropdown-IWkf8L-Z.js";import"./useControllableState-CXrdSXg2.js";import"./Popover-DmReNpWc.js";import"./floating-ui.react-BpGFA9Kj.js";import"./Date.Input-Cuo6jDtV.js";import"./useFormField-C4h_Ry35.js";import"./ChevronDown-xfR_zGFT.js";import"./Modal.context-Btg_hFAx.js";import"./DismissableLayer-CUhhFJsj.js";import"./useDescendant-D3xT3_3v.js";import"./useClientLayoutEffect-DViUq2IM.js";import"./Pencil-Bum_AyUN.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
