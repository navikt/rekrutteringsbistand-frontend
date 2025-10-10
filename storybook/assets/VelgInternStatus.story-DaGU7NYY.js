import{j as e}from"./iframe--aQMagBM.js";import{w as o,c as d}from"./ContextDecorators-CqoRcnGw.js";import{V as n}from"./VelgInternStatus-iUvFqx6D.js";import{I as s}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./stillingMock-BtxAEQoL.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./StillingsContext-DZ7500xJ.js";import"./index-DGK8N2bN.js";import"./index-KIHPoeBY.js";import"./stilling.dto-Bhwqemp5.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./stilling-typer-DLlwa7NU.js";import"./startOfDay-lTP3GKUn.js";import"./SWRLaster-CS2y56Xc.js";import"./Feilmelding-DYjOJh_0.js";import"./CopyButton-DSQ0Lkk7.js";import"./Checkmark-2R3Z9HaV.js";import"./Sidelaster-D7OjQVf3.js";import"./KandidatlisteContext-fubJ-EHq.js";import"./OrganisasjonsnummerAlert-Dd25ZFhX.js";import"./VStack-CcHbObW-.js";import"./BasePrimitive-CgaIh8hS.js";import"./List-3rCESo3E.js";import"./Link-BOoQ8up8.js";import"./KandidatHendelseTag-D1ik4fHf.js";import"./Tag-58wlhy8F.js";import"./FileXMark-BqGqkZBh.js";import"./Trash-BqYkRCE7.js";import"./HandShakeHeart-Blgv2ubq.js";import"./Calendar-B-VLWjRU.js";import"./ThumbUp-CTaI1ELg.js";import"./Table-CZNZ724A.js";import"./util-DSiroPk9.js";import"./format-MMJ3lUv3.js";import"./match-D3KjDt9e.js";import"./parseISO-DJIM71K9.js";import"./parse-BHaxN4X0.js";import"./getDefaultOptions-DQ6qo6CG.js";import"./util-BWsvCRGZ.js";import"./InternStatusTag-DvsUI2Ct.js";import"./CircleSlash-4b6GJ6-s.js";import"./XMarkOctagon-Bb_mjrkR.js";import"./Reception-mUPsUtL5.js";import"./SealCheckmark-Clmw8Ogi.js";import"./PersonChat-CTUIEIhF.js";import"./MagnifyingGlass-CWMjpo9Y.js";import"./Dropdown-dEdGRGp-.js";import"./useControllableState-DPhX6gr7.js";import"./Popover-vUNAivkC.js";import"./floating-ui.react-BUPDCv_K.js";import"./Date.Input-DqDzn--5.js";import"./useFormField-BSpkEy74.js";import"./ChevronDown-BMr9GbQT.js";import"./Modal.context-CkHckn2m.js";import"./DismissableLayer-BOzBDZfL.js";import"./useDescendant-Df1-a3qX.js";import"./useClientLayoutEffect-Cz08r_d0.js";import"./Pencil-Bpk4zDdr.js";const ct={tags:["autodocs"],component:n},r={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>o(()=>e.jsx(n,{...t}))},a={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>o(()=>e.jsx(n,{...t}),d({lukket:!0}))},i={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>o(()=>e.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>e.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
