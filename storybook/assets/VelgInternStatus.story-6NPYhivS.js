import{Y as s,j as i}from"./iframe-DaMpkblx.js";import{V as n}from"./VelgInternStatus-CTYSyGnO.js";import{w as d,c as o}from"./ContextDecorators-Vo8HlEJH.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-pj3JD4xb.js";import"./Tag-CwJ_OZcS.js";import"./CircleSlash-ijVb9O4T.js";import"./XMarkOctagon-DpVFjdIV.js";import"./Reception-D0Lv97lv.js";import"./SealCheckmark-BVZl30XD.js";import"./PersonChat-BIIO2uBN.js";import"./MagnifyingGlass-BfULRn-j.js";import"./KandidatlisteContext-Cwcc7zFz.js";import"./OrganisasjonsnummerAlert-h-Di_bNM.js";import"./VStack-23sbLoSw.js";import"./BasePrimitive-CYVGx-uf.js";import"./List-aHBIqAbu.js";import"./Link-Wnvzg6Lp.js";import"./KandidatHendelseTag-SkJw_-Yj.js";import"./ChatExclamationmark-CPpKFWD2.js";import"./FileXMark-Deto5TrM.js";import"./Trash-Br2F0rQ_.js";import"./HandShakeHeart-BvglSkIT.js";import"./Calendar-kUt3L55e.js";import"./ThumbUp-k0kpUnCx.js";import"./Table-DrZhGpfX.js";import"./index-D1bdHCqu.js";import"./index-B40KJ5b4.js";import"./util-BqxU6O_y.js";import"./Dropdown-BxUrN4mg.js";import"./useControllableState-Dli3H_H5.js";import"./Popover-CcqshBRL.js";import"./floating-ui.react-4kzvOiiR.js";import"./Date.Input-DsCO5uBT.js";import"./useFormField-D0gNNOjh.js";import"./ChevronDown-RtuA7GZk.js";import"./Modal.context-B1rC-gT8.js";import"./DismissableLayer-ByifLX4b.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C28Y73Kt.js";import"./Pencil-DhvrD7zu.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
