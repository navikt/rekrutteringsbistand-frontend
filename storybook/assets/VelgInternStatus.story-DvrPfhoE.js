import{Y as s,j as i}from"./iframe-jqaI6nix.js";import{V as n}from"./VelgInternStatus-B_SH9qX0.js";import{w as d,c as o}from"./ContextDecorators-Dwh4bwJL.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DRk2ZXUY.js";import"./Tag-Dxz2F1X3.js";import"./CircleSlash-BxDe9DmA.js";import"./XMarkOctagon-BbAgN6sk.js";import"./Reception-DEJSGeMC.js";import"./SealCheckmark-BiDRrqfL.js";import"./PersonChat-Dctw5Pt2.js";import"./MagnifyingGlass-G7nXQBIn.js";import"./KandidatlisteContext-C649bL-T.js";import"./OrganisasjonsnummerAlert-JWpvu6Qz.js";import"./VStack-DkixGE9B.js";import"./BasePrimitive-CuHGsCuA.js";import"./List-sTPOW_96.js";import"./Link-B0wBbhpE.js";import"./KandidatHendelseTag-Dth3ETUV.js";import"./ChatExclamationmark-5qgcDlon.js";import"./FileXMark-D6NBLjbP.js";import"./Trash-CjU-_2dx.js";import"./HandShakeHeart-4SmutWG-.js";import"./Calendar-Duf0ayvC.js";import"./ThumbUp-Vbg7evja.js";import"./Table-CuOaNzwY.js";import"./index-D54ImCzq.js";import"./index-B40KJ5b4.js";import"./util-CNc4M1gg.js";import"./Dropdown-7Utr9zdD.js";import"./useControllableState-CB7qy0JV.js";import"./Popover-DMfmbIVZ.js";import"./floating-ui.react-B79GNVCi.js";import"./Date.Input-Dx7G7IQt.js";import"./useFormField-C6_IMCya.js";import"./ChevronDown-Cjik6YhF.js";import"./Modal.context-DOBq2N_q.js";import"./DismissableLayer-C4GOVWmh.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-D3StlOby.js";import"./Pencil-JYBFhKes.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
