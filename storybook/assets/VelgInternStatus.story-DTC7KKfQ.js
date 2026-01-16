import{O as s,j as i}from"./iframe-Ik8kw4Ju.js";import{V as n}from"./VelgInternStatus-500R76io.js";import{w as d,c as o}from"./ContextDecorators-BVYv83kG.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CbEEOel5.js";import"./Tag-DY7FqA44.js";import"./CircleSlash-BrgUNtHo.js";import"./XMarkOctagon-BodCufEy.js";import"./Reception-D43lJKhX.js";import"./SealCheckmark-C--X_QQn.js";import"./PersonChat-CMMDqnJX.js";import"./MagnifyingGlass-CsdsIMhQ.js";import"./KandidatlisteContext-DQ_rsbH0.js";import"./OrganisasjonsnummerAlert-BVUVbGru.js";import"./VStack-DtMoho4C.js";import"./BasePrimitive-CspwQbfs.js";import"./List-U0SSBVNs.js";import"./Link-Cau-CVIv.js";import"./KandidatHendelseTag-BlAh3-Nj.js";import"./ChatExclamationmark-pwY1T5Ym.js";import"./FileXMark-vBOOE6wq.js";import"./Trash-BTctDNVN.js";import"./HandShakeHeart-BFdjLwtT.js";import"./Calendar-CdKvi8Wq.js";import"./ThumbUp-BdureR0h.js";import"./ExclamationmarkTriangle-iP216GN2.js";import"./Table-CZR_oYYA.js";import"./index-UR0OcfYb.js";import"./index-B40KJ5b4.js";import"./util-CPxhl3rq.js";import"./Dropdown-B0qpalWY.js";import"./useControllableState-p63OqQmu.js";import"./Popover-00KpZIRV.js";import"./floating-ui.react-CfN5WK7s.js";import"./Date.Input-CItyK-0t.js";import"./useFormField-C9ee2YVq.js";import"./ChevronDown-C5cV2XA7.js";import"./Modal.context-paBkLDd3.js";import"./DismissableLayer-OgsdA99v.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CPiUCbX0.js";import"./Pencil-CtHNJSS0.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
