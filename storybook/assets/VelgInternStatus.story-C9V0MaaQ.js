import{Y as s,j as i}from"./iframe-Djf0aaCu.js";import{V as n}from"./VelgInternStatus-CqixaX0e.js";import{w as d,c as o}from"./ContextDecorators-Bz_tf06c.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CtTXS-VX.js";import"./Tag-DEoThWTs.js";import"./CircleSlash-BF81C3W_.js";import"./XMarkOctagon-DL_a4dNE.js";import"./Reception-CNYg8FDg.js";import"./SealCheckmark-By6h6bPS.js";import"./PersonChat-CxeXVhm1.js";import"./MagnifyingGlass-Bgy5lUVm.js";import"./KandidatlisteContext-DlK2m225.js";import"./OrganisasjonsnummerAlert-DEBjV0z0.js";import"./VStack-BGsDIkWS.js";import"./BasePrimitive-CSUIcWuf.js";import"./List-DhIUy4Ha.js";import"./Link-C7h0FEQb.js";import"./KandidatHendelseTag-DJib85Pq.js";import"./ChatExclamationmark-DB8kfSnV.js";import"./FileXMark-CvsleZFt.js";import"./Trash-BQ_83vSR.js";import"./HandShakeHeart-D7g3P2SO.js";import"./Calendar-B2vIp9Z6.js";import"./ThumbUp-DINwWRPg.js";import"./Table-DoFaPu74.js";import"./index-CaC8I_UC.js";import"./index-B40KJ5b4.js";import"./util-B2PQqqnM.js";import"./Dropdown-2OjB7XH4.js";import"./useControllableState-DRurQPnd.js";import"./Popover-Cjl6W7EX.js";import"./floating-ui.react-0NnofmAD.js";import"./Date.Input-DJ-gGXjF.js";import"./useFormField-D-dph_0E.js";import"./ChevronDown-k3UIUZgA.js";import"./Modal.context-Ak7lim11.js";import"./DismissableLayer-5bSw7yqi.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CRL3UlMw.js";import"./Pencil-BjpW2G8O.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
