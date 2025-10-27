import{Y as s,j as i}from"./iframe-BwFHCbBn.js";import{w as d,c as o}from"./ContextDecorators-DtqRul7U.js";import{V as n}from"./VelgInternStatus-DMmT6qDk.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DYAMuCUL.js";import"./OrganisasjonsnummerAlert-DvyXhF_a.js";import"./VStack-K3QKP0V0.js";import"./BasePrimitive-BNXjGdaB.js";import"./List-CSIholbe.js";import"./Link-Cgb5FHMs.js";import"./KandidatHendelseTag-CnT4mVi1.js";import"./Tag-Z37UogoK.js";import"./ChatExclamationmark-DwZK9o6V.js";import"./FileXMark-Fw6QPVxk.js";import"./Trash-Bxm4p4Gt.js";import"./HandShakeHeart-7YVjBE9Y.js";import"./Calendar-E9fxOvDF.js";import"./ThumbUp-BAjF0-nQ.js";import"./Table-VABNjWEw.js";import"./util-DhPaykA3.js";import"./format-BcSMjo4Z.js";import"./match-D7ZttDwi.js";import"./parse-D5JUYnKE.js";import"./getDefaultOptions-C1srR_wH.js";import"./parseISO-CObrnXOb.js";import"./util-e_WnzYIy.js";import"./InternStatusTag-COx-d9X-.js";import"./CircleSlash-Cd1TWe2b.js";import"./XMarkOctagon-DI6WVmzQ.js";import"./Reception-DAWlbf7Q.js";import"./SealCheckmark-BI8PFbSa.js";import"./PersonChat-BpnlaDYC.js";import"./MagnifyingGlass-pM_wBHxb.js";import"./Dropdown-ChmeTMXO.js";import"./useControllableState-CK1iRQ76.js";import"./Popover-DaqlrvbF.js";import"./floating-ui.react-DSt_G1Mr.js";import"./Date.Input-Dgmyslsn.js";import"./useFormField-BuJKEgmm.js";import"./ChevronDown-_Vl9cyeX.js";import"./Modal.context-BNG1La1A.js";import"./DismissableLayer-DSgU7EkV.js";import"./useDescendant-DkCq7a5W.js";import"./useClientLayoutEffect-CiE3Twg0.js";import"./Pencil-HvtSnQC8.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
