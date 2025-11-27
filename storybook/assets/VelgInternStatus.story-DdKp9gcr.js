import{Y as s,j as i}from"./iframe-D39VVUvN.js";import{V as n}from"./VelgInternStatus-C_WoYwFl.js";import{w as d,c as o}from"./ContextDecorators-QAcQZAVc.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-756Yo4Bm.js";import"./Tag-DHJh71jG.js";import"./CircleSlash-DahLZCLc.js";import"./XMarkOctagon-DZbXdVx8.js";import"./Reception-Dd8PrHOQ.js";import"./SealCheckmark-Cck-faex.js";import"./PersonChat-5QsIgKY1.js";import"./MagnifyingGlass-CaWW8bcX.js";import"./KandidatlisteContext-D4uu2T-2.js";import"./OrganisasjonsnummerAlert-Dy1OqmL4.js";import"./VStack-BQhXnRv5.js";import"./BasePrimitive-MQf7OfQJ.js";import"./List-Dfv5dPXI.js";import"./Link-CPTb3KmN.js";import"./KandidatHendelseTag-C9smeLbY.js";import"./ChatExclamationmark-C_hdwPLg.js";import"./FileXMark-C9AaQ49C.js";import"./Trash-CPVW59ly.js";import"./HandShakeHeart-C6VM6-ej.js";import"./Calendar-B31z38Bc.js";import"./ThumbUp-Bbodya7O.js";import"./Table-Dvx2SbC1.js";import"./index-DVkrSIrT.js";import"./index-B40KJ5b4.js";import"./util-B3YawHvy.js";import"./Dropdown-DNWs6a_V.js";import"./useControllableState-BVmDx8dp.js";import"./Popover-BrJ_DUMA.js";import"./floating-ui.react-UTckooEH.js";import"./Date.Input-DKdz0zTn.js";import"./useFormField-CzWypWoY.js";import"./ChevronDown-0Sqg8eG_.js";import"./Modal.context-Bhs-zAbL.js";import"./DismissableLayer-BaPy2MN_.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-xrnbNCv7.js";import"./Pencil-Dzb1g18b.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,W as default};
