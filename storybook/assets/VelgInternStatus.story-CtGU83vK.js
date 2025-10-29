import{Y as s,j as i}from"./iframe-Bietwq5R.js";import{w as d,c as o}from"./ContextDecorators-icntH-04.js";import{V as n}from"./VelgInternStatus-BpZUXMT5.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DjQZRqO2.js";import"./OrganisasjonsnummerAlert-DpQq6y7I.js";import"./VStack-sZt5JLr9.js";import"./BasePrimitive-C3DBZZoi.js";import"./List-lSNIRG4U.js";import"./Link-NJnPHS5k.js";import"./KandidatHendelseTag-cRMcFJwi.js";import"./Tag-5glEbiR4.js";import"./ChatExclamationmark-BDwWJbh4.js";import"./FileXMark-BgMiZV8k.js";import"./Trash-BLLOSfsT.js";import"./HandShakeHeart-BnQzUK6M.js";import"./Calendar-D6Qt28Ry.js";import"./ThumbUp-z-Bey4DB.js";import"./Table-Bui68sCT.js";import"./util-DDDrks3n.js";import"./format-CyfInD_Y.js";import"./match-DMb0w9XY.js";import"./parse-Ck-7mst5.js";import"./getDefaultOptions-BEP5j7QA.js";import"./parseISO-j5ExsMzG.js";import"./index-jK4pCKkV.js";import"./index-B40KJ5b4.js";import"./isBefore-BOXOTiO2.js";import"./util-pfPFjztK.js";import"./InternStatusTag-B4-4xe3Y.js";import"./CircleSlash-BI-BdPjA.js";import"./XMarkOctagon-BT5kMK7m.js";import"./Reception-UHDRqQli.js";import"./SealCheckmark-wrbdAipI.js";import"./PersonChat-DBkFk7TK.js";import"./MagnifyingGlass-Cjf6vImK.js";import"./Dropdown-BxlidiBT.js";import"./useControllableState-B1O8h9rV.js";import"./Popover-Kj7X_JS3.js";import"./floating-ui.react-Dg8nhyeA.js";import"./Date.Input-B_Qs2CQc.js";import"./useFormField-DufTyQGE.js";import"./ChevronDown-BJ-qVGsw.js";import"./Modal.context-DqcrTTpA.js";import"./DismissableLayer-BX_he1Z9.js";import"./useDescendant-C6a7rGIS.js";import"./useClientLayoutEffect-RC2vySZb.js";import"./Pencil-Ci5DsLc3.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
