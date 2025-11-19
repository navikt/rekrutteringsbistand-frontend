import{W as s,j as i}from"./iframe-CRS9-BOb.js";import{V as n}from"./VelgInternStatus-DtNpq37V.js";import{w as d,c as o}from"./ContextDecorators-DwQy2Jy1.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BAZaUTk6.js";import"./Tag-B2ouINeh.js";import"./CircleSlash-Bc3k7dky.js";import"./XMarkOctagon-BsJNlY0_.js";import"./Reception-BzzG0Vpq.js";import"./SealCheckmark-Bm2gM18G.js";import"./PersonChat-BGbdP9fQ.js";import"./MagnifyingGlass-ndr2ALu7.js";import"./KandidatlisteContext-D4h0_DKz.js";import"./OrganisasjonsnummerAlert-Bd5Ejc0y.js";import"./VStack-BQQ0dKEz.js";import"./BasePrimitive-CY8eNV0L.js";import"./List-ihX-omU2.js";import"./Link-BTd5oh5y.js";import"./KandidatHendelseTag-Rh3zxDTn.js";import"./ChatExclamationmark-Dml3K2Fe.js";import"./FileXMark-BOLQeMt1.js";import"./Trash-1RhOzARE.js";import"./HandShakeHeart-Do0phbpB.js";import"./Calendar-pLAFrJG6.js";import"./ThumbUp-D44t2_t2.js";import"./Table-DUGu0A95.js";import"./dato-BFDiICoh.js";import"./parse-BtgZcLmZ.js";import"./getDefaultOptions-BkkzbRik.js";import"./parseISO-CHQBiHwP.js";import"./index-D8LHKCF-.js";import"./index-B40KJ5b4.js";import"./util-B_iAsHCp.js";import"./Dropdown-BNwn8HEw.js";import"./useControllableState-CwJC9U2H.js";import"./Popover-lS-5hZGv.js";import"./floating-ui.react-CCOU2mDb.js";import"./Date.Input-Cyj1nMxI.js";import"./useFormField--7ahSM5x.js";import"./ChevronDown-1rzHA3pA.js";import"./Modal.context-CAhttf3V.js";import"./DismissableLayer-jHTTirOe.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DUMsSXDZ.js";import"./Pencil-ChUWkpC_.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
