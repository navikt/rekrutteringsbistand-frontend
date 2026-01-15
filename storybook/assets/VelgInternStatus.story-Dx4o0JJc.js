import{O as s,j as i}from"./iframe-CYkqDpFQ.js";import{V as n}from"./VelgInternStatus-B9B-XRhG.js";import{w as d,c as o}from"./ContextDecorators-yYqDkXwl.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DzUJ2B6L.js";import"./Tag-7IOW6zyS.js";import"./CircleSlash-D3swFlZL.js";import"./XMarkOctagon-DqasVALF.js";import"./Reception-BEgrcpgY.js";import"./SealCheckmark-CMoFcXym.js";import"./PersonChat-Dr0qRlr-.js";import"./MagnifyingGlass-D2cAdhDH.js";import"./KandidatlisteContext-C7pqAoBp.js";import"./OrganisasjonsnummerAlert-B5Idb2Qi.js";import"./VStack-DJPKcU1m.js";import"./BasePrimitive-reuNz4pH.js";import"./List-Bn67-Uss.js";import"./Link-u8POiQZ8.js";import"./KandidatHendelseTag-mKIRRdOJ.js";import"./ChatExclamationmark-D3KvHGNT.js";import"./FileXMark-DVxLpWk-.js";import"./Trash-DqiEXXW0.js";import"./HandShakeHeart-BsIlKUhK.js";import"./Calendar-DQWarZPl.js";import"./ThumbUp-Cq2dP2O9.js";import"./ExclamationmarkTriangle-BMG1JPPl.js";import"./Table-Bb6xp3ny.js";import"./index-DaGfPweS.js";import"./index-B40KJ5b4.js";import"./util-B1_8Nu4i.js";import"./Dropdown-8qTsw6bS.js";import"./useControllableState-BXn8QYgD.js";import"./Popover-BF1lCYJs.js";import"./floating-ui.react-BxzS63wE.js";import"./Date.Input-XWqrZOCJ.js";import"./useFormField-z3l0fHsz.js";import"./ChevronDown-B-VMQ9SL.js";import"./Modal.context-DUSEIPc7.js";import"./DismissableLayer-BuyAlXxU.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-uErDUp0f.js";import"./Pencil-Cq7YJcUb.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
