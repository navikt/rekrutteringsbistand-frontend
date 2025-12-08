import{Y as s,j as i}from"./iframe-lHk_a_Ys.js";import{V as n}from"./VelgInternStatus-CD9G57QA.js";import{w as d,c as o}from"./ContextDecorators-CfdMzPsM.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-D1WZpiXH.js";import"./Tag-DOherZZD.js";import"./CircleSlash-CB0YpCt_.js";import"./XMarkOctagon-DU7mb2MR.js";import"./Reception-CjUdLWRP.js";import"./SealCheckmark-CY6jjW2R.js";import"./PersonChat-OfaFROYx.js";import"./MagnifyingGlass-D8vn5Dad.js";import"./KandidatlisteContext-CKwNZ6xA.js";import"./OrganisasjonsnummerAlert-pIiwz4o2.js";import"./VStack-BgragJN7.js";import"./BasePrimitive-mL93Sz-M.js";import"./List-C62mOMDS.js";import"./Link-BK3qalDl.js";import"./KandidatHendelseTag-CE0DX2vf.js";import"./ChatExclamationmark-DxrFlG-C.js";import"./FileXMark-C7kv2qyg.js";import"./Trash-C29_Zhjq.js";import"./HandShakeHeart-D7XyvQyj.js";import"./Calendar-t7TVRuHz.js";import"./ThumbUp-Bq1lpbw4.js";import"./Table-B9HTLA43.js";import"./index-BfhVw7sA.js";import"./index-B40KJ5b4.js";import"./util-CgO9toBk.js";import"./Dropdown-BQGQHz8E.js";import"./useControllableState-BAfukxCW.js";import"./Popover-CIgj0Z8V.js";import"./floating-ui.react-DP9N4sQ7.js";import"./Date.Input-CwQCqCkJ.js";import"./useFormField-AG7POx7Y.js";import"./ChevronDown-B6zAlv3g.js";import"./Modal.context-YOjTMdCO.js";import"./DismissableLayer-B2w8ZaY2.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-q86mg6HT.js";import"./Pencil-KLFO0XML.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
