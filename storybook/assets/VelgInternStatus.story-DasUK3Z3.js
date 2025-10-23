import{aK as s,j as i}from"./iframe-BUTH-F7i.js";import{w as d,c as o}from"./ContextDecorators-DE0KaYM-.js";import{V as n}from"./VelgInternStatus-BGObqC-q.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CCAP6VOk.js";import"./OrganisasjonsnummerAlert-CUE_z-nH.js";import"./VStack-Cfx8ef2d.js";import"./BasePrimitive-EN-WoeUf.js";import"./List-Bm6jGDlf.js";import"./Link-BOqk8eTY.js";import"./KandidatHendelseTag-DfgMw4Jd.js";import"./Tag-DgvxzQaa.js";import"./ChatExclamationmark-DMHFFO4S.js";import"./FileXMark-BK_pna-N.js";import"./Trash-vUHcf7iv.js";import"./HandShakeHeart-BNG4Il0b.js";import"./Calendar-CzmNfA2J.js";import"./ThumbUp-DtK_UsEP.js";import"./Table-vOpy5atD.js";import"./util-BCy7N5Yk.js";import"./format-Crxdz2N3.js";import"./match-uqK75o6n.js";import"./parse-amrLoI_k.js";import"./getDefaultOptions-CvOEeqG0.js";import"./parseISO-CcfrR_FE.js";import"./util-BAjIrB6Q.js";import"./InternStatusTag-Dm0tDl1t.js";import"./CircleSlash-DQ5VL5d-.js";import"./XMarkOctagon-mqHvimNc.js";import"./Reception-CL7yoyjK.js";import"./SealCheckmark-CSRHJjdB.js";import"./PersonChat-CBTBt9KC.js";import"./MagnifyingGlass-BZ8Nxvul.js";import"./Dropdown-BPXmUzYI.js";import"./useControllableState-O207w7G8.js";import"./Popover-B_RF7VWj.js";import"./floating-ui.react-vZDWLZdq.js";import"./Date.Input-WHM_GH4n.js";import"./useFormField-DI3O8FlQ.js";import"./ChevronDown-DEWO2onA.js";import"./Modal.context-Blu6qJf4.js";import"./DismissableLayer-DjbLVHS8.js";import"./useDescendant-FlOlaWpg.js";import"./useClientLayoutEffect-Cq-0td_f.js";import"./Pencil-BwmCedzu.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
