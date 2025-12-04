import{Y as s,j as i}from"./iframe-ltj2aPP9.js";import{V as n}from"./VelgInternStatus-D6Zm6nTF.js";import{w as d,c as o}from"./ContextDecorators-D6qExaiD.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DcZreMCl.js";import"./Tag-BzUY9-pL.js";import"./CircleSlash-rxjbokIl.js";import"./XMarkOctagon-ClPZ0sAe.js";import"./Reception-Ebe9MzCN.js";import"./SealCheckmark-CRSGzOvp.js";import"./PersonChat-DAPRnPBk.js";import"./MagnifyingGlass-sUT8b3Hz.js";import"./KandidatlisteContext-Bl_o9k3N.js";import"./OrganisasjonsnummerAlert-CkVXuvDD.js";import"./VStack-Su87Bwfs.js";import"./BasePrimitive-dde3mTwe.js";import"./List-tyYrlZes.js";import"./Link-zi2EHXXv.js";import"./KandidatHendelseTag-BcGnWwtG.js";import"./ChatExclamationmark-bF_GK_lt.js";import"./FileXMark-CYEnjTew.js";import"./Trash-BEDJZQnM.js";import"./HandShakeHeart-CsIpL-Ei.js";import"./Calendar-DpqY7Kck.js";import"./ThumbUp-P1915iXc.js";import"./Table-DCGlJnPG.js";import"./index-BEB9CuG0.js";import"./index-B40KJ5b4.js";import"./util-LWEoSltv.js";import"./Dropdown-D6lW_pL3.js";import"./useControllableState-CWWYUZqw.js";import"./Popover-aLcq3lA6.js";import"./floating-ui.react-CkKTAyWh.js";import"./Date.Input-CTrs6ap6.js";import"./useFormField-FqjO8I_3.js";import"./ChevronDown-Dvjup_Q5.js";import"./Modal.context-bjbVzsec.js";import"./DismissableLayer-B4bLkyQP.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Cfpp74B7.js";import"./Pencil-DugV01JO.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
