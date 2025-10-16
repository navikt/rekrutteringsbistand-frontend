import{aP as s,j as i}from"./iframe-cKv9Xcbc.js";import{w as d,c as o}from"./ContextDecorators-RvCxTBsa.js";import{V as n}from"./VelgInternStatus-DPv1LZtW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BrVtYsx9.js";import"./OrganisasjonsnummerAlert-BBJfjV8T.js";import"./VStack-AfRfjUcd.js";import"./BasePrimitive-BkBXH3Sq.js";import"./List-BHwStZyR.js";import"./Link-BJQb0isM.js";import"./KandidatHendelseTag-BU7zLNHq.js";import"./Tag-CyuLxgyY.js";import"./FileXMark-Db78uuup.js";import"./Trash-DYfGUhMj.js";import"./HandShakeHeart-_A7h8Tvx.js";import"./Calendar-BA-ZzF_J.js";import"./ThumbUp-42lJbfgi.js";import"./Table-DrCFeXe3.js";import"./util-FTyK7T7B.js";import"./format-oXsUGbWM.js";import"./match-Bg7PaJKN.js";import"./parseISO-BQHssbTv.js";import"./parse-CGsvWix5.js";import"./getDefaultOptions-D-Ph7PSR.js";import"./util-I-jUCGFx.js";import"./InternStatusTag-0u1X7JDq.js";import"./CircleSlash-DlQcdXDq.js";import"./XMarkOctagon-JBo6oxdj.js";import"./Reception-Bilmxniy.js";import"./SealCheckmark-BqrSXpGH.js";import"./PersonChat-Bysg9heJ.js";import"./MagnifyingGlass-D06APWS5.js";import"./Dropdown-DCxwROkR.js";import"./useControllableState-BOJnqGXH.js";import"./Popover-BEE4n7gw.js";import"./floating-ui.react-CcSFU4dS.js";import"./Date.Input-Bi8louro.js";import"./useFormField-ipfHAWys.js";import"./ChevronDown-CWqSwAPV.js";import"./Modal.context-Bb4T5EwF.js";import"./DismissableLayer-BmaSc7gG.js";import"./useDescendant-6viKTCKV.js";import"./useClientLayoutEffect-BzqYQ3NJ.js";import"./Pencil-B6bdoMNY.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
