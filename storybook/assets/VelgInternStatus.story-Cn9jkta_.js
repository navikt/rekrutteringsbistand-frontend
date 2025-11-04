import{P as s,j as i}from"./iframe-DSdiPFC4.js";import{V as n}from"./VelgInternStatus-en78Zj_n.js";import{w as d,c as o}from"./ContextDecorators-2vZvGnDC.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CrbpnBom.js";import"./Tag-BKjvMUME.js";import"./CircleSlash-cHCkwhzI.js";import"./XMarkOctagon-F0jMCeY6.js";import"./Reception-RsVi6_TS.js";import"./SealCheckmark-DsJweFCi.js";import"./PersonChat-D0AMNMOP.js";import"./MagnifyingGlass-DLyM0T6m.js";import"./KandidatlisteContext-CgGB5biJ.js";import"./OrganisasjonsnummerAlert-CMVFtpnf.js";import"./VStack-BKWn7tAl.js";import"./BasePrimitive-Cc8_GDs4.js";import"./List-D_w4sZva.js";import"./Link-CrwxxI2t.js";import"./KandidatHendelseTag-Da4GVXSl.js";import"./ChatExclamationmark-CGmhGL4Y.js";import"./FileXMark-B2tyAkuC.js";import"./Trash-D0HP6bXj.js";import"./HandShakeHeart-D1Qn10_8.js";import"./Calendar-BQUt9BSr.js";import"./ThumbUp-CH6u07Mi.js";import"./Table-DY_fPu8p.js";import"./util-BarDoa7A.js";import"./parse-C7Wk-VNn.js";import"./getDefaultOptions-qYycqK5j.js";import"./parseISO-CPzjlZB_.js";import"./index-CgRHCvDs.js";import"./index-B40KJ5b4.js";import"./isBefore-zdELsJL0.js";import"./util-Boj8vsL6.js";import"./Dropdown-D2htL2VT.js";import"./useControllableState-CrxLrzqj.js";import"./Popover-XblZkPaX.js";import"./floating-ui.react-IxecFUMB.js";import"./Date.Input-Ba7efxI3.js";import"./useFormField-B6f4Ik1o.js";import"./ChevronDown-ScfmwSwc.js";import"./Modal.context-qHNJI2Qp.js";import"./DismissableLayer-CxvVRpgD.js";import"./useDescendant-CnVxbVRh.js";import"./useClientLayoutEffect-kMRoI8rq.js";import"./Pencil-iv7TAWb-.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
