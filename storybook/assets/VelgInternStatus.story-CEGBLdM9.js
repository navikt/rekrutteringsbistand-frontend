import{O as s,j as i}from"./iframe-8sML1qxS.js";import{V as n}from"./VelgInternStatus-CBgkaxj-.js";import{w as d,c as o}from"./ContextDecorators-BovREMEs.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-rJPhCL2H.js";import"./Tag-Cx8h0QcD.js";import"./CircleSlash-BeN51Jme.js";import"./XMarkOctagon-BB9dXNu8.js";import"./Reception-C-_GHMrW.js";import"./SealCheckmark-1Umwdiyp.js";import"./PersonChat-CLOXZH5Z.js";import"./MagnifyingGlass-Cj2VomO0.js";import"./KandidatlisteContext-DRigmI8a.js";import"./OrganisasjonsnummerAlert-BkRpSSfw.js";import"./VStack-DRwdmI3-.js";import"./BasePrimitive-BmqLDMuc.js";import"./List-BflqGauY.js";import"./Link-CS_39ATQ.js";import"./KandidatHendelseTag-DuddxgxS.js";import"./ChatExclamationmark-DaCv-sla.js";import"./FileXMark-DT43kFyy.js";import"./Trash-DtE42QsC.js";import"./HandShakeHeart-DLBEN19F.js";import"./Calendar-CO5LFH_s.js";import"./ThumbUp-C2NOdUm1.js";import"./ExclamationmarkTriangle-4tCFwl3B.js";import"./Table-DhjErmmF.js";import"./index-DPXZmGOL.js";import"./index-B40KJ5b4.js";import"./util-B1cpXv4o.js";import"./Dropdown-BgAy6fpX.js";import"./useControllableState-C6Xv7p8h.js";import"./Popover-DuKik7fa.js";import"./floating-ui.react-OMGuPjdp.js";import"./Date.Input-VTQIO55Q.js";import"./useFormField-U6a8lsCF.js";import"./ChevronDown-Ba2f5nE9.js";import"./Modal.context-DE6FvpHB.js";import"./DismissableLayer-Bl2AF_UL.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CVhQb8QH.js";import"./Pencil-DPsrTn0G.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
