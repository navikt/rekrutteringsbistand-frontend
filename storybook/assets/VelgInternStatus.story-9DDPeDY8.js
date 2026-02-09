import{N as s,j as i}from"./iframe-BA8NGl8Z.js";import{V as n}from"./VelgInternStatus-lYJBdsMY.js";import{w as d,c as o}from"./ContextDecorators-ChcCfxsU.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag--LpNGO_b.js";import"./Tag-DJO1ZEnS.js";import"./CircleSlash-hr5OEWLL.js";import"./XMarkOctagon-DujyuBb0.js";import"./Reception-CE0nagWp.js";import"./SealCheckmark-SJKLgnE_.js";import"./PersonChat-DlI5QIzh.js";import"./MagnifyingGlass-Di_huDvS.js";import"./KandidatlisteContext-CxoF-fzq.js";import"./OrganisasjonsnummerAlert-Dkf9eg_y.js";import"./VStack-Kc3uDync.js";import"./BasePrimitive-DVQzxbgB.js";import"./Box-QiYsNTYh.js";import"./List-BLBE283a.js";import"./Link-DuDyUj0y.js";import"./KandidatHendelseTag-Dxvy0j_v.js";import"./ChatExclamationmark-CIA0LWMm.js";import"./FileXMark-BF3VFzMY.js";import"./Trash-D5CVVktL.js";import"./HandShakeHeart-BbCuuX07.js";import"./Calendar-BtfCCLae.js";import"./ThumbUp-Bu5VGlTV.js";import"./ExclamationmarkTriangle-DTZLN61C.js";import"./Table-b9WZVWIS.js";import"./index-DC2vRRA7.js";import"./index-B40KJ5b4.js";import"./util-Cn0sHhFJ.js";import"./Dropdown-BO54EVhb.js";import"./useControllableState-BKzc71DB.js";import"./Popover-D8rwaXd8.js";import"./floating-ui.react-6WPeK0Ep.js";import"./Modal.context-Cgdz-tcK.js";import"./DismissableLayer-hP1yz2kw.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CiWpgXLp.js";import"./Pencil-CZYzuOZO.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
