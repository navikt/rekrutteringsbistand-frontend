import{aK as s,j as i}from"./iframe-Ck33ggOC.js";import{w as d,c as o}from"./ContextDecorators-CZkd3Y3H.js";import{V as n}from"./VelgInternStatus-BV9ciLwI.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bc6BpKxw.js";import"./OrganisasjonsnummerAlert-Bz9aYUJx.js";import"./VStack-CwAdOiJC.js";import"./BasePrimitive-2YXnS0Vq.js";import"./List-CiVDev-F.js";import"./Link-Dhxk3pZY.js";import"./KandidatHendelseTag-Dutu81Gf.js";import"./Tag-CsNFT0pA.js";import"./FileXMark-Dep70K3x.js";import"./Trash-DDSdI9vd.js";import"./HandShakeHeart-DL1szVzF.js";import"./Calendar-kG32Vn-7.js";import"./ThumbUp-sZeUVaqB.js";import"./Table-D378Q1o2.js";import"./util-AkxYbrQx.js";import"./format-UiBtHa0D.js";import"./match-Cd8cmJ-v.js";import"./parse-Diyaa5jl.js";import"./getDefaultOptions-Din5M8Fd.js";import"./parseISO-Dq09H4BU.js";import"./util-DTcs0ln3.js";import"./InternStatusTag-BYN4y2Ci.js";import"./CircleSlash-24Ve2BhK.js";import"./XMarkOctagon-BAT1dRVC.js";import"./Reception-TNBGlrDi.js";import"./SealCheckmark-Cx0ID8wX.js";import"./PersonChat-BGllu84Q.js";import"./MagnifyingGlass-BWXy6qGF.js";import"./Dropdown-DuS9mdSq.js";import"./useControllableState-bKlpX_Tg.js";import"./Popover-CKKWi9_X.js";import"./floating-ui.react-BjZSQk9a.js";import"./Date.Input-XIuiiXeM.js";import"./useFormField-DKMLnyQg.js";import"./ChevronDown-BXAsIZJi.js";import"./Modal.context-DFsOWbmP.js";import"./DismissableLayer-BrxepFl1.js";import"./useDescendant-zDNT2Woo.js";import"./useClientLayoutEffect-xGnZEZAY.js";import"./Pencil-Ceu7g7ew.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,_ as default};
