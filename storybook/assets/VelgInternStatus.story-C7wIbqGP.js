import{X as s,j as i}from"./iframe-_QUoCLzD.js";import{V as n}from"./VelgInternStatus-DZ5_NMOQ.js";import{w as d,c as o}from"./ContextDecorators-BwvQntpq.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-qu7tgxu9.js";import"./Tag-DiQnittR.js";import"./CircleSlash-43RtETSQ.js";import"./XMarkOctagon-DeHme2hK.js";import"./Reception-MiPR9X3z.js";import"./SealCheckmark-D6j59qQ7.js";import"./PersonChat-DiP0cWw0.js";import"./MagnifyingGlass-zT4o51y9.js";import"./KandidatlisteContext-DdK6nfmU.js";import"./OrganisasjonsnummerAlert-BB2zgEoS.js";import"./VStack-B07rP7Ko.js";import"./BasePrimitive-BUOPj2J2.js";import"./List-BX43fcHL.js";import"./Link-CucnNpTx.js";import"./KandidatHendelseTag-BZMp1aBB.js";import"./ChatExclamationmark-XhXNcNES.js";import"./FileXMark-BU1NHFma.js";import"./Trash-090UAozJ.js";import"./HandShakeHeart-DF-h01jx.js";import"./Calendar-C1c_btA0.js";import"./ThumbUp-CJa7Cc5X.js";import"./ExclamationmarkTriangle-DEQ4Xwvt.js";import"./Table-CDD0Bsw0.js";import"./index-CktUPNRq.js";import"./index-B40KJ5b4.js";import"./util-C51HBXju.js";import"./Dropdown-CuOlQzZr.js";import"./useControllableState-wViw2aPt.js";import"./Popover-BR1-3buT.js";import"./floating-ui.react-z-ORhGHN.js";import"./Date.Input-C4Dh5hB2.js";import"./useFormField-CPQ4YRRy.js";import"./ChevronDown-BzJpQY-A.js";import"./Modal.context-BHSwgPbI.js";import"./DismissableLayer-h4ATGLsG.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Y6xfv06t.js";import"./Pencil-Big_f7jo.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,Y as default};
