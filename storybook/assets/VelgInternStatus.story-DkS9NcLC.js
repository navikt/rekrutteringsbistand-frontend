import{j as s}from"./iframe-snWmX9TD.js";import{w as d,c as o}from"./ContextDecorators-C8P-ZU83.js";import{V as n}from"./VelgInternStatus-CdVZpfFD.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DiIprio7.js";import"./OrganisasjonsnummerAlert-C1KOYz4l.js";import"./VStack-DYQQZgmC.js";import"./BasePrimitive-DjqUARAj.js";import"./List-D4_oDTPd.js";import"./Link-Bs0IdPBn.js";import"./KandidatHendelseTag-CYfLyN-o.js";import"./Tag-BtoNRPee.js";import"./ChatExclamationmark-BCdEIfFA.js";import"./FileXMark-DS_H3S1v.js";import"./Trash-CuOAktuw.js";import"./HandShakeHeart-Bd_lrBE5.js";import"./Calendar-BPQUzo9Z.js";import"./ThumbUp-Nw3u3CnL.js";import"./Table-BEKaglzQ.js";import"./util-CGtdeXch.js";import"./format-QCVIWe3h.js";import"./match-CFAKH4gu.js";import"./parseISO-gkf-uHbp.js";import"./parse-Bn1NgIYy.js";import"./getDefaultOptions-AlGiha7p.js";import"./util-Oftb2yQf.js";import"./InternStatusTag-cfvWCLV-.js";import"./CircleSlash-G7bBHpZ8.js";import"./XMarkOctagon-jT14nA5P.js";import"./Reception-B9MQ9Qyi.js";import"./SealCheckmark-BndIsr6C.js";import"./PersonChat-yuUoKlRN.js";import"./MagnifyingGlass-CpPMqN3J.js";import"./Dropdown-BkQTCGXu.js";import"./useControllableState-DyA8QYIk.js";import"./Popover-Cmg3-bKy.js";import"./floating-ui.react-Dy0YYy8f.js";import"./Date.Input-BCSo7M-T.js";import"./useFormField-DoXpaKLg.js";import"./ChevronDown-DGQah_1I.js";import"./Modal.context-B5wvo_mf.js";import"./DismissableLayer-X36McntI.js";import"./useDescendant-Ba1YdJ3x.js";import"./useClientLayoutEffect-Bu_zjUv9.js";import"./Pencil-Du4UrKmF.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
