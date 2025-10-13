import{j as s}from"./iframe-05oBaVfn.js";import{w as d,c as o}from"./ContextDecorators-CjxeUnpe.js";import{V as n}from"./VelgInternStatus-eq4lW9GF.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BMcoCEUY.js";import"./OrganisasjonsnummerAlert-8qcE1i83.js";import"./VStack-1vjSpxqT.js";import"./BasePrimitive-pNF9eC2e.js";import"./List-BDBXu_9k.js";import"./Link-p2BgAcBD.js";import"./KandidatHendelseTag-B2gam4sj.js";import"./Tag-VBAtqkwm.js";import"./FileXMark-CsKpNh5P.js";import"./Trash-C72NRxO4.js";import"./HandShakeHeart-BirlqDY3.js";import"./Calendar-DwravAwF.js";import"./ThumbUp-D7_fBo-q.js";import"./Table-BKxuDwXI.js";import"./util-B0mFY22O.js";import"./format-C6aU4gM_.js";import"./match-DNHKAvxP.js";import"./parseISO-6O0VV1U3.js";import"./parse-UjKB24uP.js";import"./getDefaultOptions-DyEQjLT5.js";import"./util-B6qVNUUJ.js";import"./InternStatusTag-Rv9vt737.js";import"./CircleSlash-DbkTf7Ta.js";import"./XMarkOctagon-0CLBg15N.js";import"./Reception-Bs41C2Ea.js";import"./SealCheckmark-wbsLKkSs.js";import"./PersonChat-Bit_OS2j.js";import"./MagnifyingGlass-CJRQZuf5.js";import"./Dropdown-D3dPmbqd.js";import"./useControllableState-BP2RiIUM.js";import"./Popover-Ces6U8WJ.js";import"./floating-ui.react-CuoSq-8-.js";import"./Date.Input-13kb3myE.js";import"./useFormField-CLMYpey8.js";import"./ChevronDown-DiOK9z2y.js";import"./Modal.context-BkhHfaBb.js";import"./DismissableLayer-BDOENNDa.js";import"./useDescendant-4VextY-n.js";import"./useClientLayoutEffect-AsqMjhrd.js";import"./Pencil-BOV4gfCh.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
