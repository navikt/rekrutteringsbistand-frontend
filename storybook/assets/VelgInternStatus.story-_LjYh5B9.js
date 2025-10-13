import{j as s}from"./iframe-Cz03cNnU.js";import{w as d,c as o}from"./ContextDecorators-Ytqa4qdV.js";import{V as n}from"./VelgInternStatus-BOa-IH_4.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DOiKwQlj.js";import"./OrganisasjonsnummerAlert-A6V_r_9p.js";import"./VStack-Dn4Om_V9.js";import"./BasePrimitive-xMOo3z-A.js";import"./List-BkBSIZ9o.js";import"./Link-D-wNG8OT.js";import"./KandidatHendelseTag-DMBTlFvq.js";import"./Tag-D0BEl-Rx.js";import"./FileXMark-D8OhWEgM.js";import"./Trash-YSKNBnBc.js";import"./HandShakeHeart-B4UWzEb8.js";import"./Calendar-CPEpsnvW.js";import"./ThumbUp-BnMzPauv.js";import"./Table-CaMwSQ-S.js";import"./util-mkC834Ef.js";import"./format-BtonrWpy.js";import"./match-YUn_3ltH.js";import"./parseISO-CQ9F3tRX.js";import"./parse-DIF_idgU.js";import"./getDefaultOptions-B0jo0GfK.js";import"./util-CtK3LrTT.js";import"./InternStatusTag-CgjhETrl.js";import"./CircleSlash-RkGLzKOv.js";import"./XMarkOctagon-ZrvxHoCm.js";import"./Reception-DjBRXbX2.js";import"./SealCheckmark-ZHtD3n3U.js";import"./PersonChat-Db9DrxrJ.js";import"./MagnifyingGlass-DdBjCFgQ.js";import"./Dropdown-DBTuM20y.js";import"./useControllableState-BjXV5lxt.js";import"./Popover-Dt9Uq6kE.js";import"./floating-ui.react-D-zVLpts.js";import"./Date.Input-DKz4iTU4.js";import"./useFormField-BUPAi8Oh.js";import"./ChevronDown-ChhOAzu5.js";import"./Modal.context-CDADyR-h.js";import"./DismissableLayer-DAq5rDS1.js";import"./useDescendant-D-ThzgfS.js";import"./useClientLayoutEffect-cag720gG.js";import"./Pencil-D3E46UDI.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,tt as default};
