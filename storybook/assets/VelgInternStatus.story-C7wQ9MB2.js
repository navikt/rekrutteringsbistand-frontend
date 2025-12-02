import{Y as s,j as i}from"./iframe-DYebcAac.js";import{V as n}from"./VelgInternStatus-zh4pk2-6.js";import{w as d,c as o}from"./ContextDecorators-DGXRxUfB.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-Be-kQw6P.js";import"./Tag-B0qlNe2D.js";import"./CircleSlash-D2qlKbMB.js";import"./XMarkOctagon-D6cZ7RRg.js";import"./Reception-D7_44AU6.js";import"./SealCheckmark-DW9zBpBv.js";import"./PersonChat-Dd6f0igW.js";import"./MagnifyingGlass-sB45-lJ3.js";import"./KandidatlisteContext-C2DOphGQ.js";import"./OrganisasjonsnummerAlert-3JKXLxol.js";import"./VStack-BXgQHkJH.js";import"./BasePrimitive-CRUxVIom.js";import"./List-B2JosOUI.js";import"./Link-CvjscnMo.js";import"./KandidatHendelseTag-CtxiF6k9.js";import"./ChatExclamationmark-Vm4Ti-4P.js";import"./FileXMark-Bz7kePTl.js";import"./Trash-BoeAt-iU.js";import"./HandShakeHeart-BOLx3G0Q.js";import"./Calendar-8ApYkf7s.js";import"./ThumbUp-DjcY46H4.js";import"./Table-DSoqSj2C.js";import"./index-Cj7qpNcs.js";import"./index-B40KJ5b4.js";import"./util-B_AA4L4z.js";import"./Dropdown-CabfjtpQ.js";import"./useControllableState-C8fzJ6EH.js";import"./Popover-8xdJAmhG.js";import"./floating-ui.react-CLtdJFP3.js";import"./Date.Input-COhCvR1O.js";import"./useFormField-Bk3OyaAW.js";import"./ChevronDown-BQ1H2NSN.js";import"./Modal.context-C5bciP-B.js";import"./DismissableLayer-ypqI2WT0.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-FTSIvdKE.js";import"./Pencil-CbJt8WET.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,W as default};
