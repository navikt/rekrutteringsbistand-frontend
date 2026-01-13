import{O as s,j as i}from"./iframe-CV73DyWa.js";import{V as n}from"./VelgInternStatus-DKWJtHJc.js";import{w as d,c as o}from"./ContextDecorators-B7wXlcn7.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-C06AfNC1.js";import"./Tag-Dd3cMFTB.js";import"./CircleSlash-DYD3UppU.js";import"./XMarkOctagon-DlWhnY-e.js";import"./Reception-Dl9wl7R8.js";import"./SealCheckmark-BMMYrEOS.js";import"./PersonChat-BEtJrv5Y.js";import"./MagnifyingGlass-f2biF762.js";import"./KandidatlisteContext-CjNOdAMg.js";import"./OrganisasjonsnummerAlert-DjE0GWHo.js";import"./VStack-cEHi9SUW.js";import"./BasePrimitive-B_De4CAh.js";import"./List-HnOz_kCx.js";import"./Link-57MGbgPS.js";import"./KandidatHendelseTag-DaWCieF5.js";import"./ChatExclamationmark-BBPsMkee.js";import"./FileXMark-CgD9lN1y.js";import"./Trash--Kaxf-qN.js";import"./HandShakeHeart-C1iR4CaW.js";import"./Calendar-CapMgFXy.js";import"./ThumbUp-BSLXHmhe.js";import"./ExclamationmarkTriangle-BwwKE67-.js";import"./Table-B8F7NOQx.js";import"./index-DH0maD0N.js";import"./index-B40KJ5b4.js";import"./util-4kSLp8PR.js";import"./Dropdown-D6ZFvoR5.js";import"./useControllableState-C-h5BLq2.js";import"./Popover-C5sZQCnW.js";import"./floating-ui.react--4vdpoxG.js";import"./Date.Input-BqYKtR5d.js";import"./useFormField-ApOpuFuN.js";import"./ChevronDown-QpvSSQJL.js";import"./Modal.context-duSZOSEU.js";import"./DismissableLayer-Dluz05na.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-f8TwtSD1.js";import"./Pencil-BiwAnQHV.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
