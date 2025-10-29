import{P as s,j as i}from"./iframe-BvvhrRbe.js";import{w as d,c as o}from"./ContextDecorators-BY2RNcot.js";import{V as n}from"./VelgInternStatus-BhdLueNe.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BQlVPf0v.js";import"./OrganisasjonsnummerAlert-BwxqIh6L.js";import"./VStack-H-QHo1Lk.js";import"./BasePrimitive-D8FPQ7k9.js";import"./List-Cn_jzuTP.js";import"./Link-CsrhpwZn.js";import"./KandidatHendelseTag-uqkaD8lH.js";import"./Tag-SkBtSqZW.js";import"./ChatExclamationmark-Ci-T-MCf.js";import"./FileXMark-CnCHTgdq.js";import"./Trash-BFc3IcOH.js";import"./HandShakeHeart-CkRPZYE4.js";import"./Calendar-B6MdUGZp.js";import"./ThumbUp-CwHeVLTC.js";import"./Table-BM4dW861.js";import"./util-n1hQ2AEe.js";import"./parse-D8BXf2p8.js";import"./getDefaultOptions-Dik-T2FL.js";import"./parseISO-C5Lmk-lV.js";import"./index-DvcJyemQ.js";import"./index-B40KJ5b4.js";import"./isBefore-COw2UKUc.js";import"./util-IxlLFe_4.js";import"./InternStatusTag-GeTCgigd.js";import"./CircleSlash-CWurDYZB.js";import"./XMarkOctagon-MapLulD8.js";import"./Reception-C0BEIObS.js";import"./SealCheckmark-4NqyEoQu.js";import"./PersonChat-CPgu8rmK.js";import"./MagnifyingGlass-CogUwW66.js";import"./Dropdown-CMaTd6To.js";import"./useControllableState-B5f92340.js";import"./Popover-CuKkbNsW.js";import"./floating-ui.react-BfNC0LZR.js";import"./Date.Input-DBxx4b9_.js";import"./useFormField-C83omxTl.js";import"./ChevronDown-C6Y4QFb6.js";import"./Modal.context-BcwzVHgg.js";import"./DismissableLayer-DHzi24Js.js";import"./useDescendant-y-KejPye.js";import"./useClientLayoutEffect-KrIuP9uz.js";import"./Pencil-DpzkXWuW.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,at as default};
