import{O as s,j as i}from"./iframe-CQil8Ac-.js";import{V as n}from"./VelgInternStatus-CEI0XdOS.js";import{w as d,c as o}from"./ContextDecorators-BDAw5V3z.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-0eBR3k4P.js";import"./Tag-Bas5e0Nb.js";import"./CircleSlash-kpr4N1zJ.js";import"./XMarkOctagon-CatuzWmz.js";import"./Reception-DHqcs1kP.js";import"./SealCheckmark-D6s1SIJd.js";import"./PersonChat-CpOKKHPw.js";import"./MagnifyingGlass-OCZgDpsP.js";import"./KandidatlisteContext-SkgljsBN.js";import"./OrganisasjonsnummerAlert-odXmaA76.js";import"./VStack-ClTC7-Qh.js";import"./BasePrimitive-DbEo0fjm.js";import"./List-CkRxobO3.js";import"./Link-D4LnQKIk.js";import"./KandidatHendelseTag-CCi1oh8O.js";import"./ChatExclamationmark-BeuekrfM.js";import"./FileXMark-3YevlryT.js";import"./Trash-DzjGyRR4.js";import"./HandShakeHeart-CjMF1Meo.js";import"./Calendar-DjNLQ5xy.js";import"./ThumbUp-DvNucyaU.js";import"./ExclamationmarkTriangle-CZa1nyJG.js";import"./Table-DerwyLaa.js";import"./index-CAf5FEcx.js";import"./index-B40KJ5b4.js";import"./util-DvpZv3Av.js";import"./Dropdown-EDhAIha7.js";import"./useControllableState-DoktTe-G.js";import"./Popover-Ct_rdUbH.js";import"./floating-ui.react-ByckfoFE.js";import"./Date.Input-FBhanq2N.js";import"./useFormField-CwsHIkrX.js";import"./ChevronDown-BQMQJvkf.js";import"./Modal.context-C0GzMoCc.js";import"./DismissableLayer-DBjrKVPw.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-kHAbcb-S.js";import"./Pencil-DdO3ejUt.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,Y as default};
