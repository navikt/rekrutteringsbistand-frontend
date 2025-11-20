import{W as s,j as i}from"./iframe-CVGSEgl3.js";import{V as n}from"./VelgInternStatus-CwK7NzCd.js";import{w as d,c as o}from"./ContextDecorators-oXCIaxkF.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-D1Yr4AQL.js";import"./Tag-CnwkgZqI.js";import"./CircleSlash-CuRXhhHx.js";import"./XMarkOctagon-CUB1UoeV.js";import"./Reception-Bei-CsB0.js";import"./SealCheckmark-BbKqX85T.js";import"./PersonChat-OqsJnz7b.js";import"./MagnifyingGlass-CUNPLHOt.js";import"./KandidatlisteContext-DGP14m25.js";import"./OrganisasjonsnummerAlert-By_MGEFT.js";import"./VStack-Dym5gTnm.js";import"./BasePrimitive-qBIaQhXL.js";import"./List-ldPUU4Yb.js";import"./Link-DG13Hunt.js";import"./KandidatHendelseTag-DvxgqWDM.js";import"./ChatExclamationmark-B6I2EWTS.js";import"./FileXMark-Ckhc_Rov.js";import"./Trash-Dy2qWfjh.js";import"./HandShakeHeart-B2bLNKjs.js";import"./Calendar-CKqAy1uR.js";import"./ThumbUp-m3bzFOVG.js";import"./Table-BbJnIJYg.js";import"./dato-DcuCWi-y.js";import"./parse-DHV0IMgP.js";import"./getDefaultOptions-3hA47L1T.js";import"./parseISO-DOUqVw6G.js";import"./index-Dy4IngqS.js";import"./index-B40KJ5b4.js";import"./util-D6FEs9xz.js";import"./Dropdown-BWnfU4WP.js";import"./useControllableState-BUYnv2tY.js";import"./Popover-dYJ49tYF.js";import"./floating-ui.react-DKbBaBlE.js";import"./Date.Input-B3ercdvB.js";import"./useFormField-Cz3FfKKV.js";import"./ChevronDown-BS9qd_7E.js";import"./Modal.context-CBMF66yi.js";import"./DismissableLayer-BI4yZ3io.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-ghVn4P7G.js";import"./Pencil-Bkg82FXp.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
