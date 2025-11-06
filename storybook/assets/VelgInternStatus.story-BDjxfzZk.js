import{P as s,j as i}from"./iframe-CEi1Y25_.js";import{V as n}from"./VelgInternStatus-Dn1BVitf.js";import{w as d,c as o}from"./ContextDecorators-hN16XGzy.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-Pgql33jM.js";import"./Tag-iDGw-CbN.js";import"./CircleSlash-hqTR-SWV.js";import"./XMarkOctagon-BZeiCftD.js";import"./Reception-DdCvn3p9.js";import"./SealCheckmark-BNUyKsj-.js";import"./PersonChat-plX-YV-H.js";import"./MagnifyingGlass-CEMegL8p.js";import"./KandidatlisteContext-TAReqAQp.js";import"./OrganisasjonsnummerAlert-C2Fjy2Cg.js";import"./VStack-DlvQwrPr.js";import"./BasePrimitive-CD_PpSbA.js";import"./List-FWr8GfD0.js";import"./Link-0dmJDKCO.js";import"./KandidatHendelseTag-Df_A10P1.js";import"./ChatExclamationmark-8Cd2OGy8.js";import"./FileXMark-DU6zhDkh.js";import"./Trash-kg8E1TW2.js";import"./HandShakeHeart-C9Te7JJb.js";import"./Calendar-DhPZD4re.js";import"./ThumbUp-xwS0PIcU.js";import"./Table-D3jKUWh5.js";import"./util-B4XJVmFy.js";import"./parse-DdCTVvrf.js";import"./getDefaultOptions-nDgdeQR6.js";import"./parseISO-Bt7bxBvf.js";import"./index-Cttkei0V.js";import"./index-B40KJ5b4.js";import"./isBefore-CVoWPQY4.js";import"./util-2HP5K3Gr.js";import"./Dropdown-BSEa2OTW.js";import"./useControllableState-BYJP4Qy4.js";import"./Popover-D18SSTJv.js";import"./floating-ui.react-B7ONW0ON.js";import"./Date.Input-CZrglUtk.js";import"./useFormField-DQy04blY.js";import"./ChevronDown-05eodRTg.js";import"./Modal.context-vOD-2fLT.js";import"./DismissableLayer-BtFa0zwB.js";import"./useDescendant-Ct6WCee5.js";import"./useClientLayoutEffect-DF_7u9uO.js";import"./Pencil-B1VhzEOg.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,at as default};
