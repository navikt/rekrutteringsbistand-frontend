import{V as s,j as i}from"./iframe-cLJRmr5B.js";import{V as n}from"./VelgInternStatus-DzjDvqou.js";import{w as d,c as o}from"./ContextDecorators-9fFt5yj9.js";import"./preload-helper-PPVm8Dsz.js";import"./InternStatusTag-Cp30LetJ.js";import"./Tag-C-d1Pyhp.js";import"./CircleSlash-BeEr_d5B.js";import"./XMarkOctagon-DnMMa_7X.js";import"./Reception-BHcLAFL5.js";import"./SealCheckmark-Dw8ln8HD.js";import"./PersonChat-Duo-cB9Z.js";import"./MagnifyingGlass-DX7-zKMt.js";import"./KandidatlisteContext-BSYuaauy.js";import"./OrganisasjonsnummerAlert-CCSY39nJ.js";import"./VStack-B2r-tQtf.js";import"./BasePrimitive-DTZDTqQs.js";import"./List-UT7Ujmtc.js";import"./Link-9PaDWQ5u.js";import"./KandidatHendelseTag-DZelb0om.js";import"./ChatExclamationmark-BxusJMw0.js";import"./FileXMark-Cr6_-DVc.js";import"./Trash-C7kcIopf.js";import"./HandShakeHeart-46D9JgEp.js";import"./Calendar-Cr35rsID.js";import"./ThumbUp-BfeXTZAz.js";import"./Table-DVn9t72p.js";import"./util-DwduAItI.js";import"./parse-Cy-KfFvb.js";import"./getDefaultOptions-Ckh4Aw2C.js";import"./parseISO-DcOpjpXk.js";import"./index-BPuz4oKp.js";import"./index-B40KJ5b4.js";import"./isBefore-Db2DvAxc.js";import"./util-D6noReb-.js";import"./Dropdown-BLwmjMND.js";import"./useControllableState-BdxLHsnI.js";import"./Popover-CfD8Hxyt.js";import"./floating-ui.react-oTc_ktS-.js";import"./Date.Input-CxMEZoBY.js";import"./useFormField-CUE04D8g.js";import"./ChevronDown-CYilpRIH.js";import"./Modal.context-Dv_WIP1o.js";import"./DismissableLayer-BuXh4or2.js";import"./useDescendant-zeVkUmkX.js";import"./useClientLayoutEffect-GVk9Ue51.js";import"./Pencil-BtuYEGew.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:s.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>i.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:s.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>i.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:s.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>i.jsx("div",{className:"flex flex-col gap-4",children:Object.values(s).map(t=>i.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
