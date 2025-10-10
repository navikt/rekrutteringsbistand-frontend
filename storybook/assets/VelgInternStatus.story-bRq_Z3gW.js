import{j as e}from"./iframe-CHkTVuiI.js";import{w as o,c as d}from"./ContextDecorators-CrAQ9Hc9.js";import{V as n}from"./VelgInternStatus-UNqPsQl8.js";import{I as s}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./stillingMock-BtxAEQoL.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./StillingsContext-BqLSlB_O.js";import"./index-BvQF28vZ.js";import"./index-BR16nd7K.js";import"./stilling.dto--v9AHxlS.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./stilling-typer-DLlwa7NU.js";import"./startOfDay-lTP3GKUn.js";import"./SWRLaster-177d91rz.js";import"./Feilmelding-DgHAx26V.js";import"./CopyButton-CS4PChRX.js";import"./Checkmark-PV8AZsuh.js";import"./Sidelaster-KVwuK41U.js";import"./KandidatlisteContext-SOk_um48.js";import"./OrganisasjonsnummerAlert-DUcHHBz-.js";import"./VStack-M98BC8vl.js";import"./BasePrimitive-DioXofnN.js";import"./List-VkKHJD8N.js";import"./Link-CkfGG5-p.js";import"./KandidatHendelseTag-BiX-vV5K.js";import"./Tag-CCAWPPV3.js";import"./FileXMark-f5rkYKOY.js";import"./Trash-DFUkDF32.js";import"./HandShakeHeart-e31V6fSB.js";import"./Calendar-XriZ9M4u.js";import"./ThumbUp-DwHzK9pn.js";import"./Table-DR-zuF53.js";import"./util-B4fxBsP7.js";import"./format-CiL1qK_N.js";import"./match-Cit0idUw.js";import"./parseISO-DJIM71K9.js";import"./parse-CabpiR_f.js";import"./getDefaultOptions-CKIF9KYI.js";import"./util-CPu6-ApK.js";import"./InternStatusTag-D2nleNoX.js";import"./CircleSlash-DK05zYub.js";import"./XMarkOctagon-Cd2xkFsc.js";import"./Reception-n2v-qT7o.js";import"./SealCheckmark-CLCJvAdU.js";import"./PersonChat-DO-t4_kT.js";import"./MagnifyingGlass-s_lUdSlL.js";import"./Dropdown-CvLmTYFW.js";import"./useControllableState-R0yyGfAK.js";import"./Popover-Dk00ZMmE.js";import"./floating-ui.react-B8XfV_lm.js";import"./Date.Input-BR2zdpiX.js";import"./useFormField-D38t1t5q.js";import"./ChevronDown-BGLJuQ6d.js";import"./Modal.context-B54ogbif.js";import"./DismissableLayer-DYYB3_kD.js";import"./useDescendant-BzIJZVOm.js";import"./useClientLayoutEffect-Dno45Y9E.js";import"./Pencil-CN6Mv-uF.js";const ct={tags:["autodocs"],component:n},r={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>o(()=>e.jsx(n,{...t}))},a={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>o(()=>e.jsx(n,{...t}),d({lukket:!0}))},i={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>o(()=>e.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>e.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'kandidatnr-1',
    status: InternKandidatstatus.VURDERES,
    lukketKandidatliste: false
  },
  render: args => withStillingsKandidatliste(() => <VelgInternStatus {...args} />)
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'kandidatnr-1',
    status: InternKandidatstatus.AKTUELL,
    lukketKandidatliste: true
  },
  render: args => withStillingsKandidatliste(() => <VelgInternStatus {...args} />, createKandidatlisteMock({
    lukket: true
  }))
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatnr: 'dummy',
    status: InternKandidatstatus.VURDERES,
    lukketKandidatliste: false
  },
  render: () => withStillingsKandidatliste(() => <div className='flex flex-col gap-4'>
        {Object.values(InternKandidatstatus).map(s => <VelgInternStatus key={s} kandidatnr={\`kandidat-\${s}\`} status={s} lukketKandidatliste={false} />)}
      </div>)
}`,...i.parameters?.docs?.source}}};export{i as FlereStatuser,a as LukketListe,r as Vurderes,ct as default};
