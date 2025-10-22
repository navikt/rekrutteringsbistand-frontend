import{aK as s,j as i}from"./iframe-Dq6jy88q.js";import{w as d,c as o}from"./ContextDecorators-Bwy21_6z.js";import{V as n}from"./VelgInternStatus-BcEjKgz3.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-MDe7Sd4b.js";import"./OrganisasjonsnummerAlert-BmxlHndD.js";import"./VStack-C46EolpT.js";import"./BasePrimitive-AJE0S9yC.js";import"./List-BgSmaTYP.js";import"./Link-CiqLb_Ad.js";import"./KandidatHendelseTag-BjLzDDH1.js";import"./Tag-CjGfYI92.js";import"./ChatExclamationmark-Bjm8btDi.js";import"./FileXMark-CZma65Q0.js";import"./Trash-B-m4QklR.js";import"./HandShakeHeart-rn4U49DR.js";import"./Calendar-D6vFvXVm.js";import"./ThumbUp-C_D_koxN.js";import"./Table-CWHU9ppE.js";import"./util-D11TBdcN.js";import"./format-CCxjOKSg.js";import"./match-CHiwlmDn.js";import"./parse-DqZhlknj.js";import"./getDefaultOptions-CXgSi_fi.js";import"./parseISO-BwWUFruW.js";import"./util-ChoCMt5m.js";import"./InternStatusTag-BU4Qp3Vt.js";import"./CircleSlash-BbdYfutV.js";import"./XMarkOctagon-DgK97MjT.js";import"./Reception-KTIxn3I8.js";import"./SealCheckmark--vvg1uNS.js";import"./PersonChat-D1JkcPVk.js";import"./MagnifyingGlass-q9ttc6fZ.js";import"./Dropdown-2ZZEDun2.js";import"./useControllableState-4r1Xb4L0.js";import"./Popover-Bevcx75z.js";import"./floating-ui.react-SIvQ9HNW.js";import"./Date.Input-DEyz2K7-.js";import"./useFormField-o2AGkmWd.js";import"./ChevronDown-B7HWF0M3.js";import"./Modal.context-D8H8I5WA.js";import"./DismissableLayer-DkdFaEZu.js";import"./useDescendant-BiWoxJFE.js";import"./useClientLayoutEffect-Cbcy2dkk.js";import"./Pencil-B4cy34oR.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
