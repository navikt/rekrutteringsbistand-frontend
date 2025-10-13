import{j as s}from"./iframe-Cj10hJN9.js";import{w as d,c as o}from"./ContextDecorators-Dz6OibcW.js";import{V as n}from"./VelgInternStatus-CRg-vvsW.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DCcLHUx1.js";import"./OrganisasjonsnummerAlert-C5fz9_EJ.js";import"./VStack-DgWskb_V.js";import"./BasePrimitive-C6TPMJG9.js";import"./List-iw2586sG.js";import"./Link-4Kimjj0w.js";import"./KandidatHendelseTag-BljSSKGz.js";import"./Tag-NFCzJApn.js";import"./FileXMark-Du0-y8iF.js";import"./Trash-C2Lk7IOj.js";import"./HandShakeHeart-DkAoXuKv.js";import"./Calendar-LzYd0bSO.js";import"./ThumbUp-B1ZOElQa.js";import"./Table-BAMcB-vd.js";import"./util-Dqlyw5_B.js";import"./format-BpNq2Jet.js";import"./match-B8Nx5_0z.js";import"./parseISO-Bc0AvIe9.js";import"./parse-BQHX6S4p.js";import"./getDefaultOptions-B8TMiTK_.js";import"./util-BgzDEogq.js";import"./InternStatusTag-D-giMvz1.js";import"./CircleSlash-CzPgoa9O.js";import"./XMarkOctagon-BIzVdbJ4.js";import"./Reception-ZXBiRWj6.js";import"./SealCheckmark-CZQr8mWF.js";import"./PersonChat-cd-Hs4sH.js";import"./MagnifyingGlass-EcQhuUJo.js";import"./Dropdown-U89UHwao.js";import"./useControllableState-Cfdz1RLo.js";import"./Popover-2qgb09zf.js";import"./floating-ui.react-S9Semehl.js";import"./Date.Input-DQpYWw0X.js";import"./useFormField-DDhd-sru.js";import"./ChevronDown-BGcv_Viz.js";import"./Modal.context-C6cKfwqx.js";import"./DismissableLayer-CkNNSdhu.js";import"./useDescendant-B0pom2ql.js";import"./useClientLayoutEffect-CPejujR3.js";import"./Pencil-CPpVRgH2.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,tt as default};
