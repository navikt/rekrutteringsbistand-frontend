import{O as s,j as i}from"./iframe-B2tryd13.js";import{V as n}from"./VelgInternStatus-C3DgS5hy.js";import{w as d,c as o}from"./ContextDecorators-B8ZDImyr.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-PaRjBOZa.js";import"./Tag-Co9kyAHI.js";import"./CircleSlash-LAtFfPhA.js";import"./XMarkOctagon-DR1uAjqW.js";import"./Reception-BUvF5I1D.js";import"./SealCheckmark-g0Kjr0Im.js";import"./PersonChat-zRHkrAP3.js";import"./MagnifyingGlass-DmF2hTj7.js";import"./KandidatlisteContext-DT7g8MGk.js";import"./OrganisasjonsnummerAlert-CLtGQX1Q.js";import"./VStack-CpoSlYhk.js";import"./BasePrimitive-Bi6JzUQi.js";import"./List-CYyAh4XV.js";import"./Link-BX-rTweX.js";import"./KandidatHendelseTag-pIWDNAUj.js";import"./ChatExclamationmark-htJQIgl5.js";import"./FileXMark-RNZSYO6O.js";import"./Trash-C5oGf-Fb.js";import"./HandShakeHeart-CEno8NIK.js";import"./Calendar-BaL8G25p.js";import"./ThumbUp-CGTtj9x5.js";import"./ExclamationmarkTriangle-De3rYfmn.js";import"./Table-D51Rf6zr.js";import"./index-D7Wk16A6.js";import"./index-B40KJ5b4.js";import"./util-BbPUv3M_.js";import"./Dropdown-CG3ycuLU.js";import"./useControllableState-C0QJmmOx.js";import"./Popover-DaxU5DVu.js";import"./floating-ui.react-DSsUI2b0.js";import"./Date.Input-CQ6krd-H.js";import"./useFormField-Br51i2gO.js";import"./ChevronDown-By_C_7Bd.js";import"./Modal.context-b7jcTHLm.js";import"./DismissableLayer-LPannaoJ.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BX_HQuof.js";import"./Pencil-DWemSD5x.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
