import{O as s,j as i}from"./iframe-yXg8aEsL.js";import{V as n}from"./VelgInternStatus-Bhf5DTWi.js";import{w as d,c as o}from"./ContextDecorators-_ipd9bvG.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DURg8-6k.js";import"./Tag-4Usza_qz.js";import"./CircleSlash-DZtArsir.js";import"./XMarkOctagon-BY3W1SXA.js";import"./Reception-CqdLHxAD.js";import"./SealCheckmark-6o_tLPmN.js";import"./PersonChat-BUvg1pHK.js";import"./MagnifyingGlass-KJ8XhFjC.js";import"./KandidatlisteContext-BDyKeoaE.js";import"./OrganisasjonsnummerAlert-s4fW92DV.js";import"./VStack-Cxcn_djk.js";import"./BasePrimitive-Bdp6Kfrt.js";import"./List-Dq4QWm19.js";import"./Link-j0jrgpba.js";import"./KandidatHendelseTag-C-p0bX1_.js";import"./ChatExclamationmark-CmbrZ5hr.js";import"./FileXMark-PuJkc4ng.js";import"./Trash-CyIGzQGq.js";import"./HandShakeHeart-DUqVn0Y2.js";import"./Calendar-Ct-DxQj0.js";import"./ThumbUp-C8bgAfyQ.js";import"./ExclamationmarkTriangle-DoAhAz0a.js";import"./Table-CEkJoP3c.js";import"./index-Cdb3ukf_.js";import"./index-B40KJ5b4.js";import"./util-DGJefGWE.js";import"./Dropdown-DPGFyKbA.js";import"./useControllableState-DktbU-4S.js";import"./Popover-Dg8pA_Ed.js";import"./floating-ui.react-gWPDQIqQ.js";import"./Date.Input-C9S36ulk.js";import"./useFormField-4LHn1pYA.js";import"./ChevronDown-h4edWzLe.js";import"./Modal.context-BCDGvJ6o.js";import"./DismissableLayer-DuEJM6Bc.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BajYG73Z.js";import"./Pencil-bhhIfHhV.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
