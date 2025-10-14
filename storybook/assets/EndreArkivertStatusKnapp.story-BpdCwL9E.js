import{r as i,j as e,e as l}from"./iframe-DqJRNx3n.js";import{E as s}from"./EndreArkivertStatusModal-CzUHIZKH.js";import{A as a}from"./ActionMenu-3igdJRM5.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DBodQ88Z.js";import"./OrganisasjonsnummerAlert-2WsOPBxl.js";import"./VStack-Bzt5O0Ob.js";import"./BasePrimitive-C_fZN70E.js";import"./List-DL3P5Adp.js";import"./Link-vbFTSF6p.js";import"./KandidatHendelseTag-C8ZrNbqQ.js";import"./Tag-CdzBWLX7.js";import"./ChatExclamationmark-CifTOoWX.js";import"./FileXMark-DDNeYG5a.js";import"./Trash-BtlWEImD.js";import"./HandShakeHeart-DA2F0YaJ.js";import"./Calendar-FOMeQGCY.js";import"./ThumbUp-nyqS1UnX.js";import"./Table-Chsu3JEo.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-uFbpsyro.js";import"./format-CmVE1JG2.js";import"./match-C6anMTib.js";import"./parseISO-CvEsX_L5.js";import"./parse-CsmLlHYT.js";import"./getDefaultOptions-AEHnyEeC.js";import"./util-DaWp_MSb.js";import"./Modal-BJntzZvU.js";import"./floating-ui.react-DVt4jXQS.js";import"./Date.Input-CkDEJ0oN.js";import"./useFormField-Bu_TghDM.js";import"./ReadMore-4bCwEmkG.js";import"./useControllableState-CnvriwM8.js";import"./ChevronDown-XyExX-L0.js";import"./Modal.context-Bay7RcM8.js";import"./Portal-B7spclXO.js";import"./useDescendant-DEQCdmE3.js";import"./useClientLayoutEffect-CzmYKYFM.js";import"./DismissableLayer-Ht21I4At.js";import"./ChevronRight-CAYHmgdC.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Z as default};
