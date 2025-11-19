import{V as s,j as i}from"./iframe-CiGY7qMR.js";import{V as n}from"./VelgInternStatus-DVThCtd8.js";import{w as d,c as o}from"./ContextDecorators-DAnV9lS_.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CgWbI2TD.js";import"./Tag-C0efUnwM.js";import"./CircleSlash-BZGnYb9R.js";import"./XMarkOctagon-BBY1P5h7.js";import"./Reception-Di7plibS.js";import"./SealCheckmark-CAHf51oR.js";import"./PersonChat-CkYMVLXT.js";import"./MagnifyingGlass-vnto5ZDD.js";import"./KandidatlisteContext-CqG63GHb.js";import"./OrganisasjonsnummerAlert-ByJga9bj.js";import"./VStack-C_-hnwwm.js";import"./BasePrimitive-BQ62VW93.js";import"./List--wBR2yL0.js";import"./Link-DyRtkKI1.js";import"./KandidatHendelseTag-CcqEyqef.js";import"./ChatExclamationmark-Ckn-l4A4.js";import"./FileXMark-BwXFQEJT.js";import"./Trash-digMADAk.js";import"./HandShakeHeart-B7NwZDqt.js";import"./Calendar-TIPtk1kB.js";import"./ThumbUp-X8wLfdad.js";import"./Table-CH84zTQf.js";import"./util-Fn-bZDVZ.js";import"./parse-Dg8aE5G9.js";import"./getDefaultOptions-CiRVjgWb.js";import"./parseISO-9yAsPxsQ.js";import"./index-VhmIyIcn.js";import"./index-B40KJ5b4.js";import"./isBefore-B2vJKrVG.js";import"./util-BAlQu1eo.js";import"./Dropdown-5rz4_Mh4.js";import"./useControllableState-BE8X9NLB.js";import"./Popover-Cddh8TWv.js";import"./floating-ui.react-kQ0dcq0t.js";import"./Date.Input-DpTSAKfW.js";import"./useFormField-C1e6No_-.js";import"./ChevronDown-C7Nf2yeE.js";import"./Modal.context-D2yQqxZ7.js";import"./DismissableLayer-BWiY_6h3.js";import"./useDescendant-X5nKPTUI.js";import"./useClientLayoutEffect-B5wV4Wz7.js";import"./Pencil-U42txE1G.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
