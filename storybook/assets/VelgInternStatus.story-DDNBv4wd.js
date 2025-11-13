import{P as s,j as i}from"./iframe-D8-4xOqC.js";import{V as n}from"./VelgInternStatus-bJZZgOH7.js";import{w as d,c as o}from"./ContextDecorators-D0OYvMcp.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BdaOuuvK.js";import"./Tag-CX-JbphV.js";import"./CircleSlash-A32MjbaE.js";import"./XMarkOctagon-CafkJ9Ks.js";import"./Reception-ArpiUDur.js";import"./SealCheckmark-CaT_jLUP.js";import"./PersonChat-JlxZcjQY.js";import"./MagnifyingGlass-D7CDtHOA.js";import"./KandidatlisteContext-CKHm_AeS.js";import"./OrganisasjonsnummerAlert-BZQSof-U.js";import"./VStack-Csyu--T2.js";import"./BasePrimitive-SqCEysjS.js";import"./List-Cf5eDNuv.js";import"./Link-tQS8r4JE.js";import"./KandidatHendelseTag-3LzUL4w_.js";import"./ChatExclamationmark-BgVP6Ccr.js";import"./FileXMark-60MOd4dt.js";import"./Trash-DjsmULNt.js";import"./HandShakeHeart-n157OPxh.js";import"./Calendar-CM-2s9vn.js";import"./ThumbUp-CgwsWvRJ.js";import"./Table-CjFE-4lz.js";import"./util-CGLOq6CR.js";import"./parse-Cc9pUomc.js";import"./getDefaultOptions-juMckS2Q.js";import"./parseISO-C_A1ZeST.js";import"./index-DHUfW4xb.js";import"./index-B40KJ5b4.js";import"./isBefore-CyeQ0GHU.js";import"./util-DGKfUUBU.js";import"./Dropdown-Ba1e9-Mh.js";import"./useControllableState-C_sAK1x3.js";import"./Popover-D-7e52ie.js";import"./floating-ui.react-DdHAZyX-.js";import"./Date.Input-BehvWA5_.js";import"./useFormField-BPLkC9Pa.js";import"./ChevronDown-CdyITUaA.js";import"./Modal.context-D4VPuVea.js";import"./DismissableLayer-CWqnheAj.js";import"./useDescendant-r2CzUX1t.js";import"./useClientLayoutEffect-7ME0nGbZ.js";import"./Pencil-IRhQY7CL.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
