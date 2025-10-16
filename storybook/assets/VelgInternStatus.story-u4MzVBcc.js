import{aP as s,j as i}from"./iframe-CYGmpbFx.js";import{w as d,c as o}from"./ContextDecorators-BqbMToMu.js";import{V as n}from"./VelgInternStatus-agNpfGBE.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-D625h6bh.js";import"./OrganisasjonsnummerAlert-ApUZM2-e.js";import"./VStack-D1VTWk4O.js";import"./BasePrimitive-CgXjeC8Z.js";import"./List-Cwb2MmIF.js";import"./Link-OSWFCzzX.js";import"./KandidatHendelseTag-DPH4tbvK.js";import"./Tag-DGVfr9rr.js";import"./ChatExclamationmark-Cln-Qvig.js";import"./FileXMark-Q0h4w8uX.js";import"./Trash-Cxpc9wlr.js";import"./HandShakeHeart-BOwI8cHe.js";import"./Calendar-RCVrHvI4.js";import"./ThumbUp-Cim8z76B.js";import"./Table-CqBcmo6t.js";import"./util-gOt3_Pyc.js";import"./format-Dw1SpVLZ.js";import"./match-CivtSffV.js";import"./parseISO-BPtudVCF.js";import"./parse-tmfDgK11.js";import"./getDefaultOptions-DM2GHvKD.js";import"./util-C76tBaN9.js";import"./InternStatusTag-DJ7G-B46.js";import"./CircleSlash-BVdf_xrT.js";import"./XMarkOctagon-Dpeza8c9.js";import"./Reception-D5jfjq6C.js";import"./SealCheckmark-Cp1lGjAO.js";import"./PersonChat-4buNYrl0.js";import"./MagnifyingGlass-O00W9CT7.js";import"./Dropdown-DcZeHd2a.js";import"./useControllableState-D3hxcXud.js";import"./Popover-SxkELETg.js";import"./floating-ui.react-C_Ji5Bix.js";import"./Date.Input-jZmJ-Pyy.js";import"./useFormField-Bvm5uANL.js";import"./ChevronDown-3z86rFGh.js";import"./Modal.context-BnLUGpTN.js";import"./DismissableLayer-HqJggTnx.js";import"./useDescendant-DpPZBL4W.js";import"./useClientLayoutEffect-BsOlTr7j.js";import"./Pencil-1iBmaGGz.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
