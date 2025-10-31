import{P as s,j as i}from"./iframe-CVBkVRHF.js";import{V as n}from"./VelgInternStatus-B7GaDTXJ.js";import{w as d,c as o}from"./ContextDecorators-DG5y3y-F.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-zJKWWPtE.js";import"./Tag-BADpau7b.js";import"./CircleSlash-YC6KZ_Qx.js";import"./XMarkOctagon-CP15OjqP.js";import"./Reception-CKdHEVwB.js";import"./SealCheckmark-CI8Tmoff.js";import"./PersonChat-B_oC9oT9.js";import"./MagnifyingGlass-DL0BAhX7.js";import"./KandidatlisteContext-BpOZnLcj.js";import"./OrganisasjonsnummerAlert-Dp5HlO_N.js";import"./VStack-Cq6dbmLc.js";import"./BasePrimitive-BeBnSchP.js";import"./List-DZ2GVroy.js";import"./Link-BOVfU6gi.js";import"./KandidatHendelseTag-EjcTTuP0.js";import"./ChatExclamationmark-IenPoPHO.js";import"./FileXMark-zzWBa9Eq.js";import"./Trash-Bacxo7n-.js";import"./HandShakeHeart-BjCe4tGN.js";import"./Calendar-B6KviKfM.js";import"./ThumbUp-BZH0LyNq.js";import"./Table-BIxD-IXk.js";import"./util-BYyFu15r.js";import"./parse-B3lIiDIH.js";import"./getDefaultOptions-DGJkWuW5.js";import"./parseISO-DJBs45yK.js";import"./index-CrQSO_VJ.js";import"./index-B40KJ5b4.js";import"./isBefore-BLy3e1RW.js";import"./util-BXWN6ppT.js";import"./Dropdown-DFWfoKEC.js";import"./useControllableState-mI0byIJB.js";import"./Popover-WvUEXDsP.js";import"./floating-ui.react-DeZxRt_-.js";import"./Date.Input-oFcR67dI.js";import"./useFormField-Bz__yru5.js";import"./ChevronDown-DXP1Hd-m.js";import"./Modal.context-BtREQe4S.js";import"./DismissableLayer-CZ0MdCHW.js";import"./useDescendant-DynX6z6M.js";import"./useClientLayoutEffect-Cfimm8us.js";import"./Pencil-Jkk0E3lX.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
