import{aK as s,j as i}from"./iframe-Bc22TiGf.js";import{w as d,c as o}from"./ContextDecorators-jdHi0b_6.js";import{V as n}from"./VelgInternStatus-D10r9ktn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CY2IbqZG.js";import"./OrganisasjonsnummerAlert-8lOqGaPL.js";import"./VStack-CHyaBfxG.js";import"./BasePrimitive-BsaRKyTM.js";import"./List-DW3Obwi1.js";import"./Link-yk8URM6J.js";import"./KandidatHendelseTag-dJX1T5Fo.js";import"./Tag-BOK4K7Fc.js";import"./ChatExclamationmark-C_YcO6-c.js";import"./FileXMark-Dhg_p8mN.js";import"./Trash-B-oJJD1Z.js";import"./HandShakeHeart-hujy4NDb.js";import"./Calendar-CQWQBOHt.js";import"./ThumbUp-DIzMLwvs.js";import"./Table-NoCpgyJR.js";import"./util-BfnnAcuM.js";import"./format-B7kw_Wnx.js";import"./match-QT-28sSn.js";import"./parse-BVrRkuIf.js";import"./getDefaultOptions-BAduFABw.js";import"./parseISO-om9Gl7dg.js";import"./util-CJ_fx-i-.js";import"./InternStatusTag-Cxk3zB9p.js";import"./CircleSlash-ju0YSKBs.js";import"./XMarkOctagon-4EqMnIdr.js";import"./Reception-BmLh3Z-m.js";import"./SealCheckmark-BD56GmNf.js";import"./PersonChat-CS_u0o9D.js";import"./MagnifyingGlass-taNw1mXg.js";import"./Dropdown-WXPLJfbi.js";import"./useControllableState-UyBcdlFN.js";import"./Popover-CrdRoCpL.js";import"./floating-ui.react-CY0w-Y59.js";import"./Date.Input-CYdHd1Ao.js";import"./useFormField-BcmSh0nP.js";import"./ChevronDown-CkTEUA16.js";import"./Modal.context-BNAEMjIh.js";import"./DismissableLayer-Bz7rM6Vb.js";import"./useDescendant-PVy_roNc.js";import"./useClientLayoutEffect-BIyC2go8.js";import"./Pencil-BnJuK-7a.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
