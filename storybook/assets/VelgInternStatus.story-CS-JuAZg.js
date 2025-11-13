import{P as s,j as i}from"./iframe-D36rECNd.js";import{V as n}from"./VelgInternStatus-BRiap7wj.js";import{w as d,c as o}from"./ContextDecorators-DvpPUn6o.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DFwgLkNx.js";import"./Tag-Bc2qo3WD.js";import"./CircleSlash-DrLDKyVR.js";import"./XMarkOctagon-HUYrHB3U.js";import"./Reception-CSAy9kCP.js";import"./SealCheckmark-9TJh6T8e.js";import"./PersonChat-B7a-j7P5.js";import"./MagnifyingGlass-C0Wwp49i.js";import"./KandidatlisteContext-Dq0o6vNi.js";import"./OrganisasjonsnummerAlert-DjNjCHpd.js";import"./VStack-vlL2a3-1.js";import"./BasePrimitive-CsZRqtO4.js";import"./List-Dbmh8xVI.js";import"./Link-B8R0tkWb.js";import"./KandidatHendelseTag-DFOw4G4q.js";import"./ChatExclamationmark-Ba8iKWqc.js";import"./FileXMark-NFwVFiz9.js";import"./Trash-DPEYqurP.js";import"./HandShakeHeart-CIPt3blb.js";import"./Calendar-D34si2k-.js";import"./ThumbUp-Cw11vHuf.js";import"./Table-BMinlwuP.js";import"./util-uRUzvd7T.js";import"./parse-BvzsN-no.js";import"./getDefaultOptions-BlGED2ny.js";import"./parseISO-D8g9glIl.js";import"./index-DirQeSrQ.js";import"./index-B40KJ5b4.js";import"./isBefore-BnhTsP5z.js";import"./util-AnFGb_gx.js";import"./Dropdown-16HbVMtX.js";import"./useControllableState-BKO9CC8z.js";import"./Popover-C8Cma6Gy.js";import"./floating-ui.react-Cwl-MhBg.js";import"./Date.Input-_3ypxCdT.js";import"./useFormField-B2iVjPpq.js";import"./ChevronDown-O8MvsOkm.js";import"./Modal.context-CGOHahkN.js";import"./DismissableLayer-DMTAFfIm.js";import"./useDescendant-2_ilYl57.js";import"./useClientLayoutEffect-BXcMQ-Tq.js";import"./Pencil-Dkuo70J7.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
