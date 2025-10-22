import{aK as s,j as i}from"./iframe-DLRfPnIA.js";import{w as d,c as o}from"./ContextDecorators-DxAd68GT.js";import{V as n}from"./VelgInternStatus-CRyC-UNV.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DPOG-WgZ.js";import"./OrganisasjonsnummerAlert-CuQCpySo.js";import"./VStack-4LIPwqdy.js";import"./BasePrimitive-BEpTr0x7.js";import"./List-1JqX_zGN.js";import"./Link-DJOsYkHV.js";import"./KandidatHendelseTag-CSw9k2Pi.js";import"./Tag-Bex3rpKK.js";import"./ChatExclamationmark-BPzKqelu.js";import"./FileXMark-fy2i8p_8.js";import"./Trash-BWxxXeYN.js";import"./HandShakeHeart-DVN5OzbY.js";import"./Calendar-CDBQMsFO.js";import"./ThumbUp-CYIiqwTe.js";import"./Table-BamrKyXB.js";import"./util-AvlE4TX_.js";import"./format-BnHsCra-.js";import"./match-BAt8OPxC.js";import"./parse-DwFSpjbA.js";import"./getDefaultOptions-DJMDZ6IL.js";import"./parseISO-261MZjGk.js";import"./util-Cr9yaPzG.js";import"./InternStatusTag-t-eR66Fg.js";import"./CircleSlash-DvoKq-zE.js";import"./XMarkOctagon-Bf_Rv2Zj.js";import"./Reception-EViLeDEP.js";import"./SealCheckmark-BAlg6VH2.js";import"./PersonChat-Cgkdd208.js";import"./MagnifyingGlass-D48cV8yx.js";import"./Dropdown-Di16LD_S.js";import"./useControllableState-BvFOz6dj.js";import"./Popover-wVp1xPb-.js";import"./floating-ui.react-BVVz65mv.js";import"./Date.Input-D2YxAgPX.js";import"./useFormField-DWyA6BM_.js";import"./ChevronDown-CsjiObvX.js";import"./Modal.context-DoUDg5BX.js";import"./DismissableLayer-B0BVm3uO.js";import"./useDescendant-Qr841VWI.js";import"./useClientLayoutEffect-CfiW0lxK.js";import"./Pencil-CRlHzljX.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
