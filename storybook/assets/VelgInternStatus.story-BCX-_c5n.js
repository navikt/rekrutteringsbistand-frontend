import{Y as s,j as i}from"./iframe-BFw6Y54_.js";import{w as d,c as o}from"./ContextDecorators-DhmDnBTB.js";import{V as n}from"./VelgInternStatus-B-a6BJw3.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bp-TzhYA.js";import"./OrganisasjonsnummerAlert-mmxG7-15.js";import"./VStack-B9u6Resu.js";import"./BasePrimitive-iQxW9vIq.js";import"./List-DVrQCTc0.js";import"./Link-Zp9U8sJf.js";import"./KandidatHendelseTag-B5at6uhU.js";import"./Tag-BeUliE51.js";import"./ChatExclamationmark-NslFaVM3.js";import"./FileXMark-DBtoqCfu.js";import"./Trash-B33bdc92.js";import"./HandShakeHeart-DgYqNuSd.js";import"./Calendar-BcACRogC.js";import"./ThumbUp-9isVQgxg.js";import"./Table-DHSEGGah.js";import"./util-BBbqSAOi.js";import"./format-yhhj1YHs.js";import"./match-BbxCpORa.js";import"./parse-TUzDeo8x.js";import"./getDefaultOptions-BvQZfsqJ.js";import"./parseISO-CQGNEfmV.js";import"./index-CGMsUO1L.js";import"./index-B40KJ5b4.js";import"./isBefore-BiTNg5qO.js";import"./util-B_whZKfY.js";import"./InternStatusTag-B_23IFit.js";import"./CircleSlash-CbZ5eulS.js";import"./XMarkOctagon-CJQOuGgc.js";import"./Reception-C9NTKYRy.js";import"./SealCheckmark-B2wa1l6_.js";import"./PersonChat-CdX6Er32.js";import"./MagnifyingGlass-CRe-EiUc.js";import"./Dropdown-IHlv2m-Z.js";import"./useControllableState-CMcPgaqx.js";import"./Popover-D8UHDgkb.js";import"./floating-ui.react-CzAqc4TG.js";import"./Date.Input-BMAxxrnk.js";import"./useFormField-DPmE2r1w.js";import"./ChevronDown-B-ng3SfS.js";import"./Modal.context-CM0EOp7U.js";import"./DismissableLayer-e3KR-YK_.js";import"./useDescendant-Bq6m2cMW.js";import"./useClientLayoutEffect-CHDvLUxV.js";import"./Pencil-63gevZKU.js";const et={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
