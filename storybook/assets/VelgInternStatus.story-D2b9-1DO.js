import{aP as s,j as i}from"./iframe-C8w3jQxa.js";import{w as d,c as o}from"./ContextDecorators-BlzPAe4F.js";import{V as n}from"./VelgInternStatus-D9GWiLfw.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BVYVQHvA.js";import"./OrganisasjonsnummerAlert-Cze3Hgfm.js";import"./VStack-CAbXWkSv.js";import"./BasePrimitive-BROnwPJ2.js";import"./List-0qiMuAjb.js";import"./Link-DjfLdA4d.js";import"./KandidatHendelseTag-B3bAFX8N.js";import"./Tag-C0rwH5pF.js";import"./ChatExclamationmark-aPjr0abY.js";import"./FileXMark-BpLpt36-.js";import"./Trash-BLUhIqIK.js";import"./HandShakeHeart-B_vPzC3T.js";import"./Calendar-DBSoqUNW.js";import"./ThumbUp-B22CcxHd.js";import"./Table-DZ4c3E2u.js";import"./util-D3MbZe3k.js";import"./format-n5F6r33y.js";import"./match-9uiui95j.js";import"./parseISO-DzVh93mM.js";import"./parse-B5EqXZBM.js";import"./getDefaultOptions-CusdfGXI.js";import"./util-vxjLQGim.js";import"./InternStatusTag-CGmzkTNZ.js";import"./CircleSlash-BsXTRzoO.js";import"./XMarkOctagon-B4AoutKx.js";import"./Reception-D39cMSIM.js";import"./SealCheckmark-1bCrLpOh.js";import"./PersonChat-Olnv56nD.js";import"./MagnifyingGlass-CD6o85Vy.js";import"./Dropdown-ChXBgY4q.js";import"./useControllableState-Cc6Yk2cp.js";import"./Popover-B_oNCWIm.js";import"./floating-ui.react-mzmR1DFu.js";import"./Date.Input-DDRk_EfF.js";import"./useFormField-DgNx6Vtv.js";import"./ChevronDown-GRqF1mXI.js";import"./Modal.context-fjbQwAhG.js";import"./DismissableLayer-DdCa3bXh.js";import"./useDescendant-DOxv04li.js";import"./useClientLayoutEffect-CT1VJBZF.js";import"./Pencil-BrGcPlun.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
