import{r as i,j as e,e as l}from"./iframe-VCe7dRyZ.js";import{E as s}from"./EndreArkivertStatusModal-W23bkgNz.js";import{A as a}from"./ActionMenu-DAbdbL-A.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BU3jygdz.js";import"./OrganisasjonsnummerAlert-CvlELcV-.js";import"./VStack-DbK8sH7a.js";import"./BasePrimitive-faKREJp1.js";import"./List-CgHGulMr.js";import"./Link-91tK5V-B.js";import"./KandidatHendelseTag-DpM1tiH3.js";import"./Tag-BNZTXTla.js";import"./ChatExclamationmark-DP2zAiIS.js";import"./FileXMark-CIq7pB6D.js";import"./Trash-DyBiTSZz.js";import"./HandShakeHeart-Cq3APYaF.js";import"./Calendar-krj_m8jk.js";import"./ThumbUp-CksZbXNt.js";import"./Table-I_ka60HV.js";import"./util-Bw1HkXHV.js";import"./format-B4lXzuEg.js";import"./match-RipjgyAw.js";import"./parseISO-D6VdJANX.js";import"./parse-CUJIztkB.js";import"./getDefaultOptions-B7RZP2Z3.js";import"./util-Ca-pMBl7.js";import"./Modal-DFV-k5Da.js";import"./floating-ui.react-BCWccojJ.js";import"./Date.Input-BRAW8A_E.js";import"./useFormField-DDhPYMZp.js";import"./useControllableState-DrlEfUET.js";import"./ChevronDown-rlof1Z2Y.js";import"./Modal.context-DTzOEz2H.js";import"./Portal-CZ7B5qa4.js";import"./useDescendant-C2k29XYS.js";import"./useClientLayoutEffect-CmfXtWsl.js";import"./DismissableLayer-C1jfr4bU.js";import"./Floating-BUCytdVJ.js";import"./ChevronRight-DGwn-LIs.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Y as default};
