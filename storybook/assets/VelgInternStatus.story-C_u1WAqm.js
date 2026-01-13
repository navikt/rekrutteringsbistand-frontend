import{O as s,j as i}from"./iframe-CRqPxp4c.js";import{V as n}from"./VelgInternStatus-DUXsAy1W.js";import{w as d,c as o}from"./ContextDecorators-Dinx1zvi.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DqZDyrgl.js";import"./Tag-BFrqR_IL.js";import"./CircleSlash-BiCwzCN1.js";import"./XMarkOctagon-CcHh2qOH.js";import"./Reception-BG8k9-Ha.js";import"./SealCheckmark-D0bwWA8V.js";import"./PersonChat-C31zmiPS.js";import"./MagnifyingGlass-C25WkJ7l.js";import"./KandidatlisteContext-CVDxtMOc.js";import"./OrganisasjonsnummerAlert-4egePmqO.js";import"./VStack-8laNy6VZ.js";import"./BasePrimitive-DvHygoSy.js";import"./List-YyaVop-Q.js";import"./Link-CAniOPY2.js";import"./KandidatHendelseTag-DT02Bzbe.js";import"./ChatExclamationmark-k3SjiZ8B.js";import"./FileXMark-BsJB8mGI.js";import"./Trash-Dew1RFZr.js";import"./HandShakeHeart-BXBye7V1.js";import"./Calendar-Tt61gXfq.js";import"./ThumbUp-DcV-0-R1.js";import"./ExclamationmarkTriangle-D9ApQaQm.js";import"./Table-BDHm5sZI.js";import"./index-CyJSIw2Q.js";import"./index-B40KJ5b4.js";import"./util-B7_srA5m.js";import"./Dropdown-GPKLRQOh.js";import"./useControllableState-Ciifist9.js";import"./Popover-BpD41cX2.js";import"./floating-ui.react-BAFwGOOf.js";import"./Date.Input-Cq3oe4Uu.js";import"./useFormField-DBVEuA_2.js";import"./ChevronDown-BI71OKS5.js";import"./Modal.context-hrHc4u5t.js";import"./DismissableLayer-AMGQ8mwJ.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DeH1onQT.js";import"./Pencil-Du_KOvtu.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,Y as default};
