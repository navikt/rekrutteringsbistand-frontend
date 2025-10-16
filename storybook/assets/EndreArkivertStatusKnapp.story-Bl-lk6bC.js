import{r as i,j as e,e as l}from"./iframe-B7Dvl8Jj.js";import{E as s}from"./EndreArkivertStatusModal-r7vfYkUQ.js";import{A as a}from"./ActionMenu-DviZVRKu.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CAMVLGED.js";import"./OrganisasjonsnummerAlert-B6979mxN.js";import"./VStack-DoVBdUwh.js";import"./BasePrimitive-nhlMJXy5.js";import"./List-DNLBbsF6.js";import"./Link-COJzWWgd.js";import"./KandidatHendelseTag-DMgWv75R.js";import"./Tag-Dbhe3dYd.js";import"./ChatExclamationmark-6oiWjU16.js";import"./FileXMark-CInp8YnZ.js";import"./Trash-VxLSmphO.js";import"./HandShakeHeart-DSIbfxNS.js";import"./Calendar-CR0WuzSg.js";import"./ThumbUp-CphuqJm_.js";import"./Table-B3A3EwWy.js";import"./util-BR3FpXOQ.js";import"./format-CHTUKnSm.js";import"./match-B-AXo-40.js";import"./parseISO-DHeRfjNk.js";import"./parse-2ma9X7Vh.js";import"./getDefaultOptions-B4Vf2YIU.js";import"./util-DGfqc-Ar.js";import"./Modal-C4YlaOo0.js";import"./floating-ui.react-LZWfpoWL.js";import"./Date.Input-BRCpBEIO.js";import"./useFormField-DS52_5yK.js";import"./useControllableState-BCdW65Bd.js";import"./ChevronDown-ByQIB4O1.js";import"./Modal.context-BGzr1iqs.js";import"./Portal-KlBHLL9U.js";import"./useDescendant-DxRANxao.js";import"./useClientLayoutEffect-C8pNxaDh.js";import"./DismissableLayer-BbVuMLHg.js";import"./Floating-CzvhA-rz.js";import"./ChevronRight-Df75AaoW.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
