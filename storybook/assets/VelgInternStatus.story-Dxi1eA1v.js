import{aP as s,j as i}from"./iframe-DSaqXt6k.js";import{w as d,c as o}from"./ContextDecorators-CwgbIuhn.js";import{V as n}from"./VelgInternStatus-DB_NoSx1.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BOTRWqso.js";import"./OrganisasjonsnummerAlert-CGU6iCGJ.js";import"./VStack-BBGaAluN.js";import"./BasePrimitive-DScZ7IXW.js";import"./List-Kxgz1abr.js";import"./Link-BQw0wl5g.js";import"./KandidatHendelseTag-qSfigkV2.js";import"./Tag-DvfXdsyj.js";import"./FileXMark-emfGFE_I.js";import"./Trash-CvDx4G0h.js";import"./HandShakeHeart-P93Kh6Xn.js";import"./Calendar-CGNbwBba.js";import"./ThumbUp-qmo1UuoF.js";import"./Table-BG52D2qp.js";import"./util-CHnmxlZ0.js";import"./format-BmxTv3ea.js";import"./match-DiZcDwkp.js";import"./parseISO-BJ0UyFM2.js";import"./parse-DLRfWJcq.js";import"./getDefaultOptions-CQHWYkoJ.js";import"./util-CeHb-BPb.js";import"./InternStatusTag-BqDq1qN2.js";import"./CircleSlash-m2eEzYVt.js";import"./XMarkOctagon-B7QuE6Ax.js";import"./Reception-Duu6jjzI.js";import"./SealCheckmark-b7ZfibK8.js";import"./PersonChat-CafPeWF9.js";import"./MagnifyingGlass-CMto6W-2.js";import"./Dropdown-BRmh9lcL.js";import"./useControllableState-DAjJj0hK.js";import"./Popover-BI4TG3jn.js";import"./floating-ui.react-CSxZyN0A.js";import"./Date.Input-D98g2j24.js";import"./useFormField-DsNUz0eE.js";import"./ChevronDown-M_cBQkz2.js";import"./Modal.context-DfRJF0pN.js";import"./DismissableLayer-BWw-tESd.js";import"./useDescendant-CdSSQXFb.js";import"./useClientLayoutEffect-CiKxysUG.js";import"./Pencil-iC1vLkN1.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
