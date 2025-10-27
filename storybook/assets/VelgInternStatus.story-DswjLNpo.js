import{Y as s,j as i}from"./iframe-C8jcw7Cb.js";import{w as d,c as o}from"./ContextDecorators-BwUDklGS.js";import{V as n}from"./VelgInternStatus-CYLVUuu0.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DnY9EEzK.js";import"./OrganisasjonsnummerAlert-BCFTfpSG.js";import"./VStack-BNepLD7v.js";import"./BasePrimitive-j6bcQoiE.js";import"./List-DbyFyqGt.js";import"./Link-DGq1BhO6.js";import"./KandidatHendelseTag-CXaL0pNj.js";import"./Tag-sxlF9RpW.js";import"./ChatExclamationmark-DBdosOr8.js";import"./FileXMark-BbhoTwvO.js";import"./Trash-Bvh1x_kE.js";import"./HandShakeHeart-B07m9nhL.js";import"./Calendar-B4h891om.js";import"./ThumbUp-4m2Eb0GJ.js";import"./Table-CLMLU_P6.js";import"./util-CSHBdDyM.js";import"./format-lbXZMvYQ.js";import"./match-BdPrbPLE.js";import"./parse-Dy9tyMs5.js";import"./getDefaultOptions-DcxZO1Sq.js";import"./parseISO-5MriDrOw.js";import"./index-znWfUUuP.js";import"./index-B40KJ5b4.js";import"./isBefore-BDjvwerj.js";import"./util-tI648GuU.js";import"./InternStatusTag-DiRzApEY.js";import"./CircleSlash-CBeJjDQU.js";import"./XMarkOctagon-AanmmYkF.js";import"./Reception-CBxXnrTK.js";import"./SealCheckmark-2cxR4gcf.js";import"./PersonChat-BgoqxS8l.js";import"./MagnifyingGlass-ClMEndNG.js";import"./Dropdown-BRs7cn3e.js";import"./useControllableState-BUOfQ_y2.js";import"./Popover-BSI5nSiq.js";import"./floating-ui.react-BmbGXzjv.js";import"./Date.Input-uaTAZs0d.js";import"./useFormField-DsCr0zyN.js";import"./ChevronDown-D0XiWsMN.js";import"./Modal.context-DvXrykWw.js";import"./DismissableLayer-CkLRBbqP.js";import"./useDescendant-DOBRuPMz.js";import"./useClientLayoutEffect-CidqHgOF.js";import"./Pencil-DGtPk2gw.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,et as default};
