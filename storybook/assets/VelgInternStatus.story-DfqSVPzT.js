import{W as s,j as i}from"./iframe-Jss5f2B_.js";import{V as n}from"./VelgInternStatus-D9qw5rCI.js";import{w as d,c as o}from"./ContextDecorators-Dh3r8LDl.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BbBG0fUI.js";import"./Tag-DMI8stAH.js";import"./CircleSlash-CkwJd_zi.js";import"./XMarkOctagon-BaODrmPE.js";import"./Reception-BYJFun7s.js";import"./SealCheckmark-C7Ywtsfx.js";import"./PersonChat-mg3Ri7LY.js";import"./MagnifyingGlass-x-u7GO2H.js";import"./KandidatlisteContext-Ct0r6n5n.js";import"./OrganisasjonsnummerAlert-DdQwQ_tc.js";import"./VStack-Bvg5AqJD.js";import"./BasePrimitive-d2SIG9Yf.js";import"./List-CE9DLIHw.js";import"./Link-s8QL5d5b.js";import"./KandidatHendelseTag-CAiVXrpu.js";import"./ChatExclamationmark-DoO1Xfh2.js";import"./FileXMark-BB5uMe3O.js";import"./Trash-bW2rKM93.js";import"./HandShakeHeart-U7xHXCw-.js";import"./Calendar-Pc9FG0ds.js";import"./ThumbUp-DXiBthy6.js";import"./Table-IzXQZlKx.js";import"./dato-B0xplmbs.js";import"./parse-Cx1esH9S.js";import"./getDefaultOptions-BCEF9-o_.js";import"./parseISO-CMhBJTE1.js";import"./index-CnHa8f62.js";import"./index-B40KJ5b4.js";import"./util-gyJA8csV.js";import"./Dropdown-CbX0X0mX.js";import"./useControllableState-CZKHLiQ0.js";import"./Popover-C-0-1OWm.js";import"./floating-ui.react-fqAcPkKE.js";import"./Date.Input-Dwqf4bQn.js";import"./useFormField-D0W6d14a.js";import"./ChevronDown-CNVEhu9g.js";import"./Modal.context-55emPdz_.js";import"./DismissableLayer-BExMC79b.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Bxl3NU5W.js";import"./Pencil-I67Ffd98.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
