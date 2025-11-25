import{X as s,j as i}from"./iframe-nRhSYCvZ.js";import{V as n}from"./VelgInternStatus-rGzpwRCz.js";import{w as d,c as o}from"./ContextDecorators-Dax-5sfW.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BdHlt6yv.js";import"./Tag-COzDOVW9.js";import"./CircleSlash-QI0OjKGm.js";import"./XMarkOctagon-1GT5mtVb.js";import"./Reception-B_k1O3i-.js";import"./SealCheckmark-BQiO1ZnM.js";import"./PersonChat-BL62lYmp.js";import"./MagnifyingGlass-_3k5nTUO.js";import"./KandidatlisteContext-uYh8gWUZ.js";import"./OrganisasjonsnummerAlert-DCsl607j.js";import"./VStack-PEvcQc95.js";import"./BasePrimitive-BIZiyU-w.js";import"./List-DBc6WJmZ.js";import"./Link-BZ0LHHL5.js";import"./KandidatHendelseTag-BE_yv2X7.js";import"./ChatExclamationmark-BfStBVOL.js";import"./FileXMark-bdaafn80.js";import"./Trash-BqGjYOzn.js";import"./HandShakeHeart-aR12a-Mn.js";import"./Calendar-BZNwxc2P.js";import"./ThumbUp-D0pwDn3X.js";import"./Table-BdqMt9GS.js";import"./index-DPtEuWSC.js";import"./index-B40KJ5b4.js";import"./util-COFemefV.js";import"./Dropdown-CJq4uOqm.js";import"./useControllableState-C3_wTSJE.js";import"./Popover-Ct63q9cp.js";import"./floating-ui.react-nolZAvpl.js";import"./Date.Input-CVqKzlSL.js";import"./useFormField-Cwe4eWS0.js";import"./ChevronDown-BF2Hm28B.js";import"./Modal.context-BDOVP4V9.js";import"./DismissableLayer-Bb1GHrD4.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C47GNyJy.js";import"./Pencil-C7q9YCFD.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
