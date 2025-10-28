import{Y as s,j as i}from"./iframe-Dc4kNGne.js";import{w as d,c as o}from"./ContextDecorators-CkB1BqmA.js";import{V as n}from"./VelgInternStatus-ccYXIFeb.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BD9hT32I.js";import"./OrganisasjonsnummerAlert-BdUwOAPw.js";import"./VStack-CAyaVyw0.js";import"./BasePrimitive-D4zqyJIf.js";import"./List-Dyxs_JCW.js";import"./Link-C_rbyaAd.js";import"./KandidatHendelseTag-PnBwwGp6.js";import"./Tag-B8f9oEtQ.js";import"./ChatExclamationmark-CAfBq3z7.js";import"./FileXMark-DqPsfHxv.js";import"./Trash-CcVYippy.js";import"./HandShakeHeart-3qVuOYbM.js";import"./Calendar-BPwIt6xQ.js";import"./ThumbUp-DVMCkmxK.js";import"./Table-DICHcfDi.js";import"./util-DybQ6GFM.js";import"./format-Dy54t0JC.js";import"./match-DW3BXZFb.js";import"./parse-BVEnNKgt.js";import"./getDefaultOptions-B3ByGOpu.js";import"./parseISO-CGoO-hx7.js";import"./index-B0NViYym.js";import"./index-B40KJ5b4.js";import"./isBefore-1PECHI9n.js";import"./util-CR9k7jeF.js";import"./InternStatusTag-qrQAOx3J.js";import"./CircleSlash-CQCxalbX.js";import"./XMarkOctagon-b_oXltUn.js";import"./Reception-CimDX6wO.js";import"./SealCheckmark-8EnfIrak.js";import"./PersonChat-CuhGzNao.js";import"./MagnifyingGlass-ClbT5Pcy.js";import"./Dropdown-BkQeg0Hu.js";import"./useControllableState-idObFdbI.js";import"./Popover-BxpRsbtW.js";import"./floating-ui.react-yYtpfu_G.js";import"./Date.Input-BWsdgrzB.js";import"./useFormField-HIpxu0nw.js";import"./ChevronDown-DN-Romwj.js";import"./Modal.context-D4sW2lKa.js";import"./DismissableLayer-Bvg8CO6L.js";import"./useDescendant-CMJ867Hz.js";import"./useClientLayoutEffect-CxfS0aD3.js";import"./Pencil-a34C9K8N.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,et as default};
