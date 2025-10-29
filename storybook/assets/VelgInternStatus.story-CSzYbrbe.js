import{Y as s,j as i}from"./iframe-CWsprw3t.js";import{w as d,c as o}from"./ContextDecorators-DBqGlnG-.js";import{V as n}from"./VelgInternStatus-DUQwG0_Q.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BerSAD2E.js";import"./OrganisasjonsnummerAlert-DaVaP0-D.js";import"./VStack-B_EWfe-e.js";import"./BasePrimitive-B4YTk1z6.js";import"./List-ysrSRdjS.js";import"./Link-MXhOho_V.js";import"./KandidatHendelseTag-Dw1yPhZQ.js";import"./Tag-CeYYw2Ty.js";import"./ChatExclamationmark-DrWeS80S.js";import"./FileXMark-Ch7vRQFa.js";import"./Trash-C_yphtYR.js";import"./HandShakeHeart-av9NhUeV.js";import"./Calendar-DWLhiUqM.js";import"./ThumbUp-CoFw-Gyw.js";import"./Table-oblJOpGI.js";import"./util-iDo19sf0.js";import"./format-ehOzs_-A.js";import"./match-Dsa18GTe.js";import"./parse-Bjmf4kLR.js";import"./getDefaultOptions-C2tpzm1R.js";import"./parseISO-spBYb4yQ.js";import"./index-Dpcv5ex9.js";import"./index-B40KJ5b4.js";import"./isBefore-Bj1CNU8z.js";import"./util-DYk6qF1n.js";import"./InternStatusTag-DCu9wfJa.js";import"./CircleSlash-D7jVBaQg.js";import"./XMarkOctagon-CymqZKGq.js";import"./Reception-CHZfopJm.js";import"./SealCheckmark-VYrW7qCx.js";import"./PersonChat-DYEYWw0e.js";import"./MagnifyingGlass-B1FIlMoe.js";import"./Dropdown-DxMWwNSq.js";import"./useControllableState-DMcbZf6j.js";import"./Popover-Dnw8wApo.js";import"./floating-ui.react-Ct5t2oiB.js";import"./Date.Input-DUAfTzqL.js";import"./useFormField-zQWLLVsR.js";import"./ChevronDown-YzbLBLO9.js";import"./Modal.context-DQJtZMa6.js";import"./DismissableLayer-D5Oqwuvl.js";import"./useDescendant-DpSCI0s7.js";import"./useClientLayoutEffect-BDsETyEK.js";import"./Pencil-vKcIxZYQ.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,et as default};
