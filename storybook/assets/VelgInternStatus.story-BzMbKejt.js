import{W as s,j as i}from"./iframe-DxqhZqaS.js";import{V as n}from"./VelgInternStatus-CUknETL4.js";import{w as d,c as o}from"./ContextDecorators-CL3VoatP.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CgbmhTM2.js";import"./Tag-CUmrU5ZG.js";import"./CircleSlash-Cb1xK_mi.js";import"./XMarkOctagon-gF70IUlf.js";import"./Reception-C7OsiQuf.js";import"./SealCheckmark-BIeew9ke.js";import"./PersonChat-ByyXUuOR.js";import"./MagnifyingGlass-COep59_5.js";import"./KandidatlisteContext-CpPdQbLC.js";import"./OrganisasjonsnummerAlert-EjbENWph.js";import"./VStack-cvqccLrx.js";import"./BasePrimitive-DYSm7bwS.js";import"./List-lS0xLvoq.js";import"./Link-CVoPoDzX.js";import"./KandidatHendelseTag-upSNK5Co.js";import"./ChatExclamationmark-Ch7xS30U.js";import"./FileXMark-hf6Mrp2o.js";import"./Trash-zC9MF7CA.js";import"./HandShakeHeart-CXCC8yfE.js";import"./Calendar-CKfqGBwO.js";import"./ThumbUp-vgw0btPN.js";import"./Table-NC_KmpTa.js";import"./dato-L-iJE9U7.js";import"./parse-D9TuSnDx.js";import"./getDefaultOptions-C5a0nyat.js";import"./parseISO-BFHsUEmE.js";import"./index-CqTTEDZl.js";import"./index-B40KJ5b4.js";import"./util-C0A9QH6B.js";import"./Dropdown-BgSW8M1H.js";import"./useControllableState-xYO-yVC9.js";import"./Popover-BMR8J1_7.js";import"./floating-ui.react-DysU3Eee.js";import"./Date.Input-BYJTTWbE.js";import"./useFormField-CyZnCl9A.js";import"./ChevronDown-CYQb3Cst.js";import"./Modal.context-BijZIr-h.js";import"./DismissableLayer-DrAEeoje.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-J_YqUB-h.js";import"./Pencil-C1y_48-7.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
