import{j as s}from"./iframe-BF2JjRIb.js";import{w as d,c as o}from"./ContextDecorators-Cv407SdG.js";import{V as n}from"./VelgInternStatus-B1HCthUm.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Ls8_CSUn.js";import"./OrganisasjonsnummerAlert-BC-J7ELt.js";import"./VStack-D2XpToW5.js";import"./BasePrimitive-B6ClAo5W.js";import"./List-D7FX1_Zl.js";import"./Link-3Il0mwDB.js";import"./KandidatHendelseTag-DlsHvl9D.js";import"./Tag-JhnKerj0.js";import"./ChatExclamationmark-3HEIeY3v.js";import"./FileXMark-CvRmtUPg.js";import"./Trash-Cy4qb-vW.js";import"./HandShakeHeart-IRZ9u8wk.js";import"./Calendar-CaNwtQxw.js";import"./ThumbUp-CBCfZ5PK.js";import"./Table-DCR9Yfuc.js";import"./util-CzdySwzD.js";import"./format-DsqYtoP1.js";import"./match-BAXhuaJs.js";import"./parseISO-DkEUh7B8.js";import"./parse-CR3DJKNM.js";import"./getDefaultOptions-DGDAbzfX.js";import"./util-8MzKMgXQ.js";import"./InternStatusTag-B4jw1cV9.js";import"./CircleSlash-BlE8IMHz.js";import"./XMarkOctagon-BY6BDS9y.js";import"./Reception-rDKOhMhL.js";import"./SealCheckmark-Dddpq1Ko.js";import"./PersonChat-57PeNqrN.js";import"./MagnifyingGlass-D6GXZ-3C.js";import"./Dropdown-CkihStN1.js";import"./useControllableState-B-FHnd1b.js";import"./Popover-Bagpp_Fu.js";import"./floating-ui.react-CSL5G9Y5.js";import"./Date.Input-Bz3DyjbI.js";import"./useFormField-Dx9hcS2D.js";import"./ChevronDown-mfKrmcvR.js";import"./Modal.context-DpGguQ45.js";import"./DismissableLayer-BKunmu82.js";import"./useDescendant-BERfhhMr.js";import"./useClientLayoutEffect-B5R4AxUQ.js";import"./Pencil-D8aFZJjq.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
