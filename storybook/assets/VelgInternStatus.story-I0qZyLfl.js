import{av as s,j as i}from"./iframe-BBDbIFjR.js";import{w as d,c as o}from"./ContextDecorators-BgR_YN1U.js";import{V as n}from"./VelgInternStatus-BSbruWkS.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-B_vzGjRw.js";import"./OrganisasjonsnummerAlert-Cb7JRevL.js";import"./VStack-DdDM8iLd.js";import"./BasePrimitive-Xk6F7ow-.js";import"./List-Dy10NIAt.js";import"./Link-CRWTseRM.js";import"./KandidatHendelseTag-DbjD_UcX.js";import"./Tag-Chl9ZaGi.js";import"./FileXMark-BGZJic3P.js";import"./Trash-BY8CB64_.js";import"./HandShakeHeart-DqXBBy4B.js";import"./Calendar-ncQZlya2.js";import"./ThumbUp-CwueX98e.js";import"./Table-BEi9r9ck.js";import"./util-r0BUv_b9.js";import"./format-Dvm4FpV7.js";import"./match-BbABV3H0.js";import"./parseISO-DpxG9qW5.js";import"./parse-CFDYvMeN.js";import"./getDefaultOptions-6sAuUIcW.js";import"./util-Cp2yv8N7.js";import"./InternStatusTag-2OFFg288.js";import"./CircleSlash--Aizr8jJ.js";import"./XMarkOctagon-DPknHjd_.js";import"./Reception-BFOgAmdC.js";import"./SealCheckmark-DAuhtTv1.js";import"./PersonChat-B5uCaF8e.js";import"./MagnifyingGlass-DJHeFYmv.js";import"./Dropdown-BecbF8Um.js";import"./useControllableState-BWhluZK-.js";import"./Popover-BYXM1Kzl.js";import"./floating-ui.react-Db9XEqj9.js";import"./Date.Input-CsGM4pxy.js";import"./useFormField-BcwoBhJn.js";import"./ChevronDown-BsY05VRN.js";import"./Modal.context-74hVkHzZ.js";import"./DismissableLayer-CHweKlIR.js";import"./useDescendant-bNYqRo_D.js";import"./useClientLayoutEffect-VWKh4fsS.js";import"./Pencil-a_-vaK4q.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
