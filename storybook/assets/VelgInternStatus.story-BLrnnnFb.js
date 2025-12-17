import{X as s,j as i}from"./iframe-D4iOfYdD.js";import{V as n}from"./VelgInternStatus-DJpk2Txe.js";import{w as d,c as o}from"./ContextDecorators-BE55KfEL.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CRJHzqzK.js";import"./Tag-gwqLe9qG.js";import"./CircleSlash-CMpxtvaP.js";import"./XMarkOctagon-BYXJaOOx.js";import"./Reception-DWuZBdNz.js";import"./SealCheckmark-BrvTM7bW.js";import"./PersonChat-Dxp5Jdbk.js";import"./MagnifyingGlass-_VkYVTpQ.js";import"./KandidatlisteContext-B_Rd8-tX.js";import"./OrganisasjonsnummerAlert-DtL0m1ZZ.js";import"./VStack-DsoS_FVc.js";import"./BasePrimitive-BL-Ca9OH.js";import"./List-Dp0jtzjl.js";import"./Link-HStznqXy.js";import"./KandidatHendelseTag-BzcUvUh0.js";import"./ChatExclamationmark-CVSqQhUX.js";import"./FileXMark-K-7-BXKI.js";import"./Trash-BiSSnaC_.js";import"./HandShakeHeart-OdReNHn-.js";import"./Calendar-CqdmdWZt.js";import"./ThumbUp--sbuRJQq.js";import"./Table-B_yR3vLO.js";import"./index-BSmOzy6Q.js";import"./index-B40KJ5b4.js";import"./util-BnXACK12.js";import"./Dropdown-BPdE0P0U.js";import"./useControllableState-CCn3Haam.js";import"./Popover-XCxaJ0uq.js";import"./floating-ui.react-QxC-zopC.js";import"./Date.Input-B1R4kY_r.js";import"./useFormField-DshCtziE.js";import"./ChevronDown-DESslXbj.js";import"./Modal.context-Cq1NJ1e2.js";import"./DismissableLayer-DZiHPteH.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-5Htf0mWj.js";import"./Pencil-DfFtBN0F.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
