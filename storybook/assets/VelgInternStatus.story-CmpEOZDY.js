import{aP as s,j as i}from"./iframe-DLVjCQ2l.js";import{w as d,c as o}from"./ContextDecorators-Dnm-aOQQ.js";import{V as n}from"./VelgInternStatus-DgBjoMz1.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DnXuv4rM.js";import"./OrganisasjonsnummerAlert-BASCv5nu.js";import"./VStack-CNzO53zi.js";import"./BasePrimitive-BHJDX4VK.js";import"./List-C4H0QhkM.js";import"./Link-kSfnfcMU.js";import"./KandidatHendelseTag-BSpIpDkA.js";import"./Tag-DE4yt_GY.js";import"./ChatExclamationmark-DfslM3z_.js";import"./FileXMark-DjJMDplT.js";import"./Trash-CeTBXU1c.js";import"./HandShakeHeart-B70TXLGs.js";import"./Calendar-CxpES4B_.js";import"./ThumbUp-D81IWYru.js";import"./Table-D8hHIQY0.js";import"./util-DyTW6BQh.js";import"./format-Dns01ZrX.js";import"./match-DaillBAK.js";import"./parseISO-BHDmYAfo.js";import"./parse-BpBnstiW.js";import"./getDefaultOptions-BS2zLtv_.js";import"./util-BYGRzxdr.js";import"./InternStatusTag-DSK1qpRo.js";import"./CircleSlash-CkjJ7VnH.js";import"./XMarkOctagon-uyVNI2TS.js";import"./Reception-BgucgMox.js";import"./SealCheckmark-zmo8EpcN.js";import"./PersonChat-Bssn2Lwq.js";import"./MagnifyingGlass-BZTgmTDZ.js";import"./Dropdown-mhgKoh4c.js";import"./useControllableState-B7-O95gB.js";import"./Popover-CatbPWux.js";import"./floating-ui.react-BHZzUIMA.js";import"./Date.Input-DLLgFSdx.js";import"./useFormField-DqW3jgUJ.js";import"./ChevronDown-Hp8-5Hl6.js";import"./Modal.context-DC7G_jSK.js";import"./DismissableLayer-TqNl7B5c.js";import"./useDescendant-PZFhHTIi.js";import"./useClientLayoutEffect-DlfPVjcQ.js";import"./Pencil-DZTXeZMB.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
