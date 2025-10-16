import{aL as s,j as i}from"./iframe-CZslivju.js";import{w as d,c as o}from"./ContextDecorators-7QCaWgPx.js";import{V as n}from"./VelgInternStatus-DCiHSKSi.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BgD67gQc.js";import"./OrganisasjonsnummerAlert-CD_DayHm.js";import"./VStack-DUBo_edV.js";import"./BasePrimitive-DUfdo9kL.js";import"./List-D7ixjuyg.js";import"./Link-D8FWDtoI.js";import"./KandidatHendelseTag-BySAcDuD.js";import"./Tag-Dfqld2iL.js";import"./FileXMark-XX9tD0kF.js";import"./Trash-MyCCBKoW.js";import"./HandShakeHeart-CiRqeagj.js";import"./Calendar-DiwF2yQv.js";import"./ThumbUp-DGjIwcjH.js";import"./Table-Jk6u2ME4.js";import"./util-IQ18lRMy.js";import"./format-DMpFMWtq.js";import"./match-BT5f6T_9.js";import"./parse-Ct7n3oJ2.js";import"./getDefaultOptions-CtUMiAib.js";import"./parseISO-B7rV6_4O.js";import"./util-axHo5kBG.js";import"./InternStatusTag-BkNvtEEm.js";import"./CircleSlash-CqCfX0M9.js";import"./XMarkOctagon-BwcF8hHh.js";import"./Reception-C15qxXYr.js";import"./SealCheckmark-B6AmHjQy.js";import"./PersonChat-BzZWE2EF.js";import"./MagnifyingGlass-3HAlM224.js";import"./Dropdown-CVP5XFsy.js";import"./useControllableState-jtcIfYop.js";import"./Popover-EMpG-Rbl.js";import"./floating-ui.react-DbYvyV8k.js";import"./Date.Input-B88OqUWr.js";import"./useFormField-DlnxwSY_.js";import"./ChevronDown-DG95zFN3.js";import"./Modal.context-BtgAVPDG.js";import"./DismissableLayer-DJKCG9h_.js";import"./useDescendant-DPxUZxmL.js";import"./useClientLayoutEffect-BvAbSuti.js";import"./Pencil-ByHsKdKJ.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,_ as default};
