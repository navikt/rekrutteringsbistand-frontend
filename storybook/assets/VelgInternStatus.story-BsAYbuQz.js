import{aP as s,j as i}from"./iframe-VCe7dRyZ.js";import{w as d,c as o}from"./ContextDecorators-BrU7DnKq.js";import{V as n}from"./VelgInternStatus-B_12ZSCX.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BU3jygdz.js";import"./OrganisasjonsnummerAlert-CvlELcV-.js";import"./VStack-DbK8sH7a.js";import"./BasePrimitive-faKREJp1.js";import"./List-CgHGulMr.js";import"./Link-91tK5V-B.js";import"./KandidatHendelseTag-DpM1tiH3.js";import"./Tag-BNZTXTla.js";import"./ChatExclamationmark-DP2zAiIS.js";import"./FileXMark-CIq7pB6D.js";import"./Trash-DyBiTSZz.js";import"./HandShakeHeart-Cq3APYaF.js";import"./Calendar-krj_m8jk.js";import"./ThumbUp-CksZbXNt.js";import"./Table-I_ka60HV.js";import"./util-Bw1HkXHV.js";import"./format-B4lXzuEg.js";import"./match-RipjgyAw.js";import"./parseISO-D6VdJANX.js";import"./parse-CUJIztkB.js";import"./getDefaultOptions-B7RZP2Z3.js";import"./util-Ca-pMBl7.js";import"./InternStatusTag-BnhySnBY.js";import"./CircleSlash-COu6cnsy.js";import"./XMarkOctagon-1a5Ne_Vx.js";import"./Reception-CUe1HcE2.js";import"./SealCheckmark-eIm7ya0G.js";import"./PersonChat-CmgR9aqN.js";import"./MagnifyingGlass-BExjkyK-.js";import"./Dropdown-CWH3LcPq.js";import"./useControllableState-DrlEfUET.js";import"./Popover-D6Pb0qLx.js";import"./floating-ui.react-BCWccojJ.js";import"./Date.Input-BRAW8A_E.js";import"./useFormField-DDhPYMZp.js";import"./ChevronDown-rlof1Z2Y.js";import"./Modal.context-DTzOEz2H.js";import"./DismissableLayer-C1jfr4bU.js";import"./useDescendant-C2k29XYS.js";import"./useClientLayoutEffect-CmfXtWsl.js";import"./Pencil-D4fU5pXw.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
