import{aP as s,j as i}from"./iframe-pQ4IQbGd.js";import{w as d,c as o}from"./ContextDecorators-BtQxLkw0.js";import{V as n}from"./VelgInternStatus-C9ILFptw.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-QnKNStzm.js";import"./OrganisasjonsnummerAlert-7NDzGfnf.js";import"./VStack-DCwu5_pW.js";import"./BasePrimitive-Db3km7WY.js";import"./List-CRwxmV1Z.js";import"./Link-Cx_LZd61.js";import"./KandidatHendelseTag-DUUh8yuE.js";import"./Tag-D1pqY_tH.js";import"./FileXMark-B_5gfR1M.js";import"./Trash-BN6yFfVZ.js";import"./HandShakeHeart-BJ53oCDN.js";import"./Calendar-DuIFoI5R.js";import"./ThumbUp-DM0TdOgK.js";import"./Table-lIFth0jT.js";import"./util-D4CPxTyr.js";import"./format-B0ppLWNW.js";import"./match-C-7WFcLy.js";import"./parseISO-C-w9YAiP.js";import"./parse-Bt8DAopY.js";import"./getDefaultOptions-DwHW2o_l.js";import"./util-XB808C3G.js";import"./InternStatusTag-BIxZ-sPq.js";import"./CircleSlash-Bg6gPoQ5.js";import"./XMarkOctagon-CkUVHwKP.js";import"./Reception-BMnaW2Ws.js";import"./SealCheckmark-Ch65HPj0.js";import"./PersonChat-ItIwxeLz.js";import"./MagnifyingGlass-BuR4fEc0.js";import"./Dropdown-dhtZsaYS.js";import"./useControllableState-CnnhnPcF.js";import"./Popover-Dvg3S10Z.js";import"./floating-ui.react-BD46vR57.js";import"./Date.Input-V8JeOMI_.js";import"./useFormField-Bw12XLYN.js";import"./ChevronDown-D6jbIK8C.js";import"./Modal.context-Cgn_yqR3.js";import"./DismissableLayer-Df30yIAZ.js";import"./useDescendant-CMYAhBZ6.js";import"./useClientLayoutEffect-iBlswlz7.js";import"./Pencil-DMe2_GdA.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,_ as default};
