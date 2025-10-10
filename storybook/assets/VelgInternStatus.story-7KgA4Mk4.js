import{j as s}from"./iframe-CW8P7ZDD.js";import{w as d,c as o}from"./ContextDecorators-CxK81On7.js";import{V as n}from"./VelgInternStatus-CuKQP7hI.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BNt4D00F.js";import"./OrganisasjonsnummerAlert-COtk6STB.js";import"./VStack-C0LveroH.js";import"./BasePrimitive-LrKddP1X.js";import"./List-C5ud_jms.js";import"./Link-CYWdiJz0.js";import"./KandidatHendelseTag-Dv9fdVNj.js";import"./Tag-GPd71jaQ.js";import"./FileXMark-Cxi9OgYo.js";import"./Trash-CTkszNqu.js";import"./HandShakeHeart-D_9gg13F.js";import"./Calendar-Dd214z57.js";import"./ThumbUp-CVcHopFw.js";import"./Table-CDmQ_lSP.js";import"./util-DuktEjlu.js";import"./format-BGF-tAX-.js";import"./match-Bz7OQ0zI.js";import"./parseISO-CcmPCjvl.js";import"./parse-DnIwr0rg.js";import"./getDefaultOptions-D7nGWO2p.js";import"./util-CK1D1wS9.js";import"./InternStatusTag-ClMChwUh.js";import"./CircleSlash-BONHtX9p.js";import"./XMarkOctagon-Cg0bIHo2.js";import"./Reception-C7SVrZSB.js";import"./SealCheckmark-D_Dn-5PM.js";import"./PersonChat-Ca3ZU4sb.js";import"./MagnifyingGlass-CcdQD_8J.js";import"./Dropdown-D7bmGXti.js";import"./useControllableState-lWfKsWES.js";import"./Popover-C6NwmW2P.js";import"./floating-ui.react-Dp2W39BI.js";import"./Date.Input-BxC2c25T.js";import"./useFormField-9cHrvR0I.js";import"./ChevronDown-90OG85yH.js";import"./Modal.context-7M0gvZj4.js";import"./DismissableLayer-2CrgPHwV.js";import"./useDescendant-BABlK5yx.js";import"./useClientLayoutEffect-CeFXz8eE.js";import"./Pencil-CCDyJFma.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
