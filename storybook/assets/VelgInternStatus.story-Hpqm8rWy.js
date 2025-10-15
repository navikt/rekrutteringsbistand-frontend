import{j as s}from"./iframe-CswQ52iW.js";import{w as d,c as o}from"./ContextDecorators-DfyHKVNx.js";import{V as n}from"./VelgInternStatus-Mj71fPrw.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DdJJOJES.js";import"./OrganisasjonsnummerAlert-C_dZuz5h.js";import"./VStack-CO02QYJ4.js";import"./BasePrimitive-DOkvrNwr.js";import"./List-y9Ivl-nr.js";import"./Link-C1U-NoKr.js";import"./KandidatHendelseTag-jlYFG7kK.js";import"./Tag-BEaU4_W2.js";import"./ChatExclamationmark-C9qPXWWl.js";import"./FileXMark-CC-TW-0x.js";import"./Trash-N2sZKuep.js";import"./HandShakeHeart-DlVbhZHH.js";import"./Calendar-CIo7mz4I.js";import"./ThumbUp-DIlX0079.js";import"./Table-e71y4keD.js";import"./util-Da6d0B2L.js";import"./format-DnOgx47x.js";import"./match-DWQd-a6q.js";import"./parseISO-Cj7Hn8SS.js";import"./parse-axsS0z-T.js";import"./getDefaultOptions-B62WXdzl.js";import"./util-CNA8c2BR.js";import"./InternStatusTag-CsE0GkQl.js";import"./CircleSlash-BKCOgemb.js";import"./XMarkOctagon-DA_a5X9M.js";import"./Reception-BpeXWdWQ.js";import"./SealCheckmark-B2Vs5VXg.js";import"./PersonChat-jld7qFmk.js";import"./MagnifyingGlass-B7lyEvD6.js";import"./Dropdown-BOzT7FvS.js";import"./useControllableState-B4VxQDDJ.js";import"./Popover-BBtVlPGW.js";import"./floating-ui.react-Bdf2hTEs.js";import"./Date.Input-BFwAK_Mx.js";import"./useFormField-D5mSIokf.js";import"./ChevronDown-UH5ZcIpy.js";import"./Modal.context-0hUha6_y.js";import"./DismissableLayer-lLsfQj_U.js";import"./useDescendant-D1w92PvF.js";import"./useClientLayoutEffect-u65BGA3s.js";import"./Pencil-_srI4oFu.js";const at={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
