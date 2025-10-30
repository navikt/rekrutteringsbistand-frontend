import{P as s,j as i}from"./iframe-DenWKEC9.js";import{w as d,c as o}from"./ContextDecorators-Zba6gbmz.js";import{V as n}from"./VelgInternStatus-d35qdQWV.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CsKBS0BO.js";import"./OrganisasjonsnummerAlert-obK7_QDf.js";import"./VStack-CgG0_7Bf.js";import"./BasePrimitive-CFAu65JT.js";import"./List-kTGH93FM.js";import"./Link-DfNt57rx.js";import"./KandidatHendelseTag-B9pLql8l.js";import"./Tag-mXhf_Gx6.js";import"./ChatExclamationmark-cMbkJjdc.js";import"./FileXMark-Bh_6TLBp.js";import"./Trash-B6zj5MlH.js";import"./HandShakeHeart-CPY-QxOG.js";import"./Calendar-Be4J78HH.js";import"./ThumbUp-ehS7sMwt.js";import"./Table-CiBZ0HtF.js";import"./util-vHg8_hOB.js";import"./parse-DZwGwjot.js";import"./getDefaultOptions-DeORvD4A.js";import"./parseISO-BVrL3Abg.js";import"./index-CFn0OksF.js";import"./index-B40KJ5b4.js";import"./isBefore-BBZToDFP.js";import"./util-BGPb1UJH.js";import"./InternStatusTag-ChXCpeSf.js";import"./CircleSlash-DunIrLsQ.js";import"./XMarkOctagon-ClkeX1oa.js";import"./Reception-CBAddrV3.js";import"./SealCheckmark-COF9tNdJ.js";import"./PersonChat-BE1jRUHk.js";import"./MagnifyingGlass-DqVfHLhB.js";import"./Dropdown-CqiwrMk1.js";import"./useControllableState-DjghFc1P.js";import"./Popover-BFANO1Vq.js";import"./floating-ui.react-C8po_Knd.js";import"./Date.Input-DPKg9Xc0.js";import"./useFormField-CQ6rQeaw.js";import"./ChevronDown-Db1AikAf.js";import"./Modal.context-Dz6HeStX.js";import"./DismissableLayer-DZ5QmeOI.js";import"./useDescendant-B-WMW2Zy.js";import"./useClientLayoutEffect-DBad4hBW.js";import"./Pencil-CgFugyv-.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
