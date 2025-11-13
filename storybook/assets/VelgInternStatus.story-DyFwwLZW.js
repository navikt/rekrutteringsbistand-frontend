import{P as s,j as i}from"./iframe-BovJDKCI.js";import{V as n}from"./VelgInternStatus-yE_wXRdH.js";import{w as d,c as o}from"./ContextDecorators-B3aKcPYD.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-Bq1ixcfY.js";import"./Tag-66WObbC1.js";import"./CircleSlash-BUMjZTNF.js";import"./XMarkOctagon-BRuW-jO8.js";import"./Reception-DRc-rrhU.js";import"./SealCheckmark-CeZZMODi.js";import"./PersonChat-D7ypM_lx.js";import"./MagnifyingGlass-1yxc_Lrj.js";import"./KandidatlisteContext-C-Dx5kZ7.js";import"./OrganisasjonsnummerAlert-C4zHqR64.js";import"./VStack-D0AMLDXW.js";import"./BasePrimitive-BAxo2HmN.js";import"./List-7fyXgRE7.js";import"./Link-ClZLbEY_.js";import"./KandidatHendelseTag-C1qTQJ1v.js";import"./ChatExclamationmark-PLiAFIos.js";import"./FileXMark-CMhkvzRw.js";import"./Trash-C73CBX-Y.js";import"./HandShakeHeart-D4l4aMNW.js";import"./Calendar-DBuloJTq.js";import"./ThumbUp-wYJMbsDb.js";import"./Table-BNJX2O-z.js";import"./util-CUxBDTGI.js";import"./parse-BgrplRoJ.js";import"./getDefaultOptions-DK2iPdcc.js";import"./parseISO-C4snc2Vp.js";import"./index-CWVRmJSY.js";import"./index-B40KJ5b4.js";import"./isBefore-9mWIkaPW.js";import"./util-CVUTdVUi.js";import"./Dropdown-CsqgY7_l.js";import"./useControllableState-Cohy2CnX.js";import"./Popover-yu_1porq.js";import"./floating-ui.react-DZFgd5ZI.js";import"./Date.Input-ewhvnWIO.js";import"./useFormField-BNZ4k9l9.js";import"./ChevronDown-CJWPnQMx.js";import"./Modal.context-Dd1l30yo.js";import"./DismissableLayer-CJbI8_1U.js";import"./useDescendant-CJ6XBlhU.js";import"./useClientLayoutEffect-H9RrTIbx.js";import"./Pencil-Uq0QM0B0.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
