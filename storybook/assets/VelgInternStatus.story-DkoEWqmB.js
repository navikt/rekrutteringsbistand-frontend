import{j as s}from"./iframe-wMpf0ByR.js";import{w as d,c as o}from"./ContextDecorators-BlZgRWkH.js";import{V as n}from"./VelgInternStatus-CDlPFRpj.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-C-Hope_N.js";import"./OrganisasjonsnummerAlert-BKr52Xym.js";import"./VStack-37CH0eKn.js";import"./BasePrimitive-DEaSCRuB.js";import"./List-BHDmJnU9.js";import"./Link-C2D8Bda_.js";import"./KandidatHendelseTag-B61CT4h9.js";import"./Tag-C8vi5CtI.js";import"./ChatExclamationmark-DfA6YhNf.js";import"./FileXMark-DeA6pc2C.js";import"./Trash-jLZQ19UU.js";import"./HandShakeHeart-CAERdGPL.js";import"./Calendar-DekOy3Fx.js";import"./ThumbUp-BhbmdYoP.js";import"./Table-BKb7dE0E.js";import"./util-R7omXOg5.js";import"./format-CSHl5Iu1.js";import"./match-Ly9h5Kr8.js";import"./parseISO-CM3aM_-k.js";import"./parse-DhcZKNzd.js";import"./getDefaultOptions-BcXGjLgH.js";import"./util-B6y6F2Hz.js";import"./InternStatusTag-BRw2yxDX.js";import"./CircleSlash-DsdhZ1YK.js";import"./XMarkOctagon-BSpoeHjt.js";import"./Reception-CuvzMujg.js";import"./SealCheckmark-BElkh6-G.js";import"./PersonChat-D-XD8kZW.js";import"./MagnifyingGlass-T2mic-2y.js";import"./Dropdown-dYz-0MLR.js";import"./useControllableState-DRGcQ7Ej.js";import"./Popover-5y6TFJ0N.js";import"./floating-ui.react-DjemWi0d.js";import"./Date.Input-ZaD_nC3W.js";import"./useFormField-DY0O83Jc.js";import"./ChevronDown-PRNqbvoX.js";import"./Modal.context-B2-4rYqW.js";import"./DismissableLayer-YMLpy7FU.js";import"./useDescendant-P4dhj-_s.js";import"./useClientLayoutEffect-DmzneG6q.js";import"./Pencil-BG3hlXcj.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
