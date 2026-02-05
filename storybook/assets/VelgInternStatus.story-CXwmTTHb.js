import{N as s,j as i}from"./iframe-BQn8oluG.js";import{V as n}from"./VelgInternStatus-DY66NDIl.js";import{w as d,c as o}from"./ContextDecorators-BGleOMF3.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BilRqGn9.js";import"./Tag-BzqTsz9d.js";import"./CircleSlash-DYOFeomK.js";import"./XMarkOctagon-BIKv0daO.js";import"./Reception-JvlpGR9q.js";import"./SealCheckmark-Bylguyi9.js";import"./PersonChat-DOmJ_HVO.js";import"./MagnifyingGlass-gMOfUWaV.js";import"./KandidatlisteContext-CyhOc4oz.js";import"./OrganisasjonsnummerAlert-CYywNrcV.js";import"./VStack-CusJYT2i.js";import"./BasePrimitive-3X9LqDm9.js";import"./Box-DVLWXHQE.js";import"./List-CqxD3cjY.js";import"./Link-DWvxLqKl.js";import"./KandidatHendelseTag-B7uUE2XF.js";import"./ChatExclamationmark-DrTYDI0x.js";import"./FileXMark-Bi4WPtJY.js";import"./Trash-DGqxjYj7.js";import"./HandShakeHeart--0XvPa6w.js";import"./Calendar-BYG-Fmtl.js";import"./ThumbUp-IEtKGI8o.js";import"./ExclamationmarkTriangle-Cj19ZXv-.js";import"./Table-Cq7taEiR.js";import"./index-ufCrU90i.js";import"./index-B40KJ5b4.js";import"./util-CRfPFknI.js";import"./Dropdown-CiBARgMC.js";import"./useControllableState-CCj747yy.js";import"./Popover-BAEE-vBK.js";import"./floating-ui.react-DIZNPFob.js";import"./Modal.context-DNTgIFxy.js";import"./DismissableLayer-BdYCKIFL.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BACD_49t.js";import"./Pencil-e2_-rxFO.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,W as default};
