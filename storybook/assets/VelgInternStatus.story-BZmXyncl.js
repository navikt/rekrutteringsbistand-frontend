import{aK as s,j as i}from"./iframe-D2dvj_6K.js";import{w as d,c as o}from"./ContextDecorators-Bh_2pHE5.js";import{V as n}from"./VelgInternStatus-DfQpQB4y.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BotNX_4K.js";import"./OrganisasjonsnummerAlert-DkkZhm3E.js";import"./VStack-z9wH5dn0.js";import"./BasePrimitive-BEWWhB3K.js";import"./List-Cprn4dhP.js";import"./Link-u6gzZM83.js";import"./KandidatHendelseTag-CM2kClGI.js";import"./Tag-CV9m-ITv.js";import"./FileXMark-CUqQ7cSb.js";import"./Trash-C1YTFGrH.js";import"./HandShakeHeart-Bu3Rw4xr.js";import"./Calendar-D02IXrkp.js";import"./ThumbUp-C5BLve7y.js";import"./Table-CnycmvKL.js";import"./util-viOpl8QD.js";import"./format-BAltmp1D.js";import"./match-D8FDjT0X.js";import"./parse-DYQ32hYW.js";import"./getDefaultOptions-BkBa5hFb.js";import"./parseISO-CS5cHoEZ.js";import"./util-Beh5P7GG.js";import"./InternStatusTag-R5_FLzY4.js";import"./CircleSlash-DtrG0GZ1.js";import"./XMarkOctagon-DiLK8rJM.js";import"./Reception-D0XKho57.js";import"./SealCheckmark-B6kgtKK2.js";import"./PersonChat-CNDOBaRf.js";import"./MagnifyingGlass-d035BfhV.js";import"./Dropdown-9xVeKLra.js";import"./useControllableState-DPGbthHZ.js";import"./Popover-BMC-r_t9.js";import"./floating-ui.react-2s2ZHpJr.js";import"./Date.Input-8G6lp9tB.js";import"./useFormField-DQ6SW2DV.js";import"./ChevronDown-CabTLLsX.js";import"./Modal.context-Bq_osYLE.js";import"./DismissableLayer-BuLRyImn.js";import"./useDescendant-D5kkyxTD.js";import"./useClientLayoutEffect-CdZ2hRHl.js";import"./Pencil-DyX1fnME.js";const _={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
