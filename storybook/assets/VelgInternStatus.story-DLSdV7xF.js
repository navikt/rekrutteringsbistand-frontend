import{j as s}from"./iframe-BELOvKNN.js";import{w as d,c as o}from"./ContextDecorators-_PNUPAX7.js";import{V as n}from"./VelgInternStatus-Dbk51uC7.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CQM5FkxO.js";import"./OrganisasjonsnummerAlert-CSlWyPvV.js";import"./VStack-CVCIdyhk.js";import"./BasePrimitive-Mqp222lP.js";import"./List-DUbmPHIm.js";import"./Link-DnuL8IwU.js";import"./KandidatHendelseTag-Dye6zfEL.js";import"./Tag-Btm7kXcV.js";import"./FileXMark-6ZpgUhl2.js";import"./Trash-B9oLGwbt.js";import"./HandShakeHeart-Dp5wQ6aL.js";import"./Calendar-B9V_T85Q.js";import"./ThumbUp-yGDvx2kA.js";import"./Table-BgrymczM.js";import"./util-Dgy1Kk-2.js";import"./format-C8FmGALw.js";import"./match-D9qvYXIp.js";import"./parseISO-CZlVIeHX.js";import"./parse-CP0tnOZc.js";import"./getDefaultOptions-BpSXGg0b.js";import"./util-qK8gJWGj.js";import"./InternStatusTag-B4FVdrOU.js";import"./CircleSlash-C21GTH2U.js";import"./XMarkOctagon-CgvhT2R-.js";import"./Reception-CIz7vbaw.js";import"./SealCheckmark-CTDT8qn-.js";import"./PersonChat-BwiZY6Dm.js";import"./MagnifyingGlass-BEsPoKai.js";import"./Dropdown-Du2FF_-l.js";import"./useControllableState-CZJeXb2k.js";import"./Popover-U8M3MgIa.js";import"./floating-ui.react-m4wJbw6e.js";import"./Date.Input-3AqE9uYt.js";import"./useFormField-BaU1MW5p.js";import"./ChevronDown-CNBy5aG3.js";import"./Modal.context-DWOAM3YB.js";import"./DismissableLayer-BxOt-ZBD.js";import"./useDescendant-7y0uEY9z.js";import"./useClientLayoutEffect-CmE_1-f7.js";import"./Pencil-BeililbL.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
