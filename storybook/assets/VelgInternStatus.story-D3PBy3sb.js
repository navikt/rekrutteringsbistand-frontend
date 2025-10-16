import{aK as s,j as i}from"./iframe-ByWmnZ4S.js";import{w as d,c as o}from"./ContextDecorators-BiJDcsY5.js";import{V as n}from"./VelgInternStatus-CM9CDU2x.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CUwd8fGk.js";import"./OrganisasjonsnummerAlert-CIoaQ-va.js";import"./VStack-B4XMgije.js";import"./BasePrimitive-C0gkeO-o.js";import"./List-Bcp7Rviy.js";import"./Link-C0isikOf.js";import"./KandidatHendelseTag-D-PJ3Xds.js";import"./Tag-C7-_VXzn.js";import"./FileXMark-E6OErK0C.js";import"./Trash-C5n-8O5T.js";import"./HandShakeHeart-KCiOrMlu.js";import"./Calendar-BVNdHGpL.js";import"./ThumbUp-CjkUot_o.js";import"./Table-vR1KG8v5.js";import"./util-2p2A_6-L.js";import"./format-CFhjL3vv.js";import"./match-B8PDa1K1.js";import"./parse-BMZ-zCRH.js";import"./getDefaultOptions-C7xXZp1I.js";import"./parseISO-DxVXcsl2.js";import"./util-DCpp2D90.js";import"./InternStatusTag-g_4qbc6l.js";import"./CircleSlash-CqeURTDn.js";import"./XMarkOctagon-DeMf5I7c.js";import"./Reception-CjTah21m.js";import"./SealCheckmark-Cq81r5Kg.js";import"./PersonChat-DFEw07nB.js";import"./MagnifyingGlass-DUIn8hN9.js";import"./Dropdown-DUYsWSWF.js";import"./useControllableState-DHgIwWjk.js";import"./Popover-uVSVMd2P.js";import"./floating-ui.react-BJvj_AEa.js";import"./Date.Input-BeE2dgD5.js";import"./useFormField-PacwHw8j.js";import"./ChevronDown-CVtl9GHt.js";import"./Modal.context-MWwuFtiw.js";import"./DismissableLayer-Bu04zMM1.js";import"./useDescendant-CJI6UQRZ.js";import"./useClientLayoutEffect-D57ofA7I.js";import"./Pencil-DeAQBzbC.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
