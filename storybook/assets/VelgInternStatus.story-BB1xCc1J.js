import{j as s}from"./iframe-DLM5HJzs.js";import{w as d,c as o}from"./ContextDecorators-BIVgpaQM.js";import{V as n}from"./VelgInternStatus-DKIpYPMH.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-YgU3m7cz.js";import"./OrganisasjonsnummerAlert-B3pAlU6P.js";import"./VStack-BGMcW3gh.js";import"./BasePrimitive-BbO5zBL-.js";import"./List-0CaM_qXF.js";import"./Link-CPyfir6o.js";import"./KandidatHendelseTag-CbvSE9sM.js";import"./Tag-CEWxUoKE.js";import"./FileXMark-DGFl29ob.js";import"./Trash-BHi_HP9Z.js";import"./HandShakeHeart-CPmZF8O7.js";import"./Calendar-DoFa0WMX.js";import"./ThumbUp-BrAD5jWn.js";import"./Table-DUCgytHE.js";import"./util-CbwIgSqV.js";import"./format-rNpLzPPb.js";import"./match-U-6S0i8L.js";import"./parseISO-DKDnExf9.js";import"./parse-BmrDh6pf.js";import"./getDefaultOptions-C7f7d1ek.js";import"./util-BszRo8_4.js";import"./InternStatusTag-BpnEW71s.js";import"./CircleSlash-CuPEp2P1.js";import"./XMarkOctagon-Cvrh8vzl.js";import"./Reception-CGxF5UIx.js";import"./SealCheckmark-C1y8ZrU3.js";import"./PersonChat-rhuIl7kp.js";import"./MagnifyingGlass-upM9cn9M.js";import"./Dropdown-B0phOQsD.js";import"./useControllableState-DwtBjsve.js";import"./Popover-C6_bBgbP.js";import"./floating-ui.react-B-KeMAa3.js";import"./Date.Input-qr4xnD1C.js";import"./useFormField-DfUHWxa8.js";import"./ChevronDown-DT6wtO4m.js";import"./Modal.context-D3qE7DPQ.js";import"./DismissableLayer-BqwErFhH.js";import"./useDescendant-Bwi08RzL.js";import"./useClientLayoutEffect-BJvFz5xc.js";import"./Pencil-DyVC0CsE.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
