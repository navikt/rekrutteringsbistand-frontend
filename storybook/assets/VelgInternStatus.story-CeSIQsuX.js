import{aP as s,j as i}from"./iframe-DomB5bjj.js";import{w as d,c as o}from"./ContextDecorators-CbbMJfiQ.js";import{V as n}from"./VelgInternStatus-Bg30gKkP.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Un_AZNHM.js";import"./OrganisasjonsnummerAlert-Cx4V2j_h.js";import"./VStack-BIZJXBtz.js";import"./BasePrimitive-4zkMH27C.js";import"./List-Db0gO-es.js";import"./Link-BjAiGgN5.js";import"./KandidatHendelseTag-Bda8LXPK.js";import"./Tag-p63y2drH.js";import"./FileXMark-eMar8Um1.js";import"./Trash-DJRsp79v.js";import"./HandShakeHeart-KQIWCk1D.js";import"./Calendar-B4MnxOld.js";import"./ThumbUp-Bsw1Krcb.js";import"./Table-CzQYNK6w.js";import"./util-BrcKzcyk.js";import"./format-B6xbGTNx.js";import"./match-wFH0aIAd.js";import"./parseISO-ve8k0lUo.js";import"./parse-BoX7ZchI.js";import"./getDefaultOptions-CvH2z-S0.js";import"./util-CiK02jJ7.js";import"./InternStatusTag-CezzmJ9d.js";import"./CircleSlash-DGtwOUcA.js";import"./XMarkOctagon-DY7BnHs0.js";import"./Reception-Coo2BEDs.js";import"./SealCheckmark--uzRnTmZ.js";import"./PersonChat-7WucLlQ1.js";import"./MagnifyingGlass-ae-XEmJU.js";import"./Dropdown-qj8oQMy8.js";import"./useControllableState-8E3oNcN9.js";import"./Popover-BPG4xEwS.js";import"./floating-ui.react-KIjMCIJQ.js";import"./Date.Input-VTW74Tam.js";import"./useFormField-DeAjfiw7.js";import"./ChevronDown-cMXOGJdx.js";import"./Modal.context-B4LbjCDK.js";import"./DismissableLayer-D78qK4dT.js";import"./useDescendant-_yY1UdUb.js";import"./useClientLayoutEffect-BJo3p9TX.js";import"./Pencil-Cm1ReCEt.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
