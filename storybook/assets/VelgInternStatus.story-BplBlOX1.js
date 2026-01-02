import{O as s,j as i}from"./iframe-DTWfjzwK.js";import{V as n}from"./VelgInternStatus-Zkk60NrM.js";import{w as d,c as o}from"./ContextDecorators-CR5LBCab.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DPxuOBJJ.js";import"./Tag-C2vE6uVe.js";import"./CircleSlash-D74EwBnN.js";import"./XMarkOctagon-Cxhl4hHp.js";import"./Reception-D8UEsWsv.js";import"./SealCheckmark-Cz29kk1T.js";import"./PersonChat-sAFYVqXE.js";import"./MagnifyingGlass-IvdR4iUW.js";import"./KandidatlisteContext-9j-nByJE.js";import"./OrganisasjonsnummerAlert-DfnnZe-v.js";import"./VStack-CgsrATa5.js";import"./BasePrimitive-DX-eT6RC.js";import"./List-zhRu0RbV.js";import"./Link-oXj3dChs.js";import"./KandidatHendelseTag-UtpQnf23.js";import"./ChatExclamationmark-BF8UDRml.js";import"./FileXMark-DE2jpYqu.js";import"./Trash-C5fcFxY8.js";import"./HandShakeHeart-A_sscZWx.js";import"./Calendar-CISQ762P.js";import"./ThumbUp-BsT8VM0L.js";import"./ExclamationmarkTriangle-DxdM0ej0.js";import"./Table-ChAt4vgz.js";import"./index-CWG33-hS.js";import"./index-B40KJ5b4.js";import"./util-DERHMG49.js";import"./Dropdown-CnokaiwF.js";import"./useControllableState-Dgkk00OW.js";import"./Popover-CXvi6a9y.js";import"./floating-ui.react-BkZ-r5Fb.js";import"./Date.Input-D2qZQohQ.js";import"./useFormField-BCrrrB5u.js";import"./ChevronDown-CUL-96TG.js";import"./Modal.context-CC0zqPZ_.js";import"./DismissableLayer-Ee6nghZx.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BA3EwM4r.js";import"./Pencil-Bd9Nxbvs.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,Y as default};
