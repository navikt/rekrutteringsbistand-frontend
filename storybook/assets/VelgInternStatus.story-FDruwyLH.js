import{P as s,j as i}from"./iframe-ByNpXw81.js";import{V as n}from"./VelgInternStatus-0B1R-1WI.js";import{w as d,c as o}from"./ContextDecorators-Olm2YFmo.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-D7Gz9guy.js";import"./Tag-BIhHedAj.js";import"./CircleSlash-B0EDyoGB.js";import"./XMarkOctagon-BwieL_Va.js";import"./Reception-DmPqHL30.js";import"./SealCheckmark-DGGYJSSp.js";import"./PersonChat-gFchLqL4.js";import"./MagnifyingGlass-Bi7E8lar.js";import"./KandidatlisteContext-C-adtj-6.js";import"./OrganisasjonsnummerAlert-CgoWqrfn.js";import"./VStack-BkCe9z3a.js";import"./BasePrimitive-CgEC5yfj.js";import"./List-C0CGx6t_.js";import"./Link-K7iHMQmO.js";import"./KandidatHendelseTag-BDLVCQQX.js";import"./ChatExclamationmark-D8oH4723.js";import"./FileXMark-CWKNfRsF.js";import"./Trash-BSgz52q-.js";import"./HandShakeHeart-f3HbAaro.js";import"./Calendar-Cudjsd_l.js";import"./ThumbUp-B2DxAcQQ.js";import"./Table-CRfVQTev.js";import"./util-ChU84pnD.js";import"./parse-CqHOPKoV.js";import"./getDefaultOptions-BH8bkUTA.js";import"./parseISO-upBYiumH.js";import"./index-D3yaVyU9.js";import"./index-B40KJ5b4.js";import"./isBefore-D2MnlS4x.js";import"./util-esJN40y8.js";import"./Dropdown-DzF4Z2Ke.js";import"./useControllableState-CF148P0b.js";import"./Popover-DFKOZ4to.js";import"./floating-ui.react-BxBUTSmx.js";import"./Date.Input-Aio1NogG.js";import"./useFormField-BWbpbANY.js";import"./ChevronDown-CuGLSyjk.js";import"./Modal.context-D5msxr56.js";import"./DismissableLayer-BQOrSO4O.js";import"./useDescendant-DqJITIpZ.js";import"./useClientLayoutEffect-CDmxK94Y.js";import"./Pencil-6M81j-k-.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
