import{X as s,j as i}from"./iframe-dDyLELCN.js";import{V as n}from"./VelgInternStatus-BYy8CS9e.js";import{w as d,c as o}from"./ContextDecorators-ClfIIYPG.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BlXx_usj.js";import"./Tag-5nFgEjDD.js";import"./CircleSlash-CeSptrV0.js";import"./XMarkOctagon-DgENHJKh.js";import"./Reception-ST4nL9dy.js";import"./SealCheckmark-CN4i4hja.js";import"./PersonChat-DVy9MOkL.js";import"./MagnifyingGlass-BVgdWgX4.js";import"./KandidatlisteContext-29_U6Mp7.js";import"./OrganisasjonsnummerAlert-DkZcrKX0.js";import"./VStack-jPI2_5MN.js";import"./BasePrimitive-B9_PGHxz.js";import"./List-DX2Nsu8R.js";import"./Link-BHHifg93.js";import"./KandidatHendelseTag-KOWE9ntz.js";import"./ChatExclamationmark-clHFKuI8.js";import"./FileXMark-BPctVBRQ.js";import"./Trash-VOyAOEn3.js";import"./HandShakeHeart-r3C8OKTj.js";import"./Calendar-BsgMjBiK.js";import"./ThumbUp-CkfxuxUI.js";import"./ExclamationmarkTriangle-DeVuXY-G.js";import"./Table-mRucO3Hx.js";import"./index-BfWeFRSW.js";import"./index-B40KJ5b4.js";import"./util-CBgO15wo.js";import"./Dropdown-DPeDjurL.js";import"./useControllableState-DB-5zWXL.js";import"./Popover-D7lwJy2p.js";import"./floating-ui.react-C9yisIqS.js";import"./Date.Input-BNgyAyBN.js";import"./useFormField-BguGJLCY.js";import"./ChevronDown-COKw2Fvl.js";import"./Modal.context-CyJwV-9C.js";import"./DismissableLayer-C-7oYFSu.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-_reS0PqZ.js";import"./Pencil-uNLTvCBs.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
