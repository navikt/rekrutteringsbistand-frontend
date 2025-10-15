import{j as s}from"./iframe-D-AjZlUt.js";import{w as d,c as o}from"./ContextDecorators-CWZNzSsI.js";import{V as n}from"./VelgInternStatus-Buotsg00.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Cvi2YthW.js";import"./OrganisasjonsnummerAlert-ZFPNdvhq.js";import"./VStack-D9az6B_P.js";import"./BasePrimitive-ChIiOCuG.js";import"./List-D3lk6ROm.js";import"./Link-8RMWJEmQ.js";import"./KandidatHendelseTag-CqESFpmQ.js";import"./Tag-DZeuvrYI.js";import"./ChatExclamationmark-NpYoxkY_.js";import"./FileXMark-BjXsB-ap.js";import"./Trash-D--eKmsb.js";import"./HandShakeHeart-yrQFOuhb.js";import"./Calendar-CpmEDSNG.js";import"./ThumbUp-C_umlp3p.js";import"./Table-2kctjMPO.js";import"./util-BLaW0wmH.js";import"./format-wxpr1Ccp.js";import"./match-CR1ydbAl.js";import"./parseISO-BCt-OVe7.js";import"./parse-i1bpAfmg.js";import"./getDefaultOptions-Dkji9mRS.js";import"./util-CWQ2JgV5.js";import"./InternStatusTag-d340V7_K.js";import"./CircleSlash-Dpoo_fYJ.js";import"./XMarkOctagon-DhM6FF9k.js";import"./Reception-CBtAh1ZK.js";import"./SealCheckmark-D2PopYVb.js";import"./PersonChat-C603d_6z.js";import"./MagnifyingGlass-BSvkv7T4.js";import"./Dropdown-DC3AHo9e.js";import"./useControllableState-f-tqrQui.js";import"./Popover-tdw4eBt7.js";import"./floating-ui.react-skxVNIuN.js";import"./Date.Input-CjXymNkg.js";import"./useFormField-BkIpqHlH.js";import"./ChevronDown-Canbumtw.js";import"./Modal.context-DFyDwZnZ.js";import"./DismissableLayer-DsLL55K3.js";import"./useDescendant-DSTfsy-A.js";import"./useClientLayoutEffect-GqFZdyJ1.js";import"./Pencil-D_66K7F0.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
