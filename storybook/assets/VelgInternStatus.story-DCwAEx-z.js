import{aP as s,j as i}from"./iframe-BjHUBmX4.js";import{w as d,c as o}from"./ContextDecorators-DdoQcOSc.js";import{V as n}from"./VelgInternStatus-DFaU4PSY.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DF_utew7.js";import"./OrganisasjonsnummerAlert-BnLZ4rcb.js";import"./VStack-BK0ELjpD.js";import"./BasePrimitive-BYSphrt3.js";import"./List-DThvJkRM.js";import"./Link-Dle1PRY7.js";import"./KandidatHendelseTag-BcSGIywJ.js";import"./Tag-CAplgxW9.js";import"./FileXMark-CHsP7GTj.js";import"./Trash-zcYvc2Ft.js";import"./HandShakeHeart-BHcDKPN3.js";import"./Calendar-B1aBhGpE.js";import"./ThumbUp-BVzuf8X0.js";import"./Table-IZ5HbG_Z.js";import"./util-RxryBtRb.js";import"./format-CEnvRZey.js";import"./match-Dw11ZSP6.js";import"./parseISO-BIccb9Iy.js";import"./parse-D5XBI5ZB.js";import"./getDefaultOptions-BwZq2dmU.js";import"./util-oy-2ETrN.js";import"./InternStatusTag-C_QtbwZk.js";import"./CircleSlash--Ang9t33.js";import"./XMarkOctagon-DvrCZV06.js";import"./Reception-DJltwtZI.js";import"./SealCheckmark--bhu0t1d.js";import"./PersonChat-B0tzpWJD.js";import"./MagnifyingGlass-CtzatqOg.js";import"./Dropdown-B7U-UTxM.js";import"./useControllableState-Co_ihWoO.js";import"./Popover-o8vAQkAq.js";import"./floating-ui.react-3KoqlXCl.js";import"./Date.Input-CtMaRWbp.js";import"./useFormField-D2XQg2fU.js";import"./ChevronDown-BkMDEC1C.js";import"./Modal.context-BPs9_y3Y.js";import"./DismissableLayer-UMsxYec2.js";import"./useDescendant-CZdqCo1y.js";import"./useClientLayoutEffect-C1IG9L-k.js";import"./Pencil-BbKvXvtD.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
