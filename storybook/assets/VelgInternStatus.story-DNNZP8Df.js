import{P as s,j as i}from"./iframe-gH94vgHb.js";import{V as n}from"./VelgInternStatus-DyUjFF37.js";import{w as d,c as o}from"./ContextDecorators-D_K9I8aX.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CLfAo1hh.js";import"./Tag-CDQnKGRM.js";import"./CircleSlash-BZR0MXKh.js";import"./XMarkOctagon-zX6XoXaG.js";import"./Reception-BSwfOmtI.js";import"./SealCheckmark-DGA5_T8O.js";import"./PersonChat-DjwNDuvB.js";import"./MagnifyingGlass-UziZUAJY.js";import"./KandidatlisteContext-D8KLeJ3I.js";import"./OrganisasjonsnummerAlert-MH_cCrA5.js";import"./VStack-C_0uRaza.js";import"./BasePrimitive-Dtl2AadN.js";import"./List-BtqrrQcv.js";import"./Link-p2HB9IqL.js";import"./KandidatHendelseTag-BCqxey7V.js";import"./ChatExclamationmark-DGwLxcg6.js";import"./FileXMark-Ci6usYat.js";import"./Trash-qgo9htqB.js";import"./HandShakeHeart-D3Rlz-cl.js";import"./Calendar-Bnmy4T63.js";import"./ThumbUp-BTvWXjct.js";import"./Table-BG9kKsFy.js";import"./util-B7KpV28B.js";import"./parse-CdFgNFjr.js";import"./getDefaultOptions-CGpM4vju.js";import"./parseISO-Mr5NIIp7.js";import"./index-CDjreHOH.js";import"./index-B40KJ5b4.js";import"./isBefore-FTsTdB_z.js";import"./util-gQjNrG7y.js";import"./Dropdown-Do3LSRvt.js";import"./useControllableState-Cinq0aNa.js";import"./Popover-CRxbOxYd.js";import"./floating-ui.react-lzNEJOuU.js";import"./Date.Input-B_gIJoTa.js";import"./useFormField-D561gDES.js";import"./ChevronDown-7VBKiPJA.js";import"./Modal.context-DTyg-fOh.js";import"./DismissableLayer-0An5LHn5.js";import"./useDescendant-Bw-HNl2x.js";import"./useClientLayoutEffect-D_LjXigV.js";import"./Pencil-D82o1gow.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,at as default};
