import{P as s,j as i}from"./iframe-C0grz2Wo.js";import{V as n}from"./VelgInternStatus-Dy_ouQQi.js";import{w as d,c as o}from"./ContextDecorators-DUBg21kn.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-D-pATizV.js";import"./Tag-D0ozGcTA.js";import"./CircleSlash-DdT1Boed.js";import"./XMarkOctagon-Dzde_7gP.js";import"./Reception-DdJEhxJ3.js";import"./SealCheckmark-CbmbL7Rc.js";import"./PersonChat-BIUiFcYK.js";import"./MagnifyingGlass-C6f9XQDi.js";import"./KandidatlisteContext-CuatCgAP.js";import"./OrganisasjonsnummerAlert-BSPi1WiT.js";import"./VStack-iwEBrvXU.js";import"./BasePrimitive-YYZHIQKP.js";import"./List-Crl8BSVz.js";import"./Link-DostjHct.js";import"./KandidatHendelseTag-4Zvjjh9a.js";import"./ChatExclamationmark-BpPx1dnv.js";import"./FileXMark-C5WGqYyK.js";import"./Trash-BAy9I17o.js";import"./HandShakeHeart--RsNg5xC.js";import"./Calendar-B1UDYawr.js";import"./ThumbUp-CNdSxRt5.js";import"./Table-CDqAcG_J.js";import"./util-Ctc1EFpw.js";import"./parse-BNQC4k6h.js";import"./getDefaultOptions-B0HTFzI0.js";import"./parseISO-Du2aHfBC.js";import"./index-CBObkYOP.js";import"./index-B40KJ5b4.js";import"./isBefore-OXYI8Ltq.js";import"./util-CPaU3JU5.js";import"./Dropdown-LQbqLw-S.js";import"./useControllableState-B8wREkvX.js";import"./Popover-DoEn5eVj.js";import"./floating-ui.react-DeVAIk4J.js";import"./Date.Input-CVFQR35B.js";import"./useFormField-BJjBkOln.js";import"./ChevronDown-DjL2dQ1d.js";import"./Modal.context-DE4oVxi7.js";import"./DismissableLayer-BJgHtaOA.js";import"./useDescendant-DKfYsh9H.js";import"./useClientLayoutEffect-CtS8pgi2.js";import"./Pencil-DRbiS5Zv.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
