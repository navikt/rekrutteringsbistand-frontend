import{j as s}from"./iframe-B32qNefX.js";import{w as d,c as o}from"./ContextDecorators-CGSZEHVY.js";import{V as n}from"./VelgInternStatus-BSC_-GtY.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DrISJs4o.js";import"./OrganisasjonsnummerAlert-DVGO9JVc.js";import"./VStack-DFkjK8C8.js";import"./BasePrimitive-CdkbGHJE.js";import"./List-CjDu2wlh.js";import"./Link-CP7bvi09.js";import"./KandidatHendelseTag-fn8eQ-M4.js";import"./Tag-PkXEKTsX.js";import"./FileXMark-DDyjaQZP.js";import"./Trash-BCQdTe5O.js";import"./HandShakeHeart-cInNHyDW.js";import"./Calendar-Bwyidtct.js";import"./ThumbUp-JhG_Nyhr.js";import"./Table-NKXcIsJo.js";import"./util-DbPJsKGZ.js";import"./format-uYcW2n3z.js";import"./match-CMgwdI-q.js";import"./parseISO-djV4R28G.js";import"./parse-Ik5otwk5.js";import"./getDefaultOptions-IbWvzyFj.js";import"./util-CBHRAVYp.js";import"./InternStatusTag-C8v3DT6p.js";import"./CircleSlash-CQg5VbRC.js";import"./XMarkOctagon-Qk90tW5f.js";import"./Reception-CbMNDuKk.js";import"./SealCheckmark-Bhs4ilu_.js";import"./PersonChat-oe7xlgKM.js";import"./MagnifyingGlass-DnLufmDw.js";import"./Dropdown-CU4VcFhH.js";import"./useControllableState--ugcGh6c.js";import"./Popover-Cma-SxoT.js";import"./floating-ui.react-CnRFprKk.js";import"./Date.Input-X7eAZKs2.js";import"./useFormField-nToWHv09.js";import"./ChevronDown-CjecZT6b.js";import"./Modal.context-CHSEilAo.js";import"./DismissableLayer-Abfm5WT2.js";import"./useDescendant-CzVCYVyK.js";import"./useClientLayoutEffect-DcT_OAyU.js";import"./Pencil-fHopg1xT.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
