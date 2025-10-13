import{r as i,j as e,e as p}from"./iframe-Cv24_U16.js";import{E as s}from"./EndreArkivertStatusModal-BO1iUUXc.js";import{A as a}from"./ActionMenu-BudDq_aB.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DNPILVYg.js";import"./OrganisasjonsnummerAlert-D9c208iI.js";import"./VStack-DS8m9eVs.js";import"./BasePrimitive-CfTbFVIU.js";import"./List-DXeT02NF.js";import"./Link-SHX1LCJj.js";import"./KandidatHendelseTag-4mzZxhEG.js";import"./Tag-BlIKe27p.js";import"./FileXMark-B1AmAfvd.js";import"./Trash-Cezw4R__.js";import"./HandShakeHeart-CpE1vd-9.js";import"./Calendar-D4GcZ2Mf.js";import"./ThumbUp-DF-pfAoM.js";import"./Table-O3pxLPDB.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-BlYsK2hr.js";import"./format-CI4X65bH.js";import"./match-BFZphgSS.js";import"./parseISO-Y9qxuxTD.js";import"./parse-vgk349gn.js";import"./getDefaultOptions-hH8TCf17.js";import"./util-Cq_qb_RM.js";import"./Modal-CCC_AlHB.js";import"./floating-ui.react-CJEy1_Ma.js";import"./Date.Input-C08KLdep.js";import"./useFormField-D0tid84_.js";import"./useControllableState-BhHy0Jxs.js";import"./ChevronDown-Dwt-O8DS.js";import"./Modal.context-9K0claTk.js";import"./Portal-PfokqHx4.js";import"./useDescendant-hu1XmWEn.js";import"./useClientLayoutEffect-DgFTS3-c.js";import"./DismissableLayer-D5_pfIza.js";import"./ChevronRight-wfAeml3D.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    lukketKandidatliste: false,
    modalRef: {
      current: null
    } as any
  },
  render: ({
    lukketKandidatliste
  }) => {
    const ref = useRef<HTMLDialogElement>(null);
    return <EndreArkivertStatusKnapp modalRef={ref as unknown as React.RefObject<HTMLDialogElement>} lukketKandidatliste={lukketKandidatliste} />;
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    lukketKandidatliste: false,
    actionMenu: true,
    modalRef: {
      current: null
    } as any
  },
  render: ({
    lukketKandidatliste
  }) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);
    return <ActionMenu open={open} onOpenChange={setOpen}>
        <Button as={ActionMenu.Trigger} size='small' variant='secondary'>
          Åpne meny
        </Button>
        <ActionMenu.Content>
          <EndreArkivertStatusKnapp actionMenu modalRef={ref as unknown as React.RefObject<HTMLDialogElement>} lukketKandidatliste={lukketKandidatliste} />
        </ActionMenu.Content>
      </ActionMenu>;
  }
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,X as default};
