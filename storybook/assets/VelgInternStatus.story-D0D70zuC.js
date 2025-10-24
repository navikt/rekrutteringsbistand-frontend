import{aK as s,j as i}from"./iframe-Bmd04qoj.js";import{w as d,c as o}from"./ContextDecorators-Dp7f3vyf.js";import{V as n}from"./VelgInternStatus-BlGfsbcc.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CILi37Ox.js";import"./OrganisasjonsnummerAlert-qG73dspB.js";import"./VStack-Bmjuwd_W.js";import"./BasePrimitive-CObubrVc.js";import"./List-CX9jJoyJ.js";import"./Link-Dq_6EONH.js";import"./KandidatHendelseTag-DHPlXU7s.js";import"./Tag-Cwnwrn3S.js";import"./ChatExclamationmark-vMNOebpR.js";import"./FileXMark-6G_R8yKn.js";import"./Trash-2kyLvZbY.js";import"./HandShakeHeart-CqxIf87G.js";import"./Calendar-BlxtcVi7.js";import"./ThumbUp-DzGKX53D.js";import"./Table-BLBNzfzr.js";import"./util-BFKdhQhL.js";import"./format-BVFeQIBq.js";import"./match-BYeHyply.js";import"./parse-BfVOmq8O.js";import"./getDefaultOptions-DDwblf9i.js";import"./parseISO-B_RBLHAP.js";import"./index-By3zFBwr.js";import"./index-B40KJ5b4.js";import"./isBefore-BXpbjGgC.js";import"./util-C80-radx.js";import"./InternStatusTag-D9rvNw0t.js";import"./CircleSlash-B7WTUski.js";import"./XMarkOctagon-BJZMuaus.js";import"./Reception-De_ev-pO.js";import"./SealCheckmark-CWUYcXYs.js";import"./PersonChat-CCfPK046.js";import"./MagnifyingGlass-C1eVKe8G.js";import"./Dropdown-roLQidDN.js";import"./useControllableState-vvpRagwg.js";import"./Popover-8Ljva13g.js";import"./floating-ui.react-Bc9TQ6nX.js";import"./Date.Input-Ck8k5Y1M.js";import"./useFormField-E1T9R7PV.js";import"./ChevronDown-B7K84jA1.js";import"./Modal.context-D7HeWnaH.js";import"./DismissableLayer-B3cVLoLu.js";import"./useDescendant-DCEOj9DG.js";import"./useClientLayoutEffect-Z7wWkAeT.js";import"./Pencil-DDLA3mZu.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
