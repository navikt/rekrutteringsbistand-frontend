import{N as s,j as i}from"./iframe-CAw-ouFU.js";import{V as n}from"./VelgInternStatus-B4pBg14D.js";import{w as d,c as o}from"./ContextDecorators-Dtyz0c9y.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CgpxiE9Q.js";import"./Tag-KYDN1iTd.js";import"./CircleSlash-BE8iT8VD.js";import"./XMarkOctagon-DVDv6TGs.js";import"./Reception-C83M-URU.js";import"./SealCheckmark-C8kweI-p.js";import"./PersonChat-CGz0sOYx.js";import"./MagnifyingGlass-C2vK-vTR.js";import"./KandidatlisteContext-DZbPDdFr.js";import"./OrganisasjonsnummerAlert-BTVHVsk8.js";import"./VStack-DmbzPDu2.js";import"./BasePrimitive-DNA_EDjk.js";import"./Box-Dv8Q1uI1.js";import"./List-D-26_DGq.js";import"./Link-nyMi0yzP.js";import"./KandidatHendelseTag-DHT8L6b1.js";import"./ChatExclamationmark-5ROYrAqU.js";import"./FileXMark-DXGCpJdw.js";import"./Trash-BJD9PGNe.js";import"./HandShakeHeart-CJySRICZ.js";import"./Calendar-CxHTABhI.js";import"./ThumbUp-Bo3XgmzN.js";import"./ExclamationmarkTriangle-BN2M502l.js";import"./Table-Bq_P-05h.js";import"./index-Bj4NLN9P.js";import"./index-B40KJ5b4.js";import"./util-Bj1y6LrW.js";import"./Dropdown-CzzpYaHt.js";import"./useControllableState-BkJ0YlGV.js";import"./Popover-tKnqhCZO.js";import"./floating-ui.react-DNmGgPj-.js";import"./Modal.context-CwD_lHOd.js";import"./DismissableLayer-DqRfWjts.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-D6WqdrFI.js";import"./Pencil-DAP5TFQZ.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
