import{Y as s,j as i}from"./iframe-CkXwiOco.js";import{V as n}from"./VelgInternStatus-BiAjeMsF.js";import{w as d,c as o}from"./ContextDecorators-DmqPFGEm.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DKgVRXMA.js";import"./Tag-qHxTQz7s.js";import"./CircleSlash-N7CHUmcY.js";import"./XMarkOctagon-DrhG3Ssu.js";import"./Reception-CLq7UJJQ.js";import"./SealCheckmark-DlPvDq3G.js";import"./PersonChat-CcGxhU55.js";import"./MagnifyingGlass-CXOs1YkS.js";import"./KandidatlisteContext-DtOCfj4G.js";import"./OrganisasjonsnummerAlert-C8tSdnIi.js";import"./VStack-JNDCCjJP.js";import"./BasePrimitive-D7804odP.js";import"./List-ZBexDUX1.js";import"./Link-CKbZ3XZg.js";import"./KandidatHendelseTag-DyaZCOwo.js";import"./ChatExclamationmark-B7WMmAvI.js";import"./FileXMark-LvRGHOt7.js";import"./Trash-iId3LJot.js";import"./HandShakeHeart-ePZKpLk3.js";import"./Calendar-D-qcCiQb.js";import"./ThumbUp-BFGcaxts.js";import"./Table-B_b5D6yB.js";import"./index-B_Gmig1n.js";import"./index-B40KJ5b4.js";import"./util-DN9Wte-k.js";import"./Dropdown-Y0wLcvRE.js";import"./useControllableState-CyMfcbpD.js";import"./Popover-Cb54VGaA.js";import"./floating-ui.react-DsSZBiJ6.js";import"./Date.Input-B5_L8H_W.js";import"./useFormField-Rq_gcKQ5.js";import"./ChevronDown-D3-xymWN.js";import"./Modal.context-B5bY_3Nt.js";import"./DismissableLayer-B8alNiQB.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DK3ALoYQ.js";import"./Pencil-Br6Avq3h.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,W as default};
