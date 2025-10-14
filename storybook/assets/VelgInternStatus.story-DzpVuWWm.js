import{j as s}from"./iframe-B0cNm80T.js";import{w as d,c as o}from"./ContextDecorators-rWs2WyLp.js";import{V as n}from"./VelgInternStatus-CPmGFolW.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-lKcZdIDi.js";import"./OrganisasjonsnummerAlert-By0RKHGl.js";import"./VStack-psTiiBW2.js";import"./BasePrimitive-Dnjwyk_L.js";import"./List-CwgKauhL.js";import"./Link-CvjagGWj.js";import"./KandidatHendelseTag-C5ff4Ain.js";import"./Tag-BBfBa6uK.js";import"./ChatExclamationmark-DogGhrjI.js";import"./FileXMark-260EKdwe.js";import"./Trash-DngtWOea.js";import"./HandShakeHeart-Buew0_gz.js";import"./Calendar-B6sM_WIj.js";import"./ThumbUp-DXn5sJq9.js";import"./Table--dP5e_vE.js";import"./util-CAU_umkw.js";import"./format-DaA7nAok.js";import"./match-B6SzKG0i.js";import"./parseISO-cg8KmGPa.js";import"./parse--eY5Mgca.js";import"./getDefaultOptions-U4OPOZza.js";import"./util-BOeZlekJ.js";import"./InternStatusTag-BGOb2woB.js";import"./CircleSlash-D8e8t69m.js";import"./XMarkOctagon-BYVt7-gR.js";import"./Reception-CHa4RqXJ.js";import"./SealCheckmark-C0Cszarr.js";import"./PersonChat-RcZXm9ar.js";import"./MagnifyingGlass-C6uJOV5H.js";import"./Dropdown-CW4q7B4m.js";import"./useControllableState-BJDZ-eZz.js";import"./Popover-Co1F7jVW.js";import"./floating-ui.react-b-pUd3Lp.js";import"./Date.Input-CEBq0Klp.js";import"./useFormField-1AfxlixV.js";import"./ChevronDown-DdRd8IuF.js";import"./Modal.context-B_Ji0Bce.js";import"./DismissableLayer-BmNMxcQk.js";import"./useDescendant-BdOm-UzU.js";import"./useClientLayoutEffect-Rd30x-G4.js";import"./Pencil-CaALIL-I.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
