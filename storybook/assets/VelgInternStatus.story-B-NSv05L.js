import{V as s,j as i}from"./iframe-B5k7HgKP.js";import{V as n}from"./VelgInternStatus-B74a_ADo.js";import{w as d,c as o}from"./ContextDecorators-Bl6_1Vly.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-B1wxHIcj.js";import"./Tag-Da0f1wDh.js";import"./CircleSlash-BSJOdY0M.js";import"./XMarkOctagon-DZu49U40.js";import"./Reception-DplZP6sG.js";import"./SealCheckmark-CaNJ327C.js";import"./PersonChat-DXR5swbl.js";import"./MagnifyingGlass-H56aZkvq.js";import"./KandidatlisteContext-CvPwwAd8.js";import"./OrganisasjonsnummerAlert-qh5-HCeD.js";import"./VStack-DwNyMrLP.js";import"./BasePrimitive-ChLjm-OF.js";import"./List-Dsa8NCSm.js";import"./Link-C19GH7by.js";import"./KandidatHendelseTag-CAWwf87G.js";import"./ChatExclamationmark-DnfOejm9.js";import"./FileXMark-BUypplJh.js";import"./Trash-fwld1poE.js";import"./HandShakeHeart-ZwdqVNvv.js";import"./Calendar-BWc64Fs3.js";import"./ThumbUp-D4CF9KsB.js";import"./Table-Bt_s7cRr.js";import"./util-DFhp_AVe.js";import"./parse-DdTbfJuI.js";import"./getDefaultOptions-C_GWPHaZ.js";import"./parseISO-Pc_TeQhl.js";import"./index-BiQOaXy7.js";import"./index-B40KJ5b4.js";import"./isBefore-Cyp7XTD_.js";import"./util-BxKh5lRO.js";import"./Dropdown-CWph29Kh.js";import"./useControllableState-CUN5WquP.js";import"./Popover-BNz7E4a5.js";import"./floating-ui.react-BPABgFu6.js";import"./Date.Input-CmGT4RU1.js";import"./useFormField-BmZi7DJY.js";import"./ChevronDown-CWuZpo8s.js";import"./Modal.context-BcWwb0YD.js";import"./DismissableLayer-4lsa6TLq.js";import"./useDescendant-CPgeBe8O.js";import"./useClientLayoutEffect-DKPCfDLv.js";import"./Pencil-B2ycSVjU.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
