import{Y as s,j as i}from"./iframe-DZidc6ne.js";import{V as n}from"./VelgInternStatus-OAaA47OO.js";import{w as d,c as o}from"./ContextDecorators-6Nl0HuAJ.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BCE6mX7b.js";import"./Tag-CJ_ullEH.js";import"./CircleSlash-Q9TPWKJg.js";import"./XMarkOctagon-CMFQ0s0D.js";import"./Reception-CYGBUvgt.js";import"./SealCheckmark-CpF3cc8G.js";import"./PersonChat-DrKJT0Pz.js";import"./MagnifyingGlass-4fVULbJ3.js";import"./KandidatlisteContext-XXfOC6Ua.js";import"./OrganisasjonsnummerAlert-KIBS92ps.js";import"./VStack-CT35bcBK.js";import"./BasePrimitive-DGGTuBQu.js";import"./List-Gkk8Lnu_.js";import"./Link-Bxi8Cnjn.js";import"./KandidatHendelseTag-CDMJayi4.js";import"./ChatExclamationmark-Yizz6DWz.js";import"./FileXMark-1hih9fuA.js";import"./Trash-CDbBnfx-.js";import"./HandShakeHeart-BcmZNNpe.js";import"./Calendar-CPHCr-VW.js";import"./ThumbUp-Cy7GuqiG.js";import"./Table-CTmqYVAw.js";import"./index-BzqkoKl8.js";import"./index-B40KJ5b4.js";import"./util-Bbk_Wzm7.js";import"./Dropdown-Dazfdvxk.js";import"./useControllableState-d5QaYALg.js";import"./Popover-B4ShxoPo.js";import"./floating-ui.react-DFMGLDtM.js";import"./Date.Input-B65l9rmO.js";import"./useFormField-CwgffQtB.js";import"./ChevronDown-CGg0Kr-2.js";import"./Modal.context-tifpMkeE.js";import"./DismissableLayer-CDRd_4R5.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-vxo5oBkf.js";import"./Pencil-BFiEL-pQ.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
