import{aK as s,j as i}from"./iframe-DsITc3mA.js";import{w as d,c as o}from"./ContextDecorators-CSolmKQ1.js";import{V as n}from"./VelgInternStatus-BPKjPJYC.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CUXpiv9x.js";import"./OrganisasjonsnummerAlert-BUC-F67u.js";import"./VStack-CvyiRE_f.js";import"./BasePrimitive--oSe4LW5.js";import"./List-CfXJtGdf.js";import"./Link-CY2UgJGm.js";import"./KandidatHendelseTag-w5zbIbts.js";import"./Tag-CLKybL4q.js";import"./ChatExclamationmark-DfMjluRc.js";import"./FileXMark-CrazEVzb.js";import"./Trash-DJTn7uuz.js";import"./HandShakeHeart-CaKP5WEO.js";import"./Calendar-UeiytvH-.js";import"./ThumbUp-Cr3eCfzz.js";import"./Table-DmabxBb3.js";import"./util-DfoRtf8j.js";import"./format-CX2UATzM.js";import"./match-HK4rQPNG.js";import"./parse-rayuB1S9.js";import"./getDefaultOptions-V7gnzTBC.js";import"./parseISO-BT7fYFKm.js";import"./util-DXyUuqfd.js";import"./InternStatusTag-DiFYBCZl.js";import"./CircleSlash-CGrgz_Ec.js";import"./XMarkOctagon-U5o2mDQj.js";import"./Reception-BZRHurrR.js";import"./SealCheckmark-Cc0-KbN_.js";import"./PersonChat-C_oo_AjB.js";import"./MagnifyingGlass-BcFR3ri6.js";import"./Dropdown-C7AXwi9j.js";import"./useControllableState-DLUEVyO-.js";import"./Popover-1IUncno8.js";import"./floating-ui.react-CO8u8-zc.js";import"./Date.Input-v1rNPlVl.js";import"./useFormField-3f-yTkw_.js";import"./ChevronDown-D99Fb3BD.js";import"./Modal.context-CTOTWPev.js";import"./DismissableLayer-COL-0CdF.js";import"./useDescendant-PvMXGtrB.js";import"./useClientLayoutEffect-DY3v19G_.js";import"./Pencil-De1nvOJg.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
