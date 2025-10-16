import{aK as s,j as i}from"./iframe-Bm0iWSAX.js";import{w as d,c as o}from"./ContextDecorators-CCjiBzlj.js";import{V as n}from"./VelgInternStatus-CoLZCoVq.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DiPu0wP-.js";import"./OrganisasjonsnummerAlert-BiNTUKBU.js";import"./VStack-DeoVT_RF.js";import"./BasePrimitive-DSuUDil5.js";import"./List-6LowxMuQ.js";import"./Link-0ed56hQx.js";import"./KandidatHendelseTag-CL9EsGtt.js";import"./Tag-DtJZzZHV.js";import"./FileXMark-gmOMb3WS.js";import"./Trash-C2i0h2eW.js";import"./HandShakeHeart-CI8OTjR4.js";import"./Calendar-CtcWy-uR.js";import"./ThumbUp-B74QiFr9.js";import"./Table-DWtnJaPl.js";import"./util-DBYMKOy9.js";import"./format-7rGwuxAI.js";import"./match-BPcDNGi2.js";import"./parse-D4Igef4h.js";import"./getDefaultOptions-BR-nU7_j.js";import"./parseISO-D_SMTJVk.js";import"./util-Dz0LE6uV.js";import"./InternStatusTag-3nNq_g0E.js";import"./CircleSlash-48DcTfGp.js";import"./XMarkOctagon-LkqVecYm.js";import"./Reception-Dpv4C8hN.js";import"./SealCheckmark-DmHhXAoB.js";import"./PersonChat-B22XQP02.js";import"./MagnifyingGlass-DrrSwkch.js";import"./Dropdown-B5mRvgkR.js";import"./useControllableState-BnCX1B-b.js";import"./Popover-DpvQNC8M.js";import"./floating-ui.react-DYGiiub_.js";import"./Date.Input-CHKMV-hr.js";import"./useFormField-B0esHqmv.js";import"./ChevronDown-CmedFOPk.js";import"./Modal.context-ClgWLOEW.js";import"./DismissableLayer-BdtdDvlJ.js";import"./useDescendant-8k9NotGR.js";import"./useClientLayoutEffect-D6Xy-NdX.js";import"./Pencil-CiEZBfEF.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
