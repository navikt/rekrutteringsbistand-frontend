import{Y as s,j as i}from"./iframe-DGJZfRLj.js";import{w as d,c as o}from"./ContextDecorators-DXrom0v-.js";import{V as n}from"./VelgInternStatus-amoVonyo.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-QeYeky1X.js";import"./OrganisasjonsnummerAlert-CT28ABKE.js";import"./VStack--kEYkFg6.js";import"./BasePrimitive-Cf43sxsL.js";import"./List-1YVdWu8v.js";import"./Link-DVpjbSpT.js";import"./KandidatHendelseTag-D37_OMzx.js";import"./Tag-CtkeTXXx.js";import"./ChatExclamationmark-Dq2jWQU4.js";import"./FileXMark-wIy8EfzN.js";import"./Trash-U-agCtJj.js";import"./HandShakeHeart-IbTz3SXE.js";import"./Calendar-CQjYGR9z.js";import"./ThumbUp-D2ZhMt21.js";import"./Table-w6_jwB_N.js";import"./util-l964Anfk.js";import"./format-DIeaPe2D.js";import"./match-BV0xT-Zd.js";import"./parse-CicZeTJW.js";import"./getDefaultOptions-CDcTPqZg.js";import"./parseISO-CJfUdAZG.js";import"./util-RQAia1fF.js";import"./InternStatusTag-BBUatspT.js";import"./CircleSlash-BPwuy2Hm.js";import"./XMarkOctagon-CbiSZXCV.js";import"./Reception-BpJdaehj.js";import"./SealCheckmark-DbrJ-9Jo.js";import"./PersonChat-D39OB83z.js";import"./MagnifyingGlass-BGo-wKBB.js";import"./Dropdown-CAyxVx_M.js";import"./useControllableState-V_CYkDBC.js";import"./Popover-C-abeZeb.js";import"./floating-ui.react-BBlmzmSN.js";import"./Date.Input-BtSzc9Ln.js";import"./useFormField-lXpThh9F.js";import"./ChevronDown-qHXczOAY.js";import"./Modal.context-DMB1oKZj.js";import"./DismissableLayer-BBi3BOGD.js";import"./useDescendant-D-o2dfrc.js";import"./useClientLayoutEffect-D8AEg2Kf.js";import"./Pencil-qaBKci6s.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
