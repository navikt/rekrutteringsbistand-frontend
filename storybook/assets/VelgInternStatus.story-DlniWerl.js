import{X as s,j as i}from"./iframe-C1ovTrJQ.js";import{V as n}from"./VelgInternStatus-UnF_Mw2L.js";import{w as d,c as o}from"./ContextDecorators-BrBfLULn.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-D6Uqo0mB.js";import"./Tag-C5B9wQUJ.js";import"./CircleSlash-B5nmcACb.js";import"./XMarkOctagon-D-xOsuAO.js";import"./Reception-Bp2yJShB.js";import"./SealCheckmark-D-BnTmhF.js";import"./PersonChat-BrgJSU6e.js";import"./MagnifyingGlass-DEM8p5GM.js";import"./KandidatlisteContext-CKGneecr.js";import"./OrganisasjonsnummerAlert-DnBjo3Sr.js";import"./VStack-BODWlaTY.js";import"./BasePrimitive-kfJoC0Sw.js";import"./List-C5fkUS3x.js";import"./Link-B-3pnXuh.js";import"./KandidatHendelseTag-BarwRLK-.js";import"./ChatExclamationmark-BNNaySzH.js";import"./FileXMark-wrBRLPbV.js";import"./Trash-cvTD7Rhw.js";import"./HandShakeHeart-CIqUKEon.js";import"./Calendar-zxdBpvT8.js";import"./ThumbUp-BzNvvIxt.js";import"./Table-C6jyp0hO.js";import"./index-CKttYGEK.js";import"./index-B40KJ5b4.js";import"./util-sPn1xI8S.js";import"./Dropdown-KqSzqhDd.js";import"./useControllableState-B_oB0b42.js";import"./Popover-BkfV-qBK.js";import"./floating-ui.react-DOaaCIa6.js";import"./Date.Input-CMQNmt4o.js";import"./useFormField-QhcwKSrr.js";import"./ChevronDown-DwOp--_B.js";import"./Modal.context-BM-QBXBc.js";import"./DismissableLayer-BRnL8OqO.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-o_MBhyI4.js";import"./Pencil-xImSgbOF.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
