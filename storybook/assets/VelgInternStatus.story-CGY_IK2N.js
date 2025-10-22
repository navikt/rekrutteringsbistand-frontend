import{aK as s,j as i}from"./iframe-CFPerreN.js";import{w as d,c as o}from"./ContextDecorators-BmRTlrP1.js";import{V as n}from"./VelgInternStatus-D9mDgT45.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DbyYA3lg.js";import"./OrganisasjonsnummerAlert-_IJk2d2H.js";import"./VStack-BBO2SMmH.js";import"./BasePrimitive-DQxgn5I-.js";import"./List-D70wJ2WL.js";import"./Link-CjMY8Y91.js";import"./KandidatHendelseTag-DZWy4QIZ.js";import"./Tag-BcgSs725.js";import"./ChatExclamationmark-BWol-AQi.js";import"./FileXMark-DmlcMlCZ.js";import"./Trash-BXdMlBC3.js";import"./HandShakeHeart-BKmIWuvG.js";import"./Calendar-CizdEyps.js";import"./ThumbUp-CXARo9HL.js";import"./Table-CIayWjTW.js";import"./util-Ny31ce32.js";import"./format-Dlji57sT.js";import"./match-Ddj5mRs6.js";import"./parse-ByiE-1KN.js";import"./getDefaultOptions-DoSM8sBS.js";import"./parseISO-F7SnvxB9.js";import"./util-DmWt790Q.js";import"./InternStatusTag-BvoGjoJK.js";import"./CircleSlash-BGwM-CN6.js";import"./XMarkOctagon-DTSVAg7v.js";import"./Reception-DJSNiGTL.js";import"./SealCheckmark-xKwXuoFm.js";import"./PersonChat-B39f9tYl.js";import"./MagnifyingGlass-BQvWGJBJ.js";import"./Dropdown-Cegxm6-u.js";import"./useControllableState-3kn0Fx76.js";import"./Popover-eeExVYT2.js";import"./floating-ui.react-CDIUzIAN.js";import"./Date.Input-BKsvLY9l.js";import"./useFormField-Bmffen5_.js";import"./ChevronDown-C2Xb0Hp_.js";import"./Modal.context-0umXxUAh.js";import"./DismissableLayer-BJVNuyiY.js";import"./useDescendant-C6lh1Pga.js";import"./useClientLayoutEffect-BPoH14GW.js";import"./Pencil-9gu4uw9R.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
