import{P as s,j as i}from"./iframe-CQ6vvEeK.js";import{V as n}from"./VelgInternStatus-CqafEMfJ.js";import{w as d,c as o}from"./ContextDecorators-DyzBdEdC.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BgMK1MyJ.js";import"./Tag-a5dvz4kl.js";import"./CircleSlash-XREgUtzt.js";import"./XMarkOctagon-tHZIq7Oo.js";import"./Reception-Bsv3f4Ab.js";import"./SealCheckmark-n7Hvd44u.js";import"./PersonChat-Doo-wgws.js";import"./MagnifyingGlass-BM6G4p1g.js";import"./KandidatlisteContext-CKszYbKO.js";import"./OrganisasjonsnummerAlert-BmxN11Mr.js";import"./VStack-ChM420R4.js";import"./BasePrimitive-BXoVEjCk.js";import"./List--EevA5Ol.js";import"./Link-x4iWrhKq.js";import"./KandidatHendelseTag-DLSYsUU6.js";import"./ChatExclamationmark-tt-RHu41.js";import"./FileXMark-Cky77w8Z.js";import"./Trash-DAs8orv7.js";import"./HandShakeHeart-JGxqHzHK.js";import"./Calendar-ZplbI33s.js";import"./ThumbUp-wH43M9I4.js";import"./Table-B30Jb__B.js";import"./util-B53mYrdJ.js";import"./parse-D-IkhgM-.js";import"./getDefaultOptions-N4tXrMdT.js";import"./parseISO-ByaoA-27.js";import"./index-DjwqnLDo.js";import"./index-B40KJ5b4.js";import"./isBefore-BhwUETve.js";import"./util-BJHpjWP_.js";import"./Dropdown-_ii2vLgG.js";import"./useControllableState-B4ZbH_WK.js";import"./Popover-CsWVMCi5.js";import"./floating-ui.react-q6qfomDA.js";import"./Date.Input-Lk24Z0xI.js";import"./useFormField-BWgTqZvY.js";import"./ChevronDown-CH8VYIJt.js";import"./Modal.context-BLjCIKII.js";import"./DismissableLayer-iXkqC0Wv.js";import"./useDescendant-AZdzncnu.js";import"./useClientLayoutEffect-DY3UtHGC.js";import"./Pencil-DsceKG-I.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,at as default};
