import{j as s}from"./iframe-D0HnIaN5.js";import{w as d,c as o}from"./ContextDecorators-D0_yNVHX.js";import{V as n}from"./VelgInternStatus-Dvk8lg-b.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CaiTux_G.js";import"./OrganisasjonsnummerAlert-BUiP5WNV.js";import"./VStack-Cwz6rHDN.js";import"./BasePrimitive-DVXlaCRH.js";import"./List-Dkwgn3Gq.js";import"./Link-BuJgBJVq.js";import"./KandidatHendelseTag-HEwqK8Da.js";import"./Tag-BONzrFqA.js";import"./ChatExclamationmark-BZnZ9OfB.js";import"./FileXMark-D5dRoIAY.js";import"./Trash-Cj-kqVJY.js";import"./HandShakeHeart-BXaHNstn.js";import"./Calendar-CY7SvHHg.js";import"./ThumbUp-EXSgiQs3.js";import"./Table-CC0EebB-.js";import"./util-B7WynFbs.js";import"./format-Df3CFIuT.js";import"./match-BdVai8s9.js";import"./parseISO-DO2-pDco.js";import"./parse-BpIyXLCF.js";import"./getDefaultOptions-x-DNWUP6.js";import"./util-BkUCqppR.js";import"./InternStatusTag-BP4p6-gN.js";import"./CircleSlash-Dj1Iir6-.js";import"./XMarkOctagon-TgZD-PUh.js";import"./Reception-DrdvPO8X.js";import"./SealCheckmark-DL-BWzhV.js";import"./PersonChat-rvNXdZ1l.js";import"./MagnifyingGlass-0GM4gd0t.js";import"./Dropdown-CqzrfghG.js";import"./useControllableState-5Raq7Ez2.js";import"./Popover-C8Y09dnG.js";import"./floating-ui.react-Bcl6AuG2.js";import"./Date.Input-B_7i3YvQ.js";import"./useFormField-Cc3d1c1D.js";import"./ChevronDown-DSTHU4Gv.js";import"./Modal.context-D5WfPZho.js";import"./DismissableLayer-Cl9TkozM.js";import"./useDescendant-DDAiNpI0.js";import"./useClientLayoutEffect-BPkG7QrG.js";import"./Pencil-ZSbOo1EG.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
