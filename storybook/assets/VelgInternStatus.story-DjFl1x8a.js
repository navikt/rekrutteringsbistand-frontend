import{N as s,j as i}from"./iframe-CpaCEoJu.js";import{V as n}from"./VelgInternStatus-P4E277Hv.js";import{w as d,c as o}from"./ContextDecorators-tvJqVhRB.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BXQ7VuMD.js";import"./Tag-BqYppfeq.js";import"./CircleSlash-CqqIAjqj.js";import"./XMarkOctagon-CuBrJpT7.js";import"./Reception-BiSWNo-g.js";import"./SealCheckmark-DeM8mYY2.js";import"./PersonChat-C6ryrk0q.js";import"./MagnifyingGlass-CvvQ-yNK.js";import"./KandidatlisteContext-DYslwLvD.js";import"./OrganisasjonsnummerAlert-CBKTM_bV.js";import"./VStack-DZOHDKWr.js";import"./BasePrimitive-B0kOqQyV.js";import"./Box-B7IY5ylq.js";import"./List-Czd-EMJu.js";import"./Link-DQF4F1ji.js";import"./KandidatHendelseTag-kwJ1jV44.js";import"./ChatExclamationmark-D3pUvoye.js";import"./FileXMark-CpKz2oGD.js";import"./Trash-W_8MUcLN.js";import"./HandShakeHeart-DQ_HFcAF.js";import"./Calendar-BLCRivOi.js";import"./ThumbUp-Ckly2uCF.js";import"./ExclamationmarkTriangle-D26JaztB.js";import"./Table-D9t9M2UJ.js";import"./index-Cu9Sbfix.js";import"./index-B40KJ5b4.js";import"./util-D3Hr9p3M.js";import"./Dropdown-CJCPWK5y.js";import"./useControllableState-C5_OEs8z.js";import"./Popover-DvtXZg9t.js";import"./floating-ui.react-hy8tB0AH.js";import"./Modal.context-D_dG1LGR.js";import"./DismissableLayer-YI4klIIr.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Dbupq2RB.js";import"./Pencil-D15pN6uj.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
