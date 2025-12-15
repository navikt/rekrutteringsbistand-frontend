import{X as s,j as i}from"./iframe-CIT3DOWc.js";import{V as n}from"./VelgInternStatus-Dn1Swwg2.js";import{w as d,c as o}from"./ContextDecorators-DF2vqBdV.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-C7eKv_Wq.js";import"./Tag-C1zXWBwF.js";import"./CircleSlash-CiOLYqpL.js";import"./XMarkOctagon-C1koFuYH.js";import"./Reception-CE-dm9bR.js";import"./SealCheckmark-GmNHBZ4_.js";import"./PersonChat-CLgqUbw4.js";import"./MagnifyingGlass-B4ESiidW.js";import"./KandidatlisteContext-gxtO-ZJa.js";import"./OrganisasjonsnummerAlert-ByXAit9o.js";import"./VStack-DN1B3Ttz.js";import"./BasePrimitive-DCWy4zSg.js";import"./List-p9AHeWui.js";import"./Link-DuFyBj-D.js";import"./KandidatHendelseTag-Bjmrx7hf.js";import"./ChatExclamationmark-B-bsV1Hm.js";import"./FileXMark-B5eS1K0W.js";import"./Trash-D2WhF6M1.js";import"./HandShakeHeart-DHGWgA55.js";import"./Calendar-Czl3AQgB.js";import"./ThumbUp-Cej_gCOM.js";import"./Table-Wq5rUUcx.js";import"./index-BR14ZwBD.js";import"./index-B40KJ5b4.js";import"./util-zX2xrv_1.js";import"./Dropdown-C91tqkFC.js";import"./useControllableState-CvPQYz3G.js";import"./Popover-BrSDwvvq.js";import"./floating-ui.react-Bj85ERGC.js";import"./Date.Input-B1f3hjBg.js";import"./useFormField-BmSNLWfL.js";import"./ChevronDown-Be8Qb0zv.js";import"./Modal.context-gu5GaKCS.js";import"./DismissableLayer-CQrPSSY1.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CT6DomzI.js";import"./Pencil-ClrUcgjP.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
