import{aP as s,j as i}from"./iframe-qbxWu-tL.js";import{w as d,c as o}from"./ContextDecorators-CW1XdCOs.js";import{V as n}from"./VelgInternStatus-W05PQlEA.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BD3InuPO.js";import"./OrganisasjonsnummerAlert-BWKDpgDo.js";import"./VStack-B7tXZA4Y.js";import"./BasePrimitive-DyceG6iL.js";import"./List-az-G9Gs6.js";import"./Link-CMfq6tzZ.js";import"./KandidatHendelseTag-BPmdHITi.js";import"./Tag-Da1ytOY7.js";import"./FileXMark-CyLkFvxR.js";import"./Trash-DwQmtt3l.js";import"./HandShakeHeart-BEAefxb0.js";import"./Calendar-DZnwDkgC.js";import"./ThumbUp-C8ckDx0E.js";import"./Table-Bpm0fpGA.js";import"./util-DlAq864K.js";import"./format-DZhR8Qj7.js";import"./match-D2AgsI69.js";import"./parseISO-OQUDCsPR.js";import"./parse-hffK4nP2.js";import"./getDefaultOptions-BSPEM21I.js";import"./util-C1rHrxvH.js";import"./InternStatusTag-zqvpPFmD.js";import"./CircleSlash-Bmldl46U.js";import"./XMarkOctagon-Cb_dfDnl.js";import"./Reception-BGAqgSmm.js";import"./SealCheckmark-BpxamKFu.js";import"./PersonChat-DdmXQ8lb.js";import"./MagnifyingGlass-DL77HpDP.js";import"./Dropdown-D1exxwF0.js";import"./useControllableState-BJR-n7iR.js";import"./Popover-BqJarBr1.js";import"./floating-ui.react-DtoBFu6j.js";import"./Date.Input-DXqbNpVA.js";import"./useFormField-Bw2yyyAS.js";import"./ChevronDown-CHhAtIRd.js";import"./Modal.context-DGzify1k.js";import"./DismissableLayer-DSDzd3Gi.js";import"./useDescendant-CAxsx0tC.js";import"./useClientLayoutEffect-DGkSbMMl.js";import"./Pencil-D5LtUe1a.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,_ as default};
