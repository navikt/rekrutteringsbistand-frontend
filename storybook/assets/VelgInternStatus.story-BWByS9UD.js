import{j as s}from"./iframe-BIBlb7jU.js";import{w as d,c as o}from"./ContextDecorators-DG7TdY99.js";import{V as n}from"./VelgInternStatus-CqUbTWE3.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-gmAv3jhr.js";import"./OrganisasjonsnummerAlert-DUbyiUeq.js";import"./VStack-UZ9RtCeW.js";import"./BasePrimitive-hRRbf9ja.js";import"./List-Crb_EZay.js";import"./Link-DtjVUng9.js";import"./KandidatHendelseTag-CyQmMP1Q.js";import"./Tag-bSqi75pu.js";import"./ChatExclamationmark-CmE2x4dW.js";import"./FileXMark-m8emJ4j5.js";import"./Trash-Bkja8DjR.js";import"./HandShakeHeart-C3gkb3XK.js";import"./Calendar-CdzV6HXg.js";import"./ThumbUp-D_YVTCCu.js";import"./Table-WCgBjGcl.js";import"./util-CAvOd24l.js";import"./format-alVTIgQr.js";import"./match--zb4cLZ5.js";import"./parseISO-Brau4hq8.js";import"./parse-Dylxks-E.js";import"./getDefaultOptions-COAmtKIT.js";import"./util-BqVd911_.js";import"./InternStatusTag-uMZ5T2yY.js";import"./CircleSlash-IbFCpIk7.js";import"./XMarkOctagon-qyrZ4kmZ.js";import"./Reception-B-GJ_xQx.js";import"./SealCheckmark-DGXOFkiK.js";import"./PersonChat-B-_N7PX3.js";import"./MagnifyingGlass-Db_ra71N.js";import"./Dropdown-CmoItigC.js";import"./useControllableState-AwvWBElT.js";import"./Popover-RWG-ovwh.js";import"./floating-ui.react-DEzdvJId.js";import"./Date.Input--Gl-NW01.js";import"./useFormField-DrsqqdWL.js";import"./ChevronDown-DuV9F8YC.js";import"./Modal.context-CHA4jJyw.js";import"./DismissableLayer-DWR2AiB2.js";import"./useDescendant-JMK-5JaG.js";import"./useClientLayoutEffect-Dh5o0Bmr.js";import"./Pencil-BdSb1Hg4.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
