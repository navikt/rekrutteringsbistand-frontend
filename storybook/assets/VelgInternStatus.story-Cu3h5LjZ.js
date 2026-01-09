import{O as s,j as i}from"./iframe-5rwrKWZV.js";import{V as n}from"./VelgInternStatus-BwbK-Qug.js";import{w as d,c as o}from"./ContextDecorators-DU64r7NL.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DJSezF1o.js";import"./Tag-D175MPv5.js";import"./CircleSlash-fkFT3oU4.js";import"./XMarkOctagon-DrtYrV-C.js";import"./Reception-BOrtnN0J.js";import"./SealCheckmark-CNclQBUt.js";import"./PersonChat-BExsCfMf.js";import"./MagnifyingGlass-Bj8UyuXl.js";import"./KandidatlisteContext-D8uGXMrm.js";import"./OrganisasjonsnummerAlert-DU2hBNw6.js";import"./VStack-oJzbuFmu.js";import"./BasePrimitive-CL0qHiBR.js";import"./List-DVV_3A1y.js";import"./Link-C6ttPdgA.js";import"./KandidatHendelseTag-wCOqQU_l.js";import"./ChatExclamationmark-BRtmzK2M.js";import"./FileXMark-Cjvrd1Rm.js";import"./Trash-CO9mAeL6.js";import"./HandShakeHeart-2soFoNDL.js";import"./Calendar-DErdOGUb.js";import"./ThumbUp-D_I-6Tvx.js";import"./ExclamationmarkTriangle-C-veCX7w.js";import"./Table-B5a9LhMk.js";import"./index-OgKCj3ij.js";import"./index-B40KJ5b4.js";import"./util-CkXlrIPZ.js";import"./Dropdown-DT5Hn_0S.js";import"./useControllableState-D-uW9VwC.js";import"./Popover-BwBktzX1.js";import"./floating-ui.react-1FrPqNCb.js";import"./Date.Input-DFNMSpaY.js";import"./useFormField-DL1f3G2z.js";import"./ChevronDown-Cf2jlvYQ.js";import"./Modal.context-8SGbIxVb.js";import"./DismissableLayer-BDumuCnE.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DOxN0QLi.js";import"./Pencil-DncpSyE8.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
