import{aL as s,j as i}from"./iframe-Dztpy7FG.js";import{w as d,c as o}from"./ContextDecorators-AH49Hb38.js";import{V as n}from"./VelgInternStatus-C2_f6S4X.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CIQvoNAt.js";import"./OrganisasjonsnummerAlert-B5xMY7sy.js";import"./VStack-HNw6XBKh.js";import"./BasePrimitive-_IOgqcZV.js";import"./List-C7JKrr3p.js";import"./Link-eQW3hoy3.js";import"./KandidatHendelseTag-DocFfSvE.js";import"./Tag-CXuRSAQ-.js";import"./FileXMark-jygYJjCP.js";import"./Trash-DATitZQq.js";import"./HandShakeHeart-B6A8Mj0o.js";import"./Calendar-B350-cZ5.js";import"./ThumbUp-C9MoaVk0.js";import"./Table-CsiZs3Xs.js";import"./util-BZe5o9jQ.js";import"./format-mY-HadcG.js";import"./match-BCVUXymx.js";import"./parse-DMRhBhLM.js";import"./getDefaultOptions-ENb9g62e.js";import"./parseISO-DoJZVqXh.js";import"./util-DfjJrChK.js";import"./InternStatusTag-DR3wU9N5.js";import"./CircleSlash-CQg2jHdr.js";import"./XMarkOctagon-5gaC9DA-.js";import"./Reception-DRyf7nZE.js";import"./SealCheckmark-CzsA6RAw.js";import"./PersonChat-DeQyWVOf.js";import"./MagnifyingGlass-LC1bOhgs.js";import"./Dropdown-B6S4em6R.js";import"./useControllableState-CeZ8CCVf.js";import"./Popover-BTXo8eom.js";import"./floating-ui.react-CvX8JUjW.js";import"./Date.Input-DH1XvPbb.js";import"./useFormField-avTKDxfH.js";import"./ChevronDown-frGHGn0T.js";import"./Modal.context-Dr-JJuFN.js";import"./DismissableLayer-q0hF5vdd.js";import"./useDescendant-C9fzL1_w.js";import"./useClientLayoutEffect-SlhgU7E8.js";import"./Pencil-DkLhSrLU.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
