import{aP as s,j as i}from"./iframe-DMAO4dCV.js";import{w as d,c as o}from"./ContextDecorators-fr5D2H3g.js";import{V as n}from"./VelgInternStatus-BLwY1Jx9.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BA-skGqf.js";import"./OrganisasjonsnummerAlert-U4B-14BE.js";import"./VStack-H9H7uo4P.js";import"./BasePrimitive-DltdQK2v.js";import"./List-BO7tnBXi.js";import"./Link-C39Zqzcy.js";import"./KandidatHendelseTag-Cm0RTCOk.js";import"./Tag-CcXbwr3R.js";import"./FileXMark-CLJG14O_.js";import"./Trash-Ddpoy2cR.js";import"./HandShakeHeart-CLjzX3wp.js";import"./Calendar-0C-iFPZG.js";import"./ThumbUp-BLrpvnA0.js";import"./Table-DWlcU3_K.js";import"./util-D2HT7faN.js";import"./format-Di_xz1fb.js";import"./match-DZ2KMeUt.js";import"./parseISO-CN9Jj-x8.js";import"./parse-DsJXUTpL.js";import"./getDefaultOptions-BGLmWrnM.js";import"./util-C9-WZX9t.js";import"./InternStatusTag-B35XbRT0.js";import"./CircleSlash-B3Pnylje.js";import"./XMarkOctagon-sq0nKHP0.js";import"./Reception-DzRt5Mgt.js";import"./SealCheckmark-CJkISCED.js";import"./PersonChat-BcO5wruc.js";import"./MagnifyingGlass-BYmJ6azd.js";import"./Dropdown-CfO_Pq2C.js";import"./useControllableState-Cbu2ku7v.js";import"./Popover-ugrMLSzq.js";import"./floating-ui.react-BKlIVUh1.js";import"./Date.Input-DNo-mnrh.js";import"./useFormField-CjA7lB9L.js";import"./ChevronDown-Bb--lgvd.js";import"./Modal.context-B7_Jj5qA.js";import"./DismissableLayer-zlUEuIs5.js";import"./useDescendant-BDVhQCzW.js";import"./useClientLayoutEffect-Ct9g2HZI.js";import"./Pencil-DIpFKCLK.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
