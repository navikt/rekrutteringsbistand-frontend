import{Y as s,j as i}from"./iframe-DQ9jaFGK.js";import{V as n}from"./VelgInternStatus-Bacn_1Io.js";import{w as d,c as o}from"./ContextDecorators-Bc3DOiS3.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-CPJy5f0b.js";import"./Tag-CmBIKPGT.js";import"./CircleSlash-CWzEyrpT.js";import"./XMarkOctagon-DlPbcaWG.js";import"./Reception-De7aV5L7.js";import"./SealCheckmark-1zNETyta.js";import"./PersonChat-B7jNQM_L.js";import"./MagnifyingGlass-B5gwRk_I.js";import"./KandidatlisteContext-CCC2LAFj.js";import"./OrganisasjonsnummerAlert-xlVa5bNe.js";import"./VStack-CMJ94HfX.js";import"./BasePrimitive-Cf9-LRZa.js";import"./List-CZQ4RYE8.js";import"./Link-BuAt7cTQ.js";import"./KandidatHendelseTag-C4zTeyWG.js";import"./ChatExclamationmark-gSzlTHtR.js";import"./FileXMark-CSYk3rQP.js";import"./Trash-Czat1Rnr.js";import"./HandShakeHeart-CdRe9YLa.js";import"./Calendar-qn7P5lxv.js";import"./ThumbUp-mWHy6P4x.js";import"./Table-qqatYIvr.js";import"./index-dEhE5YbD.js";import"./index-B40KJ5b4.js";import"./util-DSzzi24A.js";import"./Dropdown-B6pYoCTB.js";import"./useControllableState-BweIuYLw.js";import"./Popover-Bu--SbmU.js";import"./floating-ui.react-Cvkhx2J8.js";import"./Date.Input-B6LpgIQE.js";import"./useFormField-BvSbIY0c.js";import"./ChevronDown-CFJFU5Q5.js";import"./Modal.context-B9jifhTW.js";import"./DismissableLayer-CEPiaV-H.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DlE4khJJ.js";import"./Pencil-Cr7vcedS.js";const W={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
