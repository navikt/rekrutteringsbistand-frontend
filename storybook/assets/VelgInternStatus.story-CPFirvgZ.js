import{av as s,j as i}from"./iframe-BQJxXW9d.js";import{w as d,c as o}from"./ContextDecorators-DZvxpU2v.js";import{V as n}from"./VelgInternStatus-tk-UWSVL.js";import"./preload-helper-DoVtK-SO.js";import"./KandidatlisteContext-D4D8XnLI.js";import"./OrganisasjonsnummerAlert-B7rcSb93.js";import"./VStack-D46019rJ.js";import"./BasePrimitive-BXqzJcUK.js";import"./List-CLc-5LkB.js";import"./Link-C54rWlFd.js";import"./KandidatHendelseTag-BtekIJZA.js";import"./Tag-4Cs80-uM.js";import"./FileXMark-BO5hpNuR.js";import"./Trash-CWCFb2vA.js";import"./HandShakeHeart-D1cb5IZd.js";import"./Calendar-BUIPGPOk.js";import"./ThumbUp-DXl4UXEL.js";import"./Table-C4cRX3o4.js";import"./util-BXDIftOZ.js";import"./format-DADo9TEe.js";import"./match-DeTCyl7A.js";import"./parseISO-MzENUmKJ.js";import"./parse-BMXXm650.js";import"./getDefaultOptions-Crc8mJKE.js";import"./util-C9HMcIxj.js";import"./InternStatusTag-DoIx7PHp.js";import"./CircleSlash-CP35Tfes.js";import"./XMarkOctagon-CEp2jiiq.js";import"./Reception-D0rus9wH.js";import"./SealCheckmark-CRYHaWwu.js";import"./PersonChat-CQ9jJyTD.js";import"./MagnifyingGlass-Bxf8hVFN.js";import"./Dropdown-CZgugMwY.js";import"./useControllableState-DLMKTCIV.js";import"./Popover-1RTQ74Kr.js";import"./floating-ui.react-qbgNuRzq.js";import"./Date.Input-DkIuf96S.js";import"./useFormField-CC83feVF.js";import"./ChevronDown-D_v_0qT0.js";import"./Modal.context-DxEobc4s.js";import"./DismissableLayer-D0uVOeIp.js";import"./useDescendant-BazVU77l.js";import"./useClientLayoutEffect-MoxS65NT.js";import"./Pencil-DrSGBszE.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
