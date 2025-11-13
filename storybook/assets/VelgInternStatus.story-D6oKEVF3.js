import{P as s,j as i}from"./iframe-BNj3Trp7.js";import{V as n}from"./VelgInternStatus-Cwa3krgk.js";import{w as d,c as o}from"./ContextDecorators-kA7FkkqF.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-BKtRnSgG.js";import"./Tag-QE-oNjx8.js";import"./CircleSlash-CjPtn876.js";import"./XMarkOctagon-BzmPHj23.js";import"./Reception-xyenI8Pv.js";import"./SealCheckmark-0mGIyb1K.js";import"./PersonChat-Dev7hNKl.js";import"./MagnifyingGlass-D7E_w7jw.js";import"./KandidatlisteContext-dJsyfxMF.js";import"./OrganisasjonsnummerAlert-DA6HqLLK.js";import"./VStack-DI5FtL9d.js";import"./BasePrimitive-Cu5t_Mba.js";import"./List-Cr7cy7SP.js";import"./Link-Bn5t7p2T.js";import"./KandidatHendelseTag-CD3_3PBM.js";import"./ChatExclamationmark-DzcHPT0m.js";import"./FileXMark-DzHm9-jj.js";import"./Trash-By5WJppC.js";import"./HandShakeHeart-DIGmqrBd.js";import"./Calendar-B98hgnWw.js";import"./ThumbUp-KmzGg11Q.js";import"./Table-DXLxzRW2.js";import"./util-DoihbPMg.js";import"./parse-D07axElW.js";import"./getDefaultOptions-Db9cQ1D8.js";import"./parseISO-Dgrq-wQz.js";import"./index-DXeB4KUX.js";import"./index-B40KJ5b4.js";import"./isBefore-CkOQlVm0.js";import"./util-BlQdQcUP.js";import"./Dropdown-Cx9WucaE.js";import"./useControllableState-CDlVFmtE.js";import"./Popover-BA7ZM1x5.js";import"./floating-ui.react-BgmN6yPa.js";import"./Date.Input-Gox3oCUD.js";import"./useFormField-Dq2bFYNe.js";import"./ChevronDown-za9Zk1IQ.js";import"./Modal.context-C8x_SuV6.js";import"./DismissableLayer-C4HytRU8.js";import"./useDescendant-C0oyiaZY.js";import"./useClientLayoutEffect-DH9bhr_K.js";import"./Pencil-Scx6YnXg.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
