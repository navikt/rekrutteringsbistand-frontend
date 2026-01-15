import{O as s,j as i}from"./iframe-CIDC3Z6q.js";import{V as n}from"./VelgInternStatus-BtCu23v6.js";import{w as d,c as o}from"./ContextDecorators-BCci1QKh.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CfQUEH3R.js";import"./Tag-bdB-v9K4.js";import"./CircleSlash-CdyY8-bi.js";import"./XMarkOctagon-CqpHlpCV.js";import"./Reception-B7IOjv49.js";import"./SealCheckmark-B8NaMx7M.js";import"./PersonChat-DWalmx70.js";import"./MagnifyingGlass-Bx7NfGA6.js";import"./KandidatlisteContext-watgMLoN.js";import"./OrganisasjonsnummerAlert-BaynNlkq.js";import"./VStack-B9vhOXzh.js";import"./BasePrimitive-BenqU5Ny.js";import"./List-DrNKfggA.js";import"./Link-CGl9Recr.js";import"./KandidatHendelseTag-DKzSSGOG.js";import"./ChatExclamationmark-B8sPg0st.js";import"./FileXMark-Cx41xJB4.js";import"./Trash-BIJDRe3Q.js";import"./HandShakeHeart-D8LWJ5fd.js";import"./Calendar-U8EZjtNx.js";import"./ThumbUp-DD_qpRFb.js";import"./ExclamationmarkTriangle-DGtk2zqK.js";import"./Table-BsDh2VfC.js";import"./index-B71oAnfL.js";import"./index-B40KJ5b4.js";import"./util-CPo_B2nz.js";import"./Dropdown-B2dEp5T9.js";import"./useControllableState-zwJkXhKO.js";import"./Popover-F30jyWkN.js";import"./floating-ui.react-Bn_hf3YY.js";import"./Date.Input-C_TK-f3Y.js";import"./useFormField-TVXsso69.js";import"./ChevronDown-BdFEv6NO.js";import"./Modal.context-BU5Stcmk.js";import"./DismissableLayer-BMWwLBet.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DVrPlUWd.js";import"./Pencil-DPUfBzm6.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,Y as default};
