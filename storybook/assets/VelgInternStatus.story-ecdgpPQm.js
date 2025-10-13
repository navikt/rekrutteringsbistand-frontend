import{j as s}from"./iframe-C8Gl0mmh.js";import{w as d,c as o}from"./ContextDecorators-DPiGrqzF.js";import{V as n}from"./VelgInternStatus-DsyOcnIl.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BYtw_0rU.js";import"./OrganisasjonsnummerAlert-CB9Kr7E9.js";import"./VStack-BffUPoxl.js";import"./BasePrimitive-DFjLXfXf.js";import"./List-oZe_goSR.js";import"./Link-st7cyUAe.js";import"./KandidatHendelseTag-C0cN80A6.js";import"./Tag-0a98e10q.js";import"./FileXMark-CQYUGwIo.js";import"./Trash-D9mbKbwf.js";import"./HandShakeHeart-CBkS_T2P.js";import"./Calendar-BOo7kByH.js";import"./ThumbUp-CtUREWQf.js";import"./Table-BLgXToty.js";import"./util-CavAHLKM.js";import"./format-BnHT7mDE.js";import"./match-BKbbZIL-.js";import"./parseISO-Dcg31-h9.js";import"./parse-Cnayn12o.js";import"./getDefaultOptions-LCou5PkA.js";import"./util-D23RsQRc.js";import"./InternStatusTag-Dh6Xqdsb.js";import"./CircleSlash-0fq_FUVp.js";import"./XMarkOctagon-BaDmO39n.js";import"./Reception-Kkxq0Xpv.js";import"./SealCheckmark-D1WHzfF9.js";import"./PersonChat-Cbze-wow.js";import"./MagnifyingGlass-b0eqU1I0.js";import"./Dropdown-CY25hple.js";import"./useControllableState-CTitMRCv.js";import"./Popover-CFXO351a.js";import"./floating-ui.react-DUCUKrYp.js";import"./Date.Input-CymeDj0W.js";import"./useFormField-7Ac9MHU5.js";import"./ChevronDown-jpEGjyLY.js";import"./Modal.context-BSnuQfAZ.js";import"./DismissableLayer-B-uTvNmP.js";import"./useDescendant-Ch9tqvDi.js";import"./useClientLayoutEffect-Ddg3E30Z.js";import"./Pencil-ChhYAf27.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
