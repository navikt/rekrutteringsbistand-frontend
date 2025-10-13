import{j as s}from"./iframe-DLBscwX4.js";import{w as d,c as o}from"./ContextDecorators-xhDCmzSL.js";import{V as n}from"./VelgInternStatus-pGYcr33D.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CDI5MJ_x.js";import"./OrganisasjonsnummerAlert-CT3mNF-L.js";import"./VStack-C-r64OhW.js";import"./BasePrimitive-DOmCgIwE.js";import"./List-BdX6uIHV.js";import"./Link-D-a-TIAE.js";import"./KandidatHendelseTag-C-x8wOj-.js";import"./Tag-BL3700Hs.js";import"./FileXMark-DJGKfgrL.js";import"./Trash-BvvQQDxF.js";import"./HandShakeHeart-C46_pyqZ.js";import"./Calendar-tBAFqpZ0.js";import"./ThumbUp-C0DH2c5u.js";import"./Table-ClCD6oGL.js";import"./util-dwlesY8K.js";import"./format-DlB13mey.js";import"./match-BtuunVFV.js";import"./parseISO-CN6EaoMT.js";import"./parse-AIEoe5QS.js";import"./getDefaultOptions-U-0LeV48.js";import"./util-CFN44zkS.js";import"./InternStatusTag-B2kaICU0.js";import"./CircleSlash-BQSrLRYl.js";import"./XMarkOctagon-DAB58s1v.js";import"./Reception-BMTWNxtq.js";import"./SealCheckmark-DKcXptsx.js";import"./PersonChat-BZVf0erA.js";import"./MagnifyingGlass-DRpb5L16.js";import"./Dropdown-BlZlRwLJ.js";import"./useControllableState-DUdA72BO.js";import"./Popover-GaDqwn2r.js";import"./floating-ui.react-CEhCsSjr.js";import"./Date.Input-BTEgpACV.js";import"./useFormField-Z4agqtG7.js";import"./ChevronDown-CJ7usCnG.js";import"./Modal.context-BrFXXAdt.js";import"./DismissableLayer-Dugh27ba.js";import"./useDescendant-8h6ET8sX.js";import"./useClientLayoutEffect-CpvBLka_.js";import"./Pencil-CH1dCeBm.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
