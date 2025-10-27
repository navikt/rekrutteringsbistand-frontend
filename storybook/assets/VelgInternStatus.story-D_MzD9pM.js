import{Y as s,j as i}from"./iframe-BSwZn_oI.js";import{w as d,c as o}from"./ContextDecorators-C5aXKbvP.js";import{V as n}from"./VelgInternStatus-BX4hyyB2.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BNUAfmvW.js";import"./OrganisasjonsnummerAlert-BX9tvKHw.js";import"./VStack-DjzZBkhX.js";import"./BasePrimitive-BHNKyCsd.js";import"./List-BEq7auS2.js";import"./Link-Bc3orUJ0.js";import"./KandidatHendelseTag-DgRM8e0p.js";import"./Tag-Cw756h_9.js";import"./ChatExclamationmark-DdLASfwf.js";import"./FileXMark-BOzKKBtH.js";import"./Trash-CW-Q6bzY.js";import"./HandShakeHeart-U-my39BI.js";import"./Calendar-KWJUd-kV.js";import"./ThumbUp-pLB34usb.js";import"./Table-B1aSq06A.js";import"./util-CtiqTgPV.js";import"./format-SsUeQAMy.js";import"./match-BhHc5umL.js";import"./parse-D37x4GqW.js";import"./getDefaultOptions-BG9ekSfG.js";import"./parseISO-Ca4v66bK.js";import"./index-Cfe2iOPl.js";import"./index-B40KJ5b4.js";import"./isBefore-hLlpF2sg.js";import"./util-BeYfbDft.js";import"./InternStatusTag-C03nuNb-.js";import"./CircleSlash-Di6yaJzZ.js";import"./XMarkOctagon-ESzbKJMA.js";import"./Reception-Cmgp5ey6.js";import"./SealCheckmark-U4mtCS86.js";import"./PersonChat-B1v3ssB_.js";import"./MagnifyingGlass-OIsyOorc.js";import"./Dropdown-DYaJUcOl.js";import"./useControllableState-DTLpBcL-.js";import"./Popover-Cq8VTCRJ.js";import"./floating-ui.react-D8E_nKxQ.js";import"./Date.Input-DXjE-B4l.js";import"./useFormField-dVjSKRbI.js";import"./ChevronDown-6vB9t1a7.js";import"./Modal.context-ogyKFidp.js";import"./DismissableLayer-puuWhmvF.js";import"./useDescendant-DwMa3nEz.js";import"./useClientLayoutEffect-DFm_hYrL.js";import"./Pencil-6U696XdE.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
