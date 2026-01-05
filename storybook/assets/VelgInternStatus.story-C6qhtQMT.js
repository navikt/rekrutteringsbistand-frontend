import{O as s,j as i}from"./iframe-V8deF7AU.js";import{V as n}from"./VelgInternStatus-BVlx0NGA.js";import{w as d,c as o}from"./ContextDecorators-CEn5GkJK.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-4qaXNe7n.js";import"./Tag-t-mS956V.js";import"./CircleSlash-zYCb7v28.js";import"./XMarkOctagon-CMKsTjCy.js";import"./Reception-DJ6pdhMQ.js";import"./SealCheckmark-C-8Dfazv.js";import"./PersonChat-BHl-zk8U.js";import"./MagnifyingGlass-CemK8iNF.js";import"./KandidatlisteContext-CKbhKpGW.js";import"./OrganisasjonsnummerAlert-DCAdZLhF.js";import"./VStack-4hphIx77.js";import"./BasePrimitive-DojJiNHv.js";import"./List-BMjmv9Dz.js";import"./Link-D4MbMoav.js";import"./KandidatHendelseTag-DJa--HJX.js";import"./ChatExclamationmark-D4jAP78d.js";import"./FileXMark-CyITHuIm.js";import"./Trash-Z3qgeSL3.js";import"./HandShakeHeart-CE085DT4.js";import"./Calendar-BGVAPjpH.js";import"./ThumbUp-CKqB7qDV.js";import"./ExclamationmarkTriangle-1XwdyIBw.js";import"./Table-bvu5gXu-.js";import"./index-WQZ1lYgR.js";import"./index-B40KJ5b4.js";import"./util-CZlB0KAF.js";import"./Dropdown-9EgxOdl0.js";import"./useControllableState-BrD3n7yG.js";import"./Popover-pXnfkEep.js";import"./floating-ui.react-EAeme2qu.js";import"./Date.Input-B5CGs7IV.js";import"./useFormField-BI6hugGR.js";import"./ChevronDown-GlmJUWNv.js";import"./Modal.context-CGw18QOf.js";import"./DismissableLayer-Bcdf3wle.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CubqqCOH.js";import"./Pencil-DCwaRQZg.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
