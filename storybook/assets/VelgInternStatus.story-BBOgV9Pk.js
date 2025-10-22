import{aK as s,j as i}from"./iframe-COgBtDGK.js";import{w as d,c as o}from"./ContextDecorators-DDFmJ6Lm.js";import{V as n}from"./VelgInternStatus-AF758wkD.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BT1IvZO-.js";import"./OrganisasjonsnummerAlert-D6USNHN1.js";import"./VStack-Dgyxm1dh.js";import"./BasePrimitive-DvD-32Tp.js";import"./List-BFBnVhoE.js";import"./Link-n08tJgBH.js";import"./KandidatHendelseTag-DbK6GcHx.js";import"./Tag-CJY0PnxR.js";import"./ChatExclamationmark-CRFEpTjS.js";import"./FileXMark-BVAq9xL2.js";import"./Trash-tgTqNADo.js";import"./HandShakeHeart-CDQq8RCR.js";import"./Calendar-Dvccs2fA.js";import"./ThumbUp-juI5huSc.js";import"./Table-Bf9-HaFJ.js";import"./util-DaF0eFxC.js";import"./format-Bjv3Zmuc.js";import"./match-DP84vVhp.js";import"./parse-CShcNZWD.js";import"./getDefaultOptions-B5vsIIWS.js";import"./parseISO-DQplc_F1.js";import"./util-BsgEYL50.js";import"./InternStatusTag-DfxvX26A.js";import"./CircleSlash-Db8vEYbM.js";import"./XMarkOctagon-BlV0zIYj.js";import"./Reception-M2we6Vje.js";import"./SealCheckmark-COohQIEg.js";import"./PersonChat-v6WhrtAG.js";import"./MagnifyingGlass-0gVt3-SH.js";import"./Dropdown-DY56tJGi.js";import"./useControllableState-DDAZjlVK.js";import"./Popover-DjVdhgwa.js";import"./floating-ui.react-SVUjMJpY.js";import"./Date.Input-CSrBc5nm.js";import"./useFormField-DF-0UKIt.js";import"./ChevronDown-BBOTSGi1.js";import"./Modal.context-BuPf6RVG.js";import"./DismissableLayer-5nsHy544.js";import"./useDescendant-CzD_2ZUQ.js";import"./useClientLayoutEffect-DmTdPo_m.js";import"./Pencil-o6mS4cuK.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
