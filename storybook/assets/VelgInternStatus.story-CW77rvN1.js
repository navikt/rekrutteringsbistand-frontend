import{av as s,j as i}from"./iframe-D0GwblT9.js";import{w as d,c as o}from"./ContextDecorators-CMebyck5.js";import{V as n}from"./VelgInternStatus-KogMjzjx.js";import"./preload-helper-DoVtK-SO.js";import"./KandidatlisteContext-uZfcIBzt.js";import"./OrganisasjonsnummerAlert-DPiffhI3.js";import"./VStack-DfBEpgKB.js";import"./BasePrimitive-UD7NlCQ0.js";import"./List-BRv2j5Bv.js";import"./Link-D9_Md5d7.js";import"./KandidatHendelseTag-BFY25_C2.js";import"./Tag-CguSApHK.js";import"./FileXMark-BkMS0TzM.js";import"./Trash-CS_c5_23.js";import"./HandShakeHeart-s5_1MJ0t.js";import"./Calendar-ePF77qUm.js";import"./ThumbUp-H-K5QnVH.js";import"./Table-6gCLUur0.js";import"./util-CGf6D49c.js";import"./format-BqKlHFwg.js";import"./match-Bysio2Q7.js";import"./parseISO-D1SCS3cY.js";import"./parse-Dwt_9sBn.js";import"./getDefaultOptions-C4E30K8G.js";import"./util-Dv4KQlRL.js";import"./InternStatusTag-D9nrrP7w.js";import"./CircleSlash-C1LZtduM.js";import"./XMarkOctagon-CHMrRqlF.js";import"./Reception-DliA4V1M.js";import"./SealCheckmark-MHIUy9N0.js";import"./PersonChat-C5m3szyg.js";import"./MagnifyingGlass-sK6X1dVz.js";import"./Dropdown-CRRJdUeN.js";import"./useControllableState-bKZctjKQ.js";import"./Popover-bBjy5hkt.js";import"./floating-ui.react-Br6_DC9v.js";import"./Date.Input-CynUqluh.js";import"./useFormField-BN4HxSCa.js";import"./ChevronDown-B_Sd0WQW.js";import"./Modal.context-DI9DxRcm.js";import"./DismissableLayer-CmDka2Tt.js";import"./useDescendant-C6ZI4kS1.js";import"./useClientLayoutEffect-B_75iQJq.js";import"./Pencil-CmxsqJvV.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
