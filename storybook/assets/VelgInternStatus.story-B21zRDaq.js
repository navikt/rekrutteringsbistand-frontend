import{j as s}from"./iframe-DqJRNx3n.js";import{w as d,c as o}from"./ContextDecorators-B4FEwfyT.js";import{V as n}from"./VelgInternStatus-D1UCgQGk.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DBodQ88Z.js";import"./OrganisasjonsnummerAlert-2WsOPBxl.js";import"./VStack-Bzt5O0Ob.js";import"./BasePrimitive-C_fZN70E.js";import"./List-DL3P5Adp.js";import"./Link-vbFTSF6p.js";import"./KandidatHendelseTag-C8ZrNbqQ.js";import"./Tag-CdzBWLX7.js";import"./ChatExclamationmark-CifTOoWX.js";import"./FileXMark-DDNeYG5a.js";import"./Trash-BtlWEImD.js";import"./HandShakeHeart-DA2F0YaJ.js";import"./Calendar-FOMeQGCY.js";import"./ThumbUp-nyqS1UnX.js";import"./Table-Chsu3JEo.js";import"./util-uFbpsyro.js";import"./format-CmVE1JG2.js";import"./match-C6anMTib.js";import"./parseISO-CvEsX_L5.js";import"./parse-CsmLlHYT.js";import"./getDefaultOptions-AEHnyEeC.js";import"./util-DaWp_MSb.js";import"./InternStatusTag-BlNRryyV.js";import"./CircleSlash-CNX1zDoE.js";import"./XMarkOctagon-D6gSlGYe.js";import"./Reception-CCBdc9HE.js";import"./SealCheckmark-CJSlKMg9.js";import"./PersonChat-DWRgsUAE.js";import"./MagnifyingGlass-CocJCssp.js";import"./Dropdown-8BmJd8Cg.js";import"./useControllableState-CnvriwM8.js";import"./Popover-RV2ZcE6m.js";import"./floating-ui.react-DVt4jXQS.js";import"./Date.Input-CkDEJ0oN.js";import"./useFormField-Bu_TghDM.js";import"./ReadMore-4bCwEmkG.js";import"./ChevronDown-XyExX-L0.js";import"./Modal.context-Bay7RcM8.js";import"./DismissableLayer-Ht21I4At.js";import"./useDescendant-DEQCdmE3.js";import"./useClientLayoutEffect-CzmYKYFM.js";import"./Pencil-5kyzIJDd.js";const rt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,rt as default};
