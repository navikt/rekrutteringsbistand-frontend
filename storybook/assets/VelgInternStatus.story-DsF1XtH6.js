import{P as s,j as i}from"./iframe-D_5AEIMH.js";import{V as n}from"./VelgInternStatus-3ziNZUDt.js";import{w as d,c as o}from"./ContextDecorators-BZzBM6Ov.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-DaXruOae.js";import"./Tag-B_Y7IwSp.js";import"./CircleSlash-D2oZsTwd.js";import"./XMarkOctagon-B9D80A2Q.js";import"./Reception-B0z22vmo.js";import"./SealCheckmark-4o0Niddn.js";import"./PersonChat-DM7Cu24x.js";import"./MagnifyingGlass-CWuy0AUm.js";import"./KandidatlisteContext-DgkAjCPv.js";import"./OrganisasjonsnummerAlert-DzpUV1dk.js";import"./VStack-CEl896nG.js";import"./BasePrimitive-Cj6A43Jo.js";import"./List-Df-2RfUP.js";import"./Link-An6lcgaA.js";import"./KandidatHendelseTag-D3sxRsCE.js";import"./ChatExclamationmark-x7DRtAM1.js";import"./FileXMark-DCWFYXax.js";import"./Trash-C9wSIMeP.js";import"./HandShakeHeart-DG3Fclzn.js";import"./Calendar-5I-kaAQf.js";import"./ThumbUp-BqARjKJ8.js";import"./Table-B_EbQHny.js";import"./util-CGXHHsWZ.js";import"./parse-0NsPvgA2.js";import"./getDefaultOptions-DyzBGJcO.js";import"./parseISO-BCafnnqu.js";import"./index-ZbxCKysi.js";import"./index-B40KJ5b4.js";import"./isBefore-xToZcEr0.js";import"./util-Cr3UssFU.js";import"./Dropdown-CKb2dZrH.js";import"./useControllableState-BSJWGsuF.js";import"./Popover-CPpj0g90.js";import"./floating-ui.react-D6SvponM.js";import"./Date.Input-COm4SJml.js";import"./useFormField-BzwBfefe.js";import"./ChevronDown-CcdezDTh.js";import"./Modal.context-D728kc9W.js";import"./DismissableLayer-D30TSvf3.js";import"./useDescendant-CRcgWPAd.js";import"./useClientLayoutEffect-uCjqBNwN.js";import"./Pencil-B0-vCnIa.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};export{e as FlereStatuser,r as LukketListe,a as Vurderes,at as default};
