import{aK as s,j as i}from"./iframe-BI-wOhDW.js";import{w as d,c as o}from"./ContextDecorators-Cbg4Qioh.js";import{V as n}from"./VelgInternStatus-CjccZPQn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DKa98RjW.js";import"./OrganisasjonsnummerAlert-DvIP9YpF.js";import"./VStack-5t71I81C.js";import"./BasePrimitive-CyEUpN4A.js";import"./List-DaEFvDd0.js";import"./Link-CbybqPuY.js";import"./KandidatHendelseTag-LdG59OF-.js";import"./Tag-CoYdrjhu.js";import"./ChatExclamationmark-1aiRWdvi.js";import"./FileXMark-7SYvXUvm.js";import"./Trash-BWVielyQ.js";import"./HandShakeHeart-C6sS2LfC.js";import"./Calendar-DoXIVeT3.js";import"./ThumbUp-BBWDCzSk.js";import"./Table-DBzuuHb3.js";import"./util-VPWGOupN.js";import"./format-C4wZl0k7.js";import"./match-CxVFVvJa.js";import"./parse-DT2NsE4V.js";import"./getDefaultOptions-DlIahH4Y.js";import"./parseISO-C8NqvTw9.js";import"./index-CM80Zpw7.js";import"./index-B40KJ5b4.js";import"./isBefore-C7-6PEcE.js";import"./util-BbhlvIaM.js";import"./InternStatusTag-DkTuo92J.js";import"./CircleSlash-BSUyS85a.js";import"./XMarkOctagon-CnE-7WjO.js";import"./Reception-CVFF4ON1.js";import"./SealCheckmark-Dxp4FRXX.js";import"./PersonChat-CwxjBG6D.js";import"./MagnifyingGlass-Cqki9yyw.js";import"./Dropdown-DDbZtWEa.js";import"./useControllableState-Buz9rD4N.js";import"./Popover-Bm_XJwvi.js";import"./floating-ui.react-CgJwLGYV.js";import"./Date.Input-DYRBxtfE.js";import"./useFormField-B53o4-NQ.js";import"./ChevronDown-DnpdpR7X.js";import"./Modal.context-BomWj9n6.js";import"./DismissableLayer-D2T5B0pj.js";import"./useDescendant-vN9lMEgX.js";import"./useClientLayoutEffect-DuSL_6x7.js";import"./Pencil-3cuke6ap.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
