import{P as s,j as i}from"./iframe-CC24wDKQ.js";import{V as n}from"./VelgInternStatus-mSolWqDp.js";import{w as d,c as o}from"./ContextDecorators-DO8BU597.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DOIba8eA.js";import"./Tag-DgZXKrLS.js";import"./CircleSlash-CFdZojVG.js";import"./XMarkOctagon-BT1PgdXr.js";import"./Reception-BVJZlA6O.js";import"./SealCheckmark-bw0xSgdR.js";import"./PersonChat-BP6QDJrH.js";import"./MagnifyingGlass-oDDyDGrU.js";import"./KandidatlisteContext-Dr34UCLz.js";import"./OrganisasjonsnummerAlert-6o4J3Zq8.js";import"./VStack-BfiJmBsb.js";import"./BasePrimitive-RaTy3Sqj.js";import"./List-BxJq4101.js";import"./Link-CLwnBQe7.js";import"./KandidatHendelseTag-DZm75Qvb.js";import"./ChatExclamationmark-CuAiLPOl.js";import"./FileXMark-DakMo6k3.js";import"./Trash-Cfv936UM.js";import"./HandShakeHeart-CwpdiEo3.js";import"./Calendar-Qlc-HePb.js";import"./ThumbUp-BMmej0A7.js";import"./Table-CvBE8rLO.js";import"./util-CwXuo_Oh.js";import"./parse-h5OPM2AO.js";import"./getDefaultOptions-DVLcaaiq.js";import"./parseISO-CY1zYzdS.js";import"./index-BWfBt7yf.js";import"./index-B40KJ5b4.js";import"./isBefore-V34-X8qa.js";import"./util-BYQIEfzV.js";import"./Dropdown-B2yDehoq.js";import"./useControllableState-CcDs5zF6.js";import"./Popover-oKf3d0QK.js";import"./floating-ui.react-BZgD_ST-.js";import"./Date.Input-CXtqeAvR.js";import"./useFormField-18lvTvbK.js";import"./ChevronDown-oQKRzDt4.js";import"./Modal.context-BxhMUhwK.js";import"./DismissableLayer-76B8ouvV.js";import"./useDescendant-DT7mSqql.js";import"./useClientLayoutEffect-BN154P74.js";import"./Pencil-DC3sKUhG.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
