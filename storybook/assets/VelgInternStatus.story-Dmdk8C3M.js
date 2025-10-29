import{Y as s,j as i}from"./iframe-H0yXMhS1.js";import{w as d,c as o}from"./ContextDecorators-rrH6Qgpd.js";import{V as n}from"./VelgInternStatus-DTY1-Y4r.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CstOaRqK.js";import"./OrganisasjonsnummerAlert-DgqamFsY.js";import"./VStack-DuONN55V.js";import"./BasePrimitive-BySfJsgO.js";import"./List-CRqFUcZT.js";import"./Link-DjgNZ7Vx.js";import"./KandidatHendelseTag-DMO9BgC6.js";import"./Tag-CQgnWam6.js";import"./ChatExclamationmark-DH6ks_jL.js";import"./FileXMark-B_lp7Wpe.js";import"./Trash-4WmyzpwM.js";import"./HandShakeHeart--NoS2pbw.js";import"./Calendar-B6CKet49.js";import"./ThumbUp-EBUKBeKD.js";import"./Table-BG7Ck02Y.js";import"./util-B1yZnOMj.js";import"./format-BYB0Al8D.js";import"./match-CE8FlIHe.js";import"./parse-xp8_Zj_H.js";import"./getDefaultOptions-CtDkAiXh.js";import"./parseISO-CxhTcv8Q.js";import"./index-Btc70d1l.js";import"./index-B40KJ5b4.js";import"./isBefore-Bec-1C9E.js";import"./util-BbrPoFAq.js";import"./InternStatusTag-u6b9AhSC.js";import"./CircleSlash-DFVkbCMW.js";import"./XMarkOctagon-BzOnpHny.js";import"./Reception-i6reiUpH.js";import"./SealCheckmark-D3rtpQK0.js";import"./PersonChat-BCZAxxqD.js";import"./MagnifyingGlass-BCvnNumj.js";import"./Dropdown-DUTof3gz.js";import"./useControllableState-B0Zl1xS9.js";import"./Popover-B_rFNlC5.js";import"./floating-ui.react-DR0cSvZz.js";import"./Date.Input-BgeletWy.js";import"./useFormField-BlZm1T9Z.js";import"./ChevronDown-kwX6RnPU.js";import"./Modal.context-B1iRXIBr.js";import"./DismissableLayer-DJKR5cfd.js";import"./useDescendant-vLD5m-34.js";import"./useClientLayoutEffect-D6WCDnon.js";import"./Pencil-Bc7qzJjg.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
