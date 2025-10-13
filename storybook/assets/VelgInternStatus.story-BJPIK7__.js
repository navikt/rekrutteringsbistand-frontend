import{j as s}from"./iframe-Cv24_U16.js";import{w as d,c as o}from"./ContextDecorators-n9_SutWP.js";import{V as n}from"./VelgInternStatus-B4oE3Tlb.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DNPILVYg.js";import"./OrganisasjonsnummerAlert-D9c208iI.js";import"./VStack-DS8m9eVs.js";import"./BasePrimitive-CfTbFVIU.js";import"./List-DXeT02NF.js";import"./Link-SHX1LCJj.js";import"./KandidatHendelseTag-4mzZxhEG.js";import"./Tag-BlIKe27p.js";import"./FileXMark-B1AmAfvd.js";import"./Trash-Cezw4R__.js";import"./HandShakeHeart-CpE1vd-9.js";import"./Calendar-D4GcZ2Mf.js";import"./ThumbUp-DF-pfAoM.js";import"./Table-O3pxLPDB.js";import"./util-BlYsK2hr.js";import"./format-CI4X65bH.js";import"./match-BFZphgSS.js";import"./parseISO-Y9qxuxTD.js";import"./parse-vgk349gn.js";import"./getDefaultOptions-hH8TCf17.js";import"./util-Cq_qb_RM.js";import"./InternStatusTag-DQGDypTv.js";import"./CircleSlash-C3vgyI0z.js";import"./XMarkOctagon-LCu4wFwS.js";import"./Reception-DrqSdq9F.js";import"./SealCheckmark-bRVLoUc-.js";import"./PersonChat-CL27jsHE.js";import"./MagnifyingGlass-D81_YMoq.js";import"./Dropdown-DwIb6q1G.js";import"./useControllableState-BhHy0Jxs.js";import"./Popover-Dxx1LUvG.js";import"./floating-ui.react-CJEy1_Ma.js";import"./Date.Input-C08KLdep.js";import"./useFormField-D0tid84_.js";import"./ChevronDown-Dwt-O8DS.js";import"./Modal.context-9K0claTk.js";import"./DismissableLayer-D5_pfIza.js";import"./useDescendant-hu1XmWEn.js";import"./useClientLayoutEffect-DgFTS3-c.js";import"./Pencil-nipWX_v0.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
