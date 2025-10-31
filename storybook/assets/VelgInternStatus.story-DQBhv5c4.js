import{P as s,j as i}from"./iframe-BieBZBrC.js";import{V as n}from"./VelgInternStatus-CUAfuyGa.js";import{w as d,c as o}from"./ContextDecorators-D2Oshgmx.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-E8BFcXbN.js";import"./Tag-BnzJTYvC.js";import"./CircleSlash-C8SBVT3u.js";import"./XMarkOctagon-C09FPck3.js";import"./Reception-C3P0uG9l.js";import"./SealCheckmark-D7PTJQ1y.js";import"./PersonChat-CMLExyWJ.js";import"./MagnifyingGlass-C5Ux4foY.js";import"./KandidatlisteContext-Bnf8RiZM.js";import"./OrganisasjonsnummerAlert-BvKz5vny.js";import"./VStack-j_6fDLqS.js";import"./BasePrimitive-C-AyPf28.js";import"./List-tzDAdmQv.js";import"./Link-CWeI14oH.js";import"./KandidatHendelseTag-Dd3aEsI4.js";import"./ChatExclamationmark-CElSCxaJ.js";import"./FileXMark-DnWXPm_c.js";import"./Trash-BYeHNZgS.js";import"./HandShakeHeart-DYywCy2W.js";import"./Calendar-BdhU97-1.js";import"./ThumbUp-Dpw8xDbk.js";import"./Table-Ce5VDLFH.js";import"./util-CaZvvzYS.js";import"./parse-COH9Z8ot.js";import"./getDefaultOptions-CHo2M-IZ.js";import"./parseISO-GHa_kk7l.js";import"./index-C2SWHjju.js";import"./index-B40KJ5b4.js";import"./isBefore-CeGnEHPl.js";import"./util-CF1SHtQv.js";import"./Dropdown-CqmJaGEC.js";import"./useControllableState-DtKQdZJ4.js";import"./Popover-C_C8US79.js";import"./floating-ui.react-BT8q7oaF.js";import"./Date.Input-YnMHaQ4h.js";import"./useFormField-A_jOGruo.js";import"./ChevronDown-66bC11TG.js";import"./Modal.context-BqRc_p1X.js";import"./DismissableLayer-BYCpcB0r.js";import"./useDescendant-CBlcYzGO.js";import"./useClientLayoutEffect-B-LF-TZu.js";import"./Pencil-DGN9OGCp.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
