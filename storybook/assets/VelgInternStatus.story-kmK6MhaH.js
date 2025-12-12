import{Y as s,j as i}from"./iframe-T-H04Ezd.js";import{V as n}from"./VelgInternStatus-jFV1yqGU.js";import{w as d,c as o}from"./ContextDecorators-Bo-G0gtm.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-B1LcRe_Z.js";import"./Tag-B78aTiIZ.js";import"./CircleSlash-5tJgoyED.js";import"./XMarkOctagon-C98SZvNT.js";import"./Reception-BJQQi8j8.js";import"./SealCheckmark-CjKmglaj.js";import"./PersonChat-9gXQ25nv.js";import"./MagnifyingGlass-B8rZYsXp.js";import"./KandidatlisteContext-C5uJS3BX.js";import"./OrganisasjonsnummerAlert-CfzuYHBj.js";import"./VStack-Bu-24W7v.js";import"./BasePrimitive-CD4yN9iL.js";import"./List-790aD13K.js";import"./Link-CpzkYPhO.js";import"./KandidatHendelseTag-DmNwrPEw.js";import"./ChatExclamationmark-CEq0XBXp.js";import"./FileXMark-B96StWBE.js";import"./Trash-gKkmwHxt.js";import"./HandShakeHeart-BMlil5Mu.js";import"./Calendar-Diq6AebV.js";import"./ThumbUp-C_xSVdgp.js";import"./Table-Wh8VKEqs.js";import"./index-4LmzDlw9.js";import"./index-B40KJ5b4.js";import"./util-DnEn7dJZ.js";import"./Dropdown-CS3sz-S0.js";import"./useControllableState-CWJMUhnE.js";import"./Popover-BgM0PIPS.js";import"./floating-ui.react-r5z69PAR.js";import"./Date.Input-j5cj3e6p.js";import"./useFormField-CIRHe0WO.js";import"./ChevronDown-Bh39XFR4.js";import"./Modal.context-BlEMFX_m.js";import"./DismissableLayer-BNF07ANn.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CCUoL0HN.js";import"./Pencil-CuZUsbe4.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
