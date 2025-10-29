import{Y as i,j as s}from"./iframe-YU0gJw2_.js";import{w as d,c as o}from"./ContextDecorators-Pwj8uDdC.js";import{V as n}from"./VelgInternStatus-CbLrSGpm.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-vXZ7kztJ.js";import"./OrganisasjonsnummerAlert-D-DxXPkH.js";import"./VStack-CjJaDInz.js";import"./BasePrimitive-Byl2zsu_.js";import"./List-Bj2jn7SK.js";import"./Link-Ccy4hlVd.js";import"./KandidatHendelseTag--Je9UtK3.js";import"./Tag-Bfc_NhQs.js";import"./ChatExclamationmark-Dq4Mbf-P.js";import"./FileXMark-DrbwU584.js";import"./Trash-BSo73oLS.js";import"./HandShakeHeart-DYHu2acl.js";import"./Calendar-Cc_h6ZHR.js";import"./ThumbUp-DAA6TZWC.js";import"./Table-Buifw8cO.js";import"./util-BZYWqHW1.js";import"./format-ByhkG4B0.js";import"./match-BiwrJVmm.js";import"./parse-Bq6Gunlw.js";import"./getDefaultOptions-YSejoEQ9.js";import"./parseISO-CT8HtoSq.js";import"./index-B4eQgjN8.js";import"./index-B40KJ5b4.js";import"./isBefore-BqSNINgW.js";import"./util-DTO6kuK0.js";import"./InternStatusTag-DQnqPHlW.js";import"./CircleSlash--vW-hJPm.js";import"./XMarkOctagon-B2ySjVnx.js";import"./Reception-D5gF4pqR.js";import"./SealCheckmark-Ii6DZhEr.js";import"./PersonChat-gJnuxfwr.js";import"./MagnifyingGlass-8_CQjV11.js";import"./Dropdown-Cx4aVzEX.js";import"./useControllableState-CZk7ILKn.js";import"./Popover-DVk_ImGU.js";import"./floating-ui.react-B-ydokDH.js";import"./Date.Input-BkqaKlYr.js";import"./ReadOnlyIcon-D_aSptLZ.js";import"./useFormField-DFqPKRWn.js";import"./ChevronDown-DPjIL07A.js";import"./Modal.context-DZ6x1Rgu.js";import"./DismissableLayer-Jcvx6REd.js";import"./useDescendant-DsPvMWAh.js";import"./useClientLayoutEffect-vqMtOR5G.js";import"./Pencil-Bq3nk9mI.js";const it={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,it as default};
