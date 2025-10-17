import{aP as s,j as i}from"./iframe-C5WYDDgG.js";import{w as d,c as o}from"./ContextDecorators-D8p2HP-6.js";import{V as n}from"./VelgInternStatus-C28Ev3ms.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DvE1vsyh.js";import"./OrganisasjonsnummerAlert-C85y1jZg.js";import"./VStack-CGjISBtE.js";import"./BasePrimitive-Cpkpxro0.js";import"./List-DAOF7kuF.js";import"./Link-Crh-IT43.js";import"./KandidatHendelseTag-CsB2A49T.js";import"./Tag-DimcxUST.js";import"./ChatExclamationmark-BPFzi1ZK.js";import"./FileXMark-C2nd-YET.js";import"./Trash-dUh1hCIp.js";import"./HandShakeHeart-BLwS6NQP.js";import"./Calendar-Br9eUOU1.js";import"./ThumbUp-D-407tMV.js";import"./Table-CTdTQr35.js";import"./util-wTlgndPH.js";import"./format-D6tTPMvi.js";import"./match-CesVRQGT.js";import"./parseISO-DB2fE1bN.js";import"./parse-6GhogZDZ.js";import"./getDefaultOptions-CBL_1nw2.js";import"./util-xKC9If_S.js";import"./InternStatusTag-nSYBO_OQ.js";import"./CircleSlash-DiW_dngZ.js";import"./XMarkOctagon-DsZc9IYP.js";import"./Reception-C-YRABWs.js";import"./SealCheckmark-C7VBf6Oe.js";import"./PersonChat-BjgQvdeY.js";import"./MagnifyingGlass-BOT71ADi.js";import"./Dropdown-BYrICaTB.js";import"./useControllableState-Cdxfncmo.js";import"./Popover-BbeugYOv.js";import"./floating-ui.react-Cm-18w_6.js";import"./Date.Input-Bq2Wg-Yo.js";import"./useFormField-2ZYty3U6.js";import"./ChevronDown-C4tZxf6w.js";import"./Modal.context-CyBBT6uy.js";import"./DismissableLayer-BndGehaV.js";import"./useDescendant-BQaF6zUo.js";import"./useClientLayoutEffect-CEMUO7Yx.js";import"./Pencil-a4eSB7OK.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,tt as default};
