import{P as s,j as i}from"./iframe-Dc0o8n1N.js";import{V as n}from"./VelgInternStatus-DqWsClFl.js";import{w as d,c as o}from"./ContextDecorators-BM_h4S7t.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-COFFIwuA.js";import"./Tag-AkL8D5A1.js";import"./CircleSlash-CXVCV9-R.js";import"./XMarkOctagon-BTVpph02.js";import"./Reception-BWH29YXG.js";import"./SealCheckmark-BCvJSK_d.js";import"./PersonChat-Dg6QbqPv.js";import"./MagnifyingGlass-DRzFBSNK.js";import"./KandidatlisteContext-BmgJ4OH_.js";import"./OrganisasjonsnummerAlert-CqZxctra.js";import"./VStack-C9L46_VK.js";import"./BasePrimitive-Dmb6kQD-.js";import"./List-jKdfhMM1.js";import"./Link-Btc_Gnct.js";import"./KandidatHendelseTag-a3V7u5VB.js";import"./ChatExclamationmark-JIPFnqqP.js";import"./FileXMark-BTey7NHE.js";import"./Trash-DO5ng2Yk.js";import"./HandShakeHeart-42WG9tcO.js";import"./Calendar-UTK99kHI.js";import"./ThumbUp-CsszLo0o.js";import"./Table-VQ-DE8Om.js";import"./util-DoXsPMYu.js";import"./parse-C0GdbZBL.js";import"./getDefaultOptions-VI3jz9kh.js";import"./parseISO-iTHWhyQw.js";import"./index-BYAn7sa8.js";import"./index-B40KJ5b4.js";import"./isBefore-DB59kyBO.js";import"./util-54MHG8lP.js";import"./Dropdown-DDSKFsAn.js";import"./useControllableState-Bks-1kQU.js";import"./Popover-DcGzMICz.js";import"./floating-ui.react-BRJoX_3W.js";import"./Date.Input-CTYgFq-P.js";import"./useFormField-v17k0j8g.js";import"./ChevronDown-tMowo8ra.js";import"./Modal.context-BU9LkM9K.js";import"./DismissableLayer-D95--5DY.js";import"./useDescendant-D2hOP2-w.js";import"./useClientLayoutEffect-BxfSOdln.js";import"./Pencil-BDrrWNVL.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
