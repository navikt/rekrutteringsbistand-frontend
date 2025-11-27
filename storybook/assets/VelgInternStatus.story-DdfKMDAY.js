import{Y as s,j as i}from"./iframe-CxUg2AuX.js";import{V as n}from"./VelgInternStatus-BoM5t1uY.js";import{w as d,c as o}from"./ContextDecorators-CDsSm32Y.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DyefOsZj.js";import"./Tag-mg-6ah9r.js";import"./CircleSlash-C5ecABeb.js";import"./XMarkOctagon-D5R4Ajv8.js";import"./Reception-CRl2pRat.js";import"./SealCheckmark-CZVT3kLo.js";import"./PersonChat-Mr0Rfi8N.js";import"./MagnifyingGlass-DX9sDD83.js";import"./KandidatlisteContext-CxF4FbJC.js";import"./OrganisasjonsnummerAlert-DKvXnJKB.js";import"./VStack-CF_vrmLD.js";import"./BasePrimitive-Ay1P0RLG.js";import"./List-DzXEyHx1.js";import"./Link-Dtuj5eGY.js";import"./KandidatHendelseTag-BSyUVbt-.js";import"./ChatExclamationmark-BWJ7SL8F.js";import"./FileXMark-VE5DHzjr.js";import"./Trash-CeQdOROa.js";import"./HandShakeHeart-C7uvctws.js";import"./Calendar-D4WinFwz.js";import"./ThumbUp-BiLeHeS0.js";import"./Table-BZvmg8Op.js";import"./index-BtvTKIXR.js";import"./index-B40KJ5b4.js";import"./util-5kE2HE6r.js";import"./Dropdown-DJXKn2Dv.js";import"./useControllableState-B9AVaVs-.js";import"./Popover-GZ6ZXvo1.js";import"./floating-ui.react-B47RM0oo.js";import"./Date.Input-ClR78xeg.js";import"./useFormField-B8OuaE_r.js";import"./ChevronDown-DsO-4IAD.js";import"./Modal.context-BkSTZliK.js";import"./DismissableLayer-V6EjSsu2.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CzIkdIPi.js";import"./Pencil-DDH4-NXU.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
