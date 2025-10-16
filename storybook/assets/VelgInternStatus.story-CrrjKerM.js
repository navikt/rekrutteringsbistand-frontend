import{aK as s,j as i}from"./iframe-BXziY_Zi.js";import{w as d,c as o}from"./ContextDecorators-BLbx3v14.js";import{V as n}from"./VelgInternStatus-CaCXugca.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CyAXKXv4.js";import"./OrganisasjonsnummerAlert-JCFq03jU.js";import"./VStack-BfV9VSAn.js";import"./BasePrimitive-Ov_Zozgq.js";import"./List-_K5Vmu90.js";import"./Link-4XsaCY8h.js";import"./KandidatHendelseTag-CrFMkKI_.js";import"./Tag-27IIFXKU.js";import"./FileXMark-C4GrZGwO.js";import"./Trash-DAtihogT.js";import"./HandShakeHeart-zB5wL4zo.js";import"./Calendar-D53PpRMk.js";import"./ThumbUp-B6tdJAUa.js";import"./Table-BAh0mp6c.js";import"./util-BjIecu4N.js";import"./format-B1cmwU2D.js";import"./match-C_z_8etj.js";import"./parse-DkXjFss9.js";import"./getDefaultOptions-O6SvB0vf.js";import"./parseISO-Chp8ZZ_L.js";import"./util-DEIDtFt4.js";import"./InternStatusTag-CUEBjl7M.js";import"./CircleSlash-DPW9S22V.js";import"./XMarkOctagon-D8OEfxPD.js";import"./Reception-Asp1b22G.js";import"./SealCheckmark-D8aF4XAw.js";import"./PersonChat-XnoN1tOq.js";import"./MagnifyingGlass-CSs6epfP.js";import"./Dropdown-CX2dE34X.js";import"./useControllableState-D5oGLZjf.js";import"./Popover-Wa2uc_Z1.js";import"./floating-ui.react-DmgCcC2w.js";import"./Date.Input-hiWrJIWD.js";import"./useFormField-D4xFFkD-.js";import"./ChevronDown-CicwSVMz.js";import"./Modal.context-DkZACfZM.js";import"./DismissableLayer-Esa6WiPg.js";import"./useDescendant-Dn1MdCUk.js";import"./useClientLayoutEffect-C8YEyyK8.js";import"./Pencil-CVsIwGNk.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
