import{aP as s,j as i}from"./iframe-BF8BNn-P.js";import{w as d,c as o}from"./ContextDecorators-CWL7Aeo9.js";import{V as n}from"./VelgInternStatus-ubPendYd.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BXJD1A0s.js";import"./OrganisasjonsnummerAlert-IXrNVLwl.js";import"./VStack-CMeQnFcr.js";import"./BasePrimitive-BlsGsg21.js";import"./List-BM9N4mrD.js";import"./Link-DN5m26Rs.js";import"./KandidatHendelseTag-nU4MgnR-.js";import"./Tag-DXp4bEZw.js";import"./ChatExclamationmark-Br8h6JfZ.js";import"./FileXMark-iAfT_WZd.js";import"./Trash-C4_BLZyj.js";import"./HandShakeHeart-B72tsY5W.js";import"./Calendar-_1VseOVU.js";import"./ThumbUp-CsNb83Hv.js";import"./Table-D8vUaOQl.js";import"./util-Pkq9MnMO.js";import"./format-BHNDKqLI.js";import"./match-DiwQH8nR.js";import"./parseISO-euhGvvRy.js";import"./parse-D3BBtSad.js";import"./getDefaultOptions-Bp-ZLzIw.js";import"./util-9-sgCJTZ.js";import"./InternStatusTag-DwBa7J-H.js";import"./CircleSlash-CfMq7xTo.js";import"./XMarkOctagon-CS_oGGLh.js";import"./Reception-B6WdZqsa.js";import"./SealCheckmark-Cf8pGgbz.js";import"./PersonChat-Cn3ooJiU.js";import"./MagnifyingGlass-DZrkTN4Y.js";import"./Dropdown-ByMOf6QC.js";import"./useControllableState-CH5q939z.js";import"./Popover-USnkwSef.js";import"./floating-ui.react-CEZCZn4x.js";import"./Date.Input-C1O_cGqo.js";import"./useFormField-5gDKVoHJ.js";import"./ChevronDown-CQEy5wB2.js";import"./Modal.context-BhhqLRxX.js";import"./DismissableLayer-B6zBYQZd.js";import"./useDescendant-ng3Vo_aV.js";import"./useClientLayoutEffect-CVA0Lj03.js";import"./Pencil-maBziiR8.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
