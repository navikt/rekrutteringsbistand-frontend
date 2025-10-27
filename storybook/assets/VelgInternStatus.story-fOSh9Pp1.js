import{Y as s,j as i}from"./iframe-DnzzPsuE.js";import{w as d,c as o}from"./ContextDecorators-lm7k0P2K.js";import{V as n}from"./VelgInternStatus-DrB-h_lz.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BJZyqE9E.js";import"./OrganisasjonsnummerAlert-Bn_kfH1s.js";import"./VStack-BMNk3C3G.js";import"./BasePrimitive-BepNQS7l.js";import"./List-CqR4kegF.js";import"./Link-CaTHICZj.js";import"./KandidatHendelseTag-BuC8pwi5.js";import"./Tag-B1Z2_Is7.js";import"./ChatExclamationmark-CGc0wXvz.js";import"./FileXMark-Cyoi7yos.js";import"./Trash-BjtkO_oP.js";import"./HandShakeHeart-D918vreX.js";import"./Calendar-CrEPD-vT.js";import"./ThumbUp-DHgNpTNm.js";import"./Table-BB16ahds.js";import"./util-m2rlUe0u.js";import"./format-B-zWQ5Zw.js";import"./match-BzWMqxar.js";import"./parse-BJAx9Sy_.js";import"./getDefaultOptions-aRbab0sC.js";import"./parseISO-CknJZkO_.js";import"./util-Y2w3nFye.js";import"./InternStatusTag-DQK_9F8z.js";import"./CircleSlash-5GjorXni.js";import"./XMarkOctagon-B8xJo9-y.js";import"./Reception-D1c0cgWC.js";import"./SealCheckmark-BCWR3Khm.js";import"./PersonChat-DaPIZyMZ.js";import"./MagnifyingGlass-Dpp3i4H6.js";import"./Dropdown-G5vuTBNP.js";import"./useControllableState-CICtFSXA.js";import"./Popover-CeLN1sak.js";import"./floating-ui.react-CKIy3Pr5.js";import"./Date.Input-xl8xuOwe.js";import"./useFormField-Bv-meZHM.js";import"./ChevronDown-CtB-zssB.js";import"./Modal.context-C9jBMjOi.js";import"./DismissableLayer-Ct7SF-gS.js";import"./useDescendant-DSBGNHdu.js";import"./useClientLayoutEffect-DK3nPkze.js";import"./Pencil-CwZlNubu.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
