import{N as s,j as i}from"./iframe-DLcFPOQU.js";import{V as n}from"./VelgInternStatus-eJ5mq_mU.js";import{w as d,c as o}from"./ContextDecorators-DeCFFCPk.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BXr_LZz0.js";import"./Tag-cr-amcGI.js";import"./CircleSlash-Tz5e5tN1.js";import"./Reception-C884UC2i.js";import"./SealCheckmark-BlmXko36.js";import"./PersonChat-Dbh14l0V.js";import"./MagnifyingGlass-CyirO2se.js";import"./KandidatlisteContext-DOCnuYM1.js";import"./OrganisasjonsnummerAlert-BeegMXwe.js";import"./VStack-WlCR9Jmi.js";import"./BasePrimitive-D2jpHuoC.js";import"./Box-DVzxHLWM.js";import"./List-D0BKDGOo.js";import"./Link-CAMq_i6s.js";import"./KandidatHendelseTag-BiqlCmrf.js";import"./ChatExclamationmark-CNWMMC5w.js";import"./FileXMark-CI6cgFU2.js";import"./Trash-4_6yTjs7.js";import"./HandShakeHeart-DTPUZIKy.js";import"./Calendar-C6Zg2cWW.js";import"./ThumbUp-BXZGtsXc.js";import"./Table-DBHMMNrv.js";import"./index-DpMfSoWt.js";import"./index-B40KJ5b4.js";import"./util-CY7Z07jd.js";import"./Dropdown-DnoOFWXD.js";import"./useControllableState-klXAuQpk.js";import"./Popover-BRPonoUr.js";import"./floating-ui.react-yTmGsUf2.js";import"./Modal.context-DE-XYzXq.js";import"./DismissableLayer-CFcBKd-R.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C8cW1GFx.js";import"./Pencil-C1we882K.js";const P={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,P as default};
