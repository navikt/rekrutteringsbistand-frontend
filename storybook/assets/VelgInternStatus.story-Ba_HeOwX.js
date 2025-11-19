import{V as s,j as i}from"./iframe-cNvDYj7l.js";import{V as n}from"./VelgInternStatus-AnXireML.js";import{w as d,c as o}from"./ContextDecorators-BHTx0zcp.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-YrC48Kum.js";import"./Tag-03263A3p.js";import"./CircleSlash-_GKToOuJ.js";import"./XMarkOctagon-DYgSB5v4.js";import"./Reception-E3CmP0nK.js";import"./SealCheckmark-5MD8z623.js";import"./PersonChat-Ci0H9oko.js";import"./MagnifyingGlass-H9uGaRNc.js";import"./KandidatlisteContext-BAmXRz36.js";import"./OrganisasjonsnummerAlert-CpiVSjWb.js";import"./VStack-JibsGnmS.js";import"./BasePrimitive-DqmNEQu9.js";import"./List-DK1xahuz.js";import"./Link-AVBwjNvc.js";import"./KandidatHendelseTag-fFhFrEHY.js";import"./ChatExclamationmark-Ca2PnbLB.js";import"./FileXMark-BZXi7hvX.js";import"./Trash-B01mwerR.js";import"./HandShakeHeart-C9POw-OF.js";import"./Calendar-CznEWYh4.js";import"./ThumbUp-BP06I1RD.js";import"./Table-C2dyBnAB.js";import"./util-BO8dQ6Pu.js";import"./parse-CHnOHq9q.js";import"./getDefaultOptions-DaEqWaoo.js";import"./parseISO-D1PtcTHl.js";import"./index-jQi9f5my.js";import"./index-B40KJ5b4.js";import"./isBefore-LeIH_LgQ.js";import"./util-DTlxcMph.js";import"./Dropdown-CiArzclw.js";import"./useControllableState-Daldu6V6.js";import"./Popover-D1j8a3M5.js";import"./floating-ui.react-BjwHDxaJ.js";import"./Date.Input-DtOJxiwF.js";import"./useFormField-Bz9GijUD.js";import"./ChevronDown-Dm9kwURF.js";import"./Modal.context-C7s7PBJK.js";import"./DismissableLayer-BGf_Rf18.js";import"./useDescendant-0IKEmXuu.js";import"./useClientLayoutEffect-CsayHDtQ.js";import"./Pencil-C5Qdh3WE.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
