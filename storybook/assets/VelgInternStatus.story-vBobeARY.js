import{Y as i,j as s}from"./iframe-D2Aj6zCc.js";import{w as d,c as o}from"./ContextDecorators-BZzbP-oQ.js";import{V as n}from"./VelgInternStatus-DGNRlRAa.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CVo3Jh_C.js";import"./OrganisasjonsnummerAlert-DtVWcYdv.js";import"./VStack-C0px-8ON.js";import"./BasePrimitive-CZCCzmpl.js";import"./List-C17jiTC3.js";import"./Link-BbRR72Sv.js";import"./KandidatHendelseTag-BOKN8pZD.js";import"./Tag-BU7LP8ol.js";import"./ChatExclamationmark-BzDF83HB.js";import"./FileXMark-D5IziqHB.js";import"./Trash-C9VAgQTp.js";import"./HandShakeHeart-CuGj1GWQ.js";import"./Calendar-BN12mNGQ.js";import"./ThumbUp-4qBtJy8A.js";import"./Table-DP4ODOfN.js";import"./util-B3R4WQ-U.js";import"./format-D5lxIe5p.js";import"./match-kaY1zcGg.js";import"./parse-slG2HzgA.js";import"./getDefaultOptions-PtjhHLpX.js";import"./parseISO-DD7vKl-q.js";import"./index-DKGEBeCX.js";import"./index-B40KJ5b4.js";import"./isBefore-Db0eRYon.js";import"./util-CMYs9b3j.js";import"./InternStatusTag-DSVd3Ami.js";import"./CircleSlash-BA4IDRzm.js";import"./XMarkOctagon-ChfRzb67.js";import"./Reception-CIeusvrJ.js";import"./SealCheckmark-B6b0m0Ii.js";import"./PersonChat-C54QjL9u.js";import"./MagnifyingGlass-DHJ16S10.js";import"./Dropdown-DUKvKnKC.js";import"./useControllableState-Bhz5eiw1.js";import"./Popover-GU00AtRH.js";import"./floating-ui.react-C0SACjvL.js";import"./Date.Input-_LQLW8wr.js";import"./ReadOnlyIcon-P8HRj0bA.js";import"./useFormField-DclvFkpD.js";import"./ChevronDown-DjuBD2or.js";import"./Modal.context-DAf4bnRZ.js";import"./DismissableLayer-CcNaITY2.js";import"./useDescendant-DFZv9C6i.js";import"./useClientLayoutEffect-CijJ4uQ4.js";import"./Pencil-Dz_CDJN7.js";const it={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,it as default};
