import{O as s,j as i}from"./iframe-DQa1UAKP.js";import{V as n}from"./VelgInternStatus-a28m18ZD.js";import{w as d,c as o}from"./ContextDecorators-CBUZbo3p.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CmY7XUKR.js";import"./Tag-BKmTuQ3h.js";import"./CircleSlash-CDc8rj1d.js";import"./XMarkOctagon-BrSp7HmG.js";import"./Reception-BrB26CAh.js";import"./SealCheckmark-Bjeo_mpH.js";import"./PersonChat-BdCOtIVi.js";import"./MagnifyingGlass-DA64r3SH.js";import"./KandidatlisteContext-D94sW2or.js";import"./OrganisasjonsnummerAlert-BBEZJ7v7.js";import"./VStack-PaUjtRpj.js";import"./BasePrimitive-CSzh4H_y.js";import"./List-C0j81Ut8.js";import"./Link-BxG0qBK_.js";import"./KandidatHendelseTag-BswJmHSm.js";import"./ChatExclamationmark-CbWgNG_0.js";import"./FileXMark-Baefk1XC.js";import"./Trash-Kw9Zps5x.js";import"./HandShakeHeart-D3AMzzS3.js";import"./Calendar-CeD7kRJ5.js";import"./ThumbUp-BlBhjBtJ.js";import"./ExclamationmarkTriangle-CFHatZyD.js";import"./Table-oEbQcJVn.js";import"./index-djMLUd9G.js";import"./index-B40KJ5b4.js";import"./util-CxLzg3xj.js";import"./Dropdown-DlYpX8Jy.js";import"./useControllableState-CXsJzE3b.js";import"./Popover-lePLJu2K.js";import"./floating-ui.react-DJuqNH_e.js";import"./Date.Input-gqCIIY8-.js";import"./useFormField-DpwiCcJU.js";import"./ChevronDown-GJKeW2bL.js";import"./Modal.context-duc3HSLS.js";import"./DismissableLayer-BDwDPEkL.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-0SK8t1yY.js";import"./Pencil-DGvs1phf.js";const Y={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
