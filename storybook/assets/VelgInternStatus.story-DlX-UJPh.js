import{aP as s,j as i}from"./iframe-B7Dvl8Jj.js";import{w as d,c as o}from"./ContextDecorators-BqQKQ7xY.js";import{V as n}from"./VelgInternStatus-xjvX26U_.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CAMVLGED.js";import"./OrganisasjonsnummerAlert-B6979mxN.js";import"./VStack-DoVBdUwh.js";import"./BasePrimitive-nhlMJXy5.js";import"./List-DNLBbsF6.js";import"./Link-COJzWWgd.js";import"./KandidatHendelseTag-DMgWv75R.js";import"./Tag-Dbhe3dYd.js";import"./ChatExclamationmark-6oiWjU16.js";import"./FileXMark-CInp8YnZ.js";import"./Trash-VxLSmphO.js";import"./HandShakeHeart-DSIbfxNS.js";import"./Calendar-CR0WuzSg.js";import"./ThumbUp-CphuqJm_.js";import"./Table-B3A3EwWy.js";import"./util-BR3FpXOQ.js";import"./format-CHTUKnSm.js";import"./match-B-AXo-40.js";import"./parseISO-DHeRfjNk.js";import"./parse-2ma9X7Vh.js";import"./getDefaultOptions-B4Vf2YIU.js";import"./util-DGfqc-Ar.js";import"./InternStatusTag-CGuHEmEe.js";import"./CircleSlash-C8ewjTLH.js";import"./XMarkOctagon-C_NHgnWe.js";import"./Reception-Cc7ercMn.js";import"./SealCheckmark-Bg1ydsp8.js";import"./PersonChat-B1plQAwv.js";import"./MagnifyingGlass-_D7jYpVB.js";import"./Dropdown-Dp0hq_Gz.js";import"./useControllableState-BCdW65Bd.js";import"./Popover-DpxMkbKf.js";import"./floating-ui.react-LZWfpoWL.js";import"./Date.Input-BRCpBEIO.js";import"./useFormField-DS52_5yK.js";import"./ChevronDown-ByQIB4O1.js";import"./Modal.context-BGzr1iqs.js";import"./DismissableLayer-BbVuMLHg.js";import"./useDescendant-DxRANxao.js";import"./useClientLayoutEffect-C8pNxaDh.js";import"./Pencil-BqqEy_lV.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
