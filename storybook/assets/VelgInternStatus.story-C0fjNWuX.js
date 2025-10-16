import{aP as s,j as i}from"./iframe-BHAALu18.js";import{w as d,c as o}from"./ContextDecorators-wFKfjQxz.js";import{V as n}from"./VelgInternStatus-BI3zFo_9.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BfN5An09.js";import"./OrganisasjonsnummerAlert-BHvMlvj7.js";import"./VStack-Cq88-JDT.js";import"./BasePrimitive-DTksipQc.js";import"./List-BaN9HM07.js";import"./Link-H1I1_-EK.js";import"./KandidatHendelseTag-B4LO3XvZ.js";import"./Tag-CjIXk9UC.js";import"./FileXMark-CMmv0rBH.js";import"./Trash-TgRDHxl5.js";import"./HandShakeHeart-RWCGHmFB.js";import"./Calendar-Dxp2Sh-4.js";import"./ThumbUp-Bhk68IRC.js";import"./Table-nIodCrv-.js";import"./util-CtYvtQR3.js";import"./format-CcnEZL49.js";import"./match-UbcUMXBF.js";import"./parseISO-DhIi_C9M.js";import"./parse-Qbbomewj.js";import"./getDefaultOptions-CJC3hBp3.js";import"./util-BwpY6r-m.js";import"./InternStatusTag-CHCOYhkz.js";import"./CircleSlash-BPcvjFsP.js";import"./XMarkOctagon-BA6KlPtH.js";import"./Reception-CpfCfo36.js";import"./SealCheckmark-DDH4LT96.js";import"./PersonChat-CXg5zhHj.js";import"./MagnifyingGlass-Czi5KTS9.js";import"./Dropdown-U6XdHOy_.js";import"./useControllableState-DvMFbOQQ.js";import"./Popover-BcFsNt94.js";import"./floating-ui.react-BlUAEfg5.js";import"./Date.Input-BS8RN3Cy.js";import"./useFormField-D8u6Al33.js";import"./ChevronDown-6zNJcWbQ.js";import"./Modal.context-CPyqR72d.js";import"./DismissableLayer-be7a08mI.js";import"./useDescendant-DXO6KeRV.js";import"./useClientLayoutEffect-DEuAlZZ5.js";import"./Pencil-DjYoCGAn.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
