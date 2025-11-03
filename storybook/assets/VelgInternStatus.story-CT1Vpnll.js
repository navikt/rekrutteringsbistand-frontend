import{P as s,j as i}from"./iframe-B_4Bmvgq.js";import{V as n}from"./VelgInternStatus-DNxqILs4.js";import{w as d,c as o}from"./ContextDecorators-B7JW1qJK.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-D96V5m-q.js";import"./Tag-De8rW7_j.js";import"./CircleSlash-CIlgibQW.js";import"./XMarkOctagon-dS58ECLp.js";import"./Reception-DVpc_34e.js";import"./SealCheckmark-B9ndUuPS.js";import"./PersonChat-DySgvoT5.js";import"./MagnifyingGlass-_l7Xtu-o.js";import"./KandidatlisteContext-i_nfhuWU.js";import"./OrganisasjonsnummerAlert-CqgMt66G.js";import"./VStack-CfKwjGy1.js";import"./BasePrimitive-DQobvrvZ.js";import"./List-CzLJLjt6.js";import"./Link-BpNm44et.js";import"./KandidatHendelseTag-DytQV4w5.js";import"./ChatExclamationmark-BbG6xmDN.js";import"./FileXMark-D6H9E5OH.js";import"./Trash-BLDYiN1k.js";import"./HandShakeHeart-B3JBqYbB.js";import"./Calendar-CNvG0z3N.js";import"./ThumbUp-cNmdmnjm.js";import"./Table-Bt8oMTeV.js";import"./util-DxRjoqmU.js";import"./parse-BWK0vuo5.js";import"./getDefaultOptions-zcAWsOsE.js";import"./parseISO-D8xjauEE.js";import"./index-kl9f-6X3.js";import"./index-B40KJ5b4.js";import"./isBefore-BimlqcNR.js";import"./util-DbDFcdAO.js";import"./Dropdown-NL-UVZWV.js";import"./useControllableState-W5agygci.js";import"./Popover-DQqDiKXh.js";import"./floating-ui.react-DvaqMJwp.js";import"./Date.Input-BzmHLEDM.js";import"./useFormField-6IqjGViV.js";import"./ChevronDown-iJetkpSI.js";import"./Modal.context-BqzOV7AP.js";import"./DismissableLayer-TDH-sgIn.js";import"./useDescendant-BRdXeAaX.js";import"./useClientLayoutEffect-BYRGBLGK.js";import"./Pencil-czKviEJy.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
