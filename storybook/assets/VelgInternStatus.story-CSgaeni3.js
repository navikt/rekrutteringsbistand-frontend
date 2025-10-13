import{j as s}from"./iframe-BUQyu22L.js";import{w as d,c as o}from"./ContextDecorators-CX1KhzC8.js";import{V as n}from"./VelgInternStatus-D0ZRS14Z.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Oc2YEQYr.js";import"./OrganisasjonsnummerAlert-HgfTLFF3.js";import"./VStack-CGn3D2ul.js";import"./BasePrimitive-FFlifB9L.js";import"./List-D1fXqFcu.js";import"./Link-7-Oyqc8P.js";import"./KandidatHendelseTag-CAErOFug.js";import"./Tag-DKWFjTWP.js";import"./FileXMark-Ba31hRg_.js";import"./Trash-DWqto8FP.js";import"./HandShakeHeart-DtmDZ5Om.js";import"./Calendar-DPzQKUJ3.js";import"./ThumbUp-CVt-YD8L.js";import"./Table-BeAuNowr.js";import"./util-CsSeV2vQ.js";import"./format-BPuRaoZf.js";import"./match-OW4j9hbd.js";import"./parseISO-KKd5I4hj.js";import"./parse-DTWVFV5V.js";import"./getDefaultOptions-CUeIb0d6.js";import"./util-AmAm__yB.js";import"./InternStatusTag-MItjAQyl.js";import"./CircleSlash-DmpDqtsY.js";import"./XMarkOctagon-D0LV6na5.js";import"./Reception-CIWoqgOx.js";import"./SealCheckmark-DjofclW2.js";import"./PersonChat-B18cB0RY.js";import"./MagnifyingGlass-CfPicpMl.js";import"./Dropdown-D4zLLi5v.js";import"./useControllableState-wse2apKA.js";import"./Popover-CdAzQ5O7.js";import"./floating-ui.react-D0JeriZz.js";import"./Date.Input-ptuSiYm_.js";import"./useFormField-B836Dc7y.js";import"./ChevronDown-Pb-PecvL.js";import"./Modal.context-CRMP9zga.js";import"./DismissableLayer-CrF6BzgS.js";import"./useDescendant-CwAHvFGr.js";import"./useClientLayoutEffect-ocmB1PHi.js";import"./Pencil-CB9RoQ0q.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
