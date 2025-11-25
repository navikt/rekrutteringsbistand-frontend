import{X as s,j as i}from"./iframe-BQ1incyN.js";import{V as n}from"./VelgInternStatus-CKB-j6bW.js";import{w as d,c as o}from"./ContextDecorators-nyw5vzQY.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-Bz9VYVlT.js";import"./Tag-gSVS37K-.js";import"./CircleSlash-D0jSrb4D.js";import"./XMarkOctagon-BAu_hAV9.js";import"./Reception-Dx4mmF9N.js";import"./SealCheckmark-BXOuCWUo.js";import"./PersonChat-CMPrZQR7.js";import"./MagnifyingGlass-BOknmiUh.js";import"./KandidatlisteContext-DoO6N6oX.js";import"./OrganisasjonsnummerAlert-Cs86EzpO.js";import"./VStack-CvGDILKu.js";import"./BasePrimitive-Dp_sZ_R1.js";import"./List-D5JbiyOp.js";import"./Link-Cat3nivg.js";import"./KandidatHendelseTag-Ao-jlGQL.js";import"./ChatExclamationmark-BNLsPpWq.js";import"./FileXMark-TcpzfMVv.js";import"./Trash-DsI7uFmt.js";import"./HandShakeHeart-BhbsEHFh.js";import"./Calendar-BuzM5afZ.js";import"./ThumbUp-n9uTjeI6.js";import"./Table-CgI_5wIF.js";import"./index-CVFFzUnD.js";import"./index-B40KJ5b4.js";import"./util-DeXtxzd9.js";import"./Dropdown-BwDRlHEp.js";import"./useControllableState-BQTyOv-Y.js";import"./Popover-BSQcvOJK.js";import"./floating-ui.react-Db4ep1Lb.js";import"./Date.Input-Clh3TNqh.js";import"./useFormField-BJ9N13rj.js";import"./ChevronDown-DFqnftke.js";import"./Modal.context-BQ3LJgn_.js";import"./DismissableLayer-CujSqPxa.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BWyBD_to.js";import"./Pencil-CPy6frH1.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
