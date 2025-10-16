import{aP as s,j as i}from"./iframe-CcX8-4GA.js";import{w as d,c as o}from"./ContextDecorators-C_BPIZyP.js";import{V as n}from"./VelgInternStatus-CDSCV7WY.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-2pjLwa4b.js";import"./OrganisasjonsnummerAlert-rbWDvMcL.js";import"./VStack-gF6g1u0a.js";import"./BasePrimitive-BUKns9Ma.js";import"./List-knAYMItp.js";import"./Link-RXPHszoE.js";import"./KandidatHendelseTag-Js6vMPxN.js";import"./Tag-jMajnUf2.js";import"./FileXMark-CFDEXvnD.js";import"./Trash-hb8-bWan.js";import"./HandShakeHeart-DQO3PzO_.js";import"./Calendar-DJqHZqeu.js";import"./ThumbUp-B39Bam7E.js";import"./Table-DoSv98b9.js";import"./util-BnKCOiCX.js";import"./format-DxFJCfdi.js";import"./match-BSotj6vx.js";import"./parseISO-Ciw9O8eu.js";import"./parse-h2sVsWqr.js";import"./getDefaultOptions-CYTM-JIK.js";import"./util-BVOBI2nQ.js";import"./InternStatusTag-d_vbmQ4N.js";import"./CircleSlash-Bjoa2vPr.js";import"./XMarkOctagon-W2yzLSor.js";import"./Reception-CITyy6G9.js";import"./SealCheckmark-Da3opCxn.js";import"./PersonChat-ynR8cBDA.js";import"./MagnifyingGlass-WTmmR9LO.js";import"./Dropdown-WC592Dsv.js";import"./useControllableState-CC5b_oP9.js";import"./Popover-LHdWqhDJ.js";import"./floating-ui.react-CoAGIUUn.js";import"./Date.Input-DlRggdUa.js";import"./useFormField-B0V7Rwez.js";import"./ChevronDown-BhCG83Hq.js";import"./Modal.context-CQY3-GGu.js";import"./DismissableLayer-DGfODv6M.js";import"./useDescendant-B5pFWjou.js";import"./useClientLayoutEffect-6_RpH1W8.js";import"./Pencil-DnlIFpyT.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
