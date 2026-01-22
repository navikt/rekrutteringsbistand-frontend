import{N as s,j as i}from"./iframe-_Y_FQOIK.js";import{V as n}from"./VelgInternStatus-CJhuXtNQ.js";import{w as d,c as o}from"./ContextDecorators-CyTJGvbv.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-daPp3v9u.js";import"./Tag-Du44VU8x.js";import"./CircleSlash-D9Zs80O9.js";import"./XMarkOctagon-TBC8VxBU.js";import"./Reception-C5qDXXXk.js";import"./SealCheckmark-BsYyae-N.js";import"./PersonChat-Kp1e4TVX.js";import"./MagnifyingGlass-B4WLUhaR.js";import"./KandidatlisteContext--pywmHYz.js";import"./OrganisasjonsnummerAlert-NhjOxu42.js";import"./VStack-BV-kTNrI.js";import"./BasePrimitive-CgAYLi8z.js";import"./Box-s_VFObiR.js";import"./List-COiFA3Ep.js";import"./Link-BbIgnuLN.js";import"./KandidatHendelseTag-Bf_DYnTB.js";import"./ChatExclamationmark-BurAkCe3.js";import"./FileXMark-BHxYWS4a.js";import"./Trash-DP-Yxt5I.js";import"./HandShakeHeart-D8fZXbUs.js";import"./Calendar-E4u3W48J.js";import"./ThumbUp-NH__amz1.js";import"./ExclamationmarkTriangle-CrL1M-JZ.js";import"./Table-Dd3Fr_8y.js";import"./index-QQgzqSqo.js";import"./index-B40KJ5b4.js";import"./util-D2yyjroG.js";import"./Dropdown-Dkw3ipAX.js";import"./useControllableState-D-6TawYQ.js";import"./Popover-B4Z8-RGV.js";import"./floating-ui.react-BcjM_8Wz.js";import"./Modal.context-C_2IzOEE.js";import"./DismissableLayer-B1s_qZ9h.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-tdwdHZzr.js";import"./Pencil-IZ1c5UoK.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
