import{j as s}from"./iframe-CKFsWzOg.js";import{w as d,c as o}from"./ContextDecorators-i3bAWPVx.js";import{V as n}from"./VelgInternStatus-DkbWXSwe.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-G78JjZX2.js";import"./OrganisasjonsnummerAlert-BRyBBSvV.js";import"./VStack-CKYEjYP9.js";import"./BasePrimitive-BYyecKB7.js";import"./List-BP41UQUP.js";import"./Link-CKoQmdNa.js";import"./KandidatHendelseTag-B6FXP1Dd.js";import"./Tag-DLZT034P.js";import"./FileXMark-BWULVMlW.js";import"./Trash-CusESwjy.js";import"./HandShakeHeart-DMYfZIZi.js";import"./Calendar-BI71gbdC.js";import"./ThumbUp-BaFn2Avv.js";import"./Table-C-HaVMJy.js";import"./util-BhCQq61x.js";import"./format-C7fWF7bo.js";import"./match-_P1yVbyy.js";import"./parseISO-B6fEo_Rt.js";import"./parse-BNYgtDZ7.js";import"./getDefaultOptions-CrgewLMG.js";import"./util-BKoP-Whd.js";import"./InternStatusTag-DlTjeGWV.js";import"./CircleSlash-hury9rpT.js";import"./XMarkOctagon-DasjtaTx.js";import"./Reception-C1jIgFRz.js";import"./SealCheckmark-ZN2mAUp9.js";import"./PersonChat-D0V_4F2X.js";import"./MagnifyingGlass-CJ9hSDY6.js";import"./Dropdown-aLFDKRWq.js";import"./useControllableState-DUu4Zg_I.js";import"./Popover-DOyDc9IZ.js";import"./floating-ui.react--LN1m7xr.js";import"./Date.Input-DOTjZeUY.js";import"./useFormField-BpikIYHf.js";import"./ChevronDown-5n4edY9Q.js";import"./Modal.context-DV2XXzj1.js";import"./DismissableLayer-DV2u_9DA.js";import"./useDescendant-Cjhqtasz.js";import"./useClientLayoutEffect-CLPK0uFg.js";import"./Pencil-DWA0vGKM.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
