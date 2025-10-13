import{j as s}from"./iframe-Ejs43Sks.js";import{w as d,c as o}from"./ContextDecorators-BgKA_hxY.js";import{V as n}from"./VelgInternStatus-BcMfDgxD.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BjpbXg5q.js";import"./OrganisasjonsnummerAlert-fjDuoqIW.js";import"./VStack-CchjVpJ5.js";import"./BasePrimitive-BxpluNwg.js";import"./List-Her9o2HL.js";import"./Link-C9NCChkG.js";import"./KandidatHendelseTag-DiwijmOF.js";import"./Tag-TP6QH-jh.js";import"./FileXMark-DChOUZ4n.js";import"./Trash-Bm0dsz2Z.js";import"./HandShakeHeart-CGufr3rg.js";import"./Calendar-CsD0Nk9_.js";import"./ThumbUp-CUoVvEhw.js";import"./Table-BqaDFad4.js";import"./util-BQ3vDkfm.js";import"./format-BimL1EHc.js";import"./match-LE9LHLKw.js";import"./parseISO-DHy74_RK.js";import"./parse-COTUoLn0.js";import"./getDefaultOptions-B-7UKY3W.js";import"./util-DHJPPEgd.js";import"./InternStatusTag-CQKyGvpR.js";import"./CircleSlash-CiJVATaV.js";import"./XMarkOctagon-Didc1Z_2.js";import"./Reception-Du3doeSi.js";import"./SealCheckmark-DP_A6PYh.js";import"./PersonChat-BOh3FPeW.js";import"./MagnifyingGlass-JVoS0VnF.js";import"./Dropdown-Zpeb1ieM.js";import"./useControllableState-CSEGMF6f.js";import"./Popover-ChDN7_w2.js";import"./floating-ui.react-BwRoqLYP.js";import"./Date.Input-CsFsJtM3.js";import"./useFormField-BMJXgtxV.js";import"./ChevronDown-no_Jq8A9.js";import"./Modal.context-DQr9EoQJ.js";import"./DismissableLayer-DNIg-w_5.js";import"./useDescendant-B3NcaYHB.js";import"./useClientLayoutEffect-CeU_aQpQ.js";import"./Pencil-BZBV7Vk7.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
