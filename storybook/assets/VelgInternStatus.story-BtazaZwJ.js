import{W as s,j as i}from"./iframe-rYPfMBZN.js";import{V as n}from"./VelgInternStatus-AsyvsMKv.js";import{w as d,c as o}from"./ContextDecorators-BmLgTRAj.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-sqct2myD.js";import"./Tag-D1HC3pBs.js";import"./CircleSlash-CVacucUB.js";import"./XMarkOctagon-DX7LDZD0.js";import"./Reception-CijBSgm8.js";import"./SealCheckmark-iV04fFJe.js";import"./PersonChat-C5YC_rIz.js";import"./MagnifyingGlass-0rrI0phK.js";import"./KandidatlisteContext-CRs4GM_E.js";import"./OrganisasjonsnummerAlert-5FZV-rbs.js";import"./VStack-Dz8JjFOb.js";import"./BasePrimitive-BjjeF53e.js";import"./List-RRGcFP05.js";import"./Link-C4T7rFE7.js";import"./KandidatHendelseTag-DhnFAsz8.js";import"./ChatExclamationmark-BbdR5dOM.js";import"./FileXMark-wIvuJboS.js";import"./Trash-Rii4rBtB.js";import"./HandShakeHeart-BWHURL8t.js";import"./Calendar-D_VD61zK.js";import"./ThumbUp-BptVK7Yp.js";import"./Table-Du570W8P.js";import"./dato-SoR29OEJ.js";import"./parse-Cl8XmbO4.js";import"./getDefaultOptions-D9iGir7p.js";import"./parseISO-BbVHBu92.js";import"./index-C65XzgtL.js";import"./index-B40KJ5b4.js";import"./util-BOIkYAu6.js";import"./Dropdown-BIPJm_sH.js";import"./useControllableState-mFgUgRJs.js";import"./Popover-B7eiM7Ev.js";import"./floating-ui.react-BmyHG_a9.js";import"./Date.Input-BERDNUCe.js";import"./useFormField-BMrBnHTm.js";import"./ChevronDown-HMna1nBJ.js";import"./Modal.context-B4QjZZ9Z.js";import"./DismissableLayer-C3TXeR6u.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DZErODHj.js";import"./Pencil-BbKj2ThV.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
