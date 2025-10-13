import{j as s}from"./iframe-taO6KEVb.js";import{w as d,c as o}from"./ContextDecorators-DHjn4wAt.js";import{V as n}from"./VelgInternStatus-bq2F0mvD.js";import{I as i}from"./KandidatTyper-CkRsvxsW.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DTSlPuPd.js";import"./OrganisasjonsnummerAlert-BdJ4-QVF.js";import"./VStack-CD1-oXDL.js";import"./BasePrimitive-wCct1CR8.js";import"./List-rdrUQoKQ.js";import"./Link-BID-uX-a.js";import"./KandidatHendelseTag--nw917LZ.js";import"./Tag-KcS1FDyP.js";import"./FileXMark-NRkoE5MI.js";import"./Trash-mg3r6R_u.js";import"./HandShakeHeart-3-z30V7f.js";import"./Calendar-XTBIa1tH.js";import"./ThumbUp-B7amj6st.js";import"./Table-B4hRwrbQ.js";import"./util-CFkdYIk_.js";import"./format-Cht9JRki.js";import"./match-tu-LbOFz.js";import"./parseISO-BbAFDAsU.js";import"./parse-CRzCE1aA.js";import"./getDefaultOptions-DAqeGPQd.js";import"./util-BZkNEq1o.js";import"./InternStatusTag-C2OxUDav.js";import"./CircleSlash-MHnVlXsC.js";import"./XMarkOctagon-DgRnfxMs.js";import"./Reception-BE8fCHwY.js";import"./SealCheckmark-bvW-mj81.js";import"./PersonChat-UcWFK21g.js";import"./MagnifyingGlass-CVgR6zWC.js";import"./Dropdown-jKTUcKMg.js";import"./useControllableState-DJG1XFp3.js";import"./Popover-BdxvTJY5.js";import"./floating-ui.react-CNy8nT8N.js";import"./Date.Input-CHvxnZPC.js";import"./useFormField-D0MUwnUw.js";import"./ChevronDown-BfqAXBTl.js";import"./Modal.context-BScie5YU.js";import"./DismissableLayer-Kqg7A9Ve.js";import"./useDescendant-BLQSDdsh.js";import"./useClientLayoutEffect-Cfyx80KT.js";import"./Pencil-DajmJqD4.js";const tt={tags:["autodocs"],component:n},a={args:{kandidatnr:"kandidatnr-1",status:i.VURDERES,lukketKandidatliste:!1},render:t=>d(()=>s.jsx(n,{...t}))},r={args:{kandidatnr:"kandidatnr-1",status:i.AKTUELL,lukketKandidatliste:!0},render:t=>d(()=>s.jsx(n,{...t}),o({lukket:!0}))},e={args:{kandidatnr:"dummy",status:i.VURDERES,lukketKandidatliste:!1},render:()=>d(()=>s.jsx("div",{className:"flex flex-col gap-4",children:Object.values(i).map(t=>s.jsx(n,{kandidatnr:`kandidat-${t}`,status:t,lukketKandidatliste:!1},t))}))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
