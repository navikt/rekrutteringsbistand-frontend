import{aP as s,j as i}from"./iframe-BltkUtmC.js";import{w as d,c as o}from"./ContextDecorators-DX3xittK.js";import{V as n}from"./VelgInternStatus-gkoX5CzJ.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Ce-zi_zz.js";import"./OrganisasjonsnummerAlert-DDL7fw1q.js";import"./VStack-B9bjwo3B.js";import"./BasePrimitive-DAjONjQL.js";import"./List-CUxXFdQr.js";import"./Link-CgUQg2re.js";import"./KandidatHendelseTag-BLtnp3G2.js";import"./Tag-BEtLAmBu.js";import"./FileXMark-BmobqouE.js";import"./Trash-a4Yvwzwz.js";import"./HandShakeHeart-CHnXOj98.js";import"./Calendar-Cc086Lfd.js";import"./ThumbUp-DQ8y91R2.js";import"./Table-C0yHzIsv.js";import"./util-CZhmV-S2.js";import"./format-ybDTxhh7.js";import"./match-BLrIinR6.js";import"./parseISO-C3vqRaHz.js";import"./parse-f1XXS1lv.js";import"./getDefaultOptions-CSasNev0.js";import"./util-CLZpmQTt.js";import"./InternStatusTag-CHr2uB_j.js";import"./CircleSlash-BOtCJj1F.js";import"./XMarkOctagon-X1Ao2bcx.js";import"./Reception-J5mtZBHk.js";import"./SealCheckmark-BcvMB5ba.js";import"./PersonChat-BUE9l3ll.js";import"./MagnifyingGlass-DHv_CGRp.js";import"./Dropdown-D1FNTJoX.js";import"./useControllableState-B-0TJHvp.js";import"./Popover-BsIrsC6s.js";import"./floating-ui.react-DxCSJHHz.js";import"./Date.Input-DJyfvOgD.js";import"./useFormField-DPiTQzna.js";import"./ChevronDown-Co0F-4GE.js";import"./Modal.context-7dX16PMC.js";import"./DismissableLayer-DvTyJPL-.js";import"./useDescendant-BCNbsdQP.js";import"./useClientLayoutEffect-lwX3CJFu.js";import"./Pencil-D4lLOZx-.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
