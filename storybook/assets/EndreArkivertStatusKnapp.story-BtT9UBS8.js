import{r as i,j as e,e as l}from"./iframe-snWmX9TD.js";import{E as s}from"./EndreArkivertStatusModal-Dpz1TiKw.js";import{A as a}from"./ActionMenu-3_XOvy6a.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DiIprio7.js";import"./OrganisasjonsnummerAlert-C1KOYz4l.js";import"./VStack-DYQQZgmC.js";import"./BasePrimitive-DjqUARAj.js";import"./List-D4_oDTPd.js";import"./Link-Bs0IdPBn.js";import"./KandidatHendelseTag-CYfLyN-o.js";import"./Tag-BtoNRPee.js";import"./ChatExclamationmark-BCdEIfFA.js";import"./FileXMark-DS_H3S1v.js";import"./Trash-CuOAktuw.js";import"./HandShakeHeart-Bd_lrBE5.js";import"./Calendar-BPQUzo9Z.js";import"./ThumbUp-Nw3u3CnL.js";import"./Table-BEKaglzQ.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-CGtdeXch.js";import"./format-QCVIWe3h.js";import"./match-CFAKH4gu.js";import"./parseISO-gkf-uHbp.js";import"./parse-Bn1NgIYy.js";import"./getDefaultOptions-AlGiha7p.js";import"./util-Oftb2yQf.js";import"./Modal-UCe-SUpk.js";import"./floating-ui.react-Dy0YYy8f.js";import"./Date.Input-BCSo7M-T.js";import"./useFormField-DoXpaKLg.js";import"./useControllableState-DyA8QYIk.js";import"./ChevronDown-DGQah_1I.js";import"./Modal.context-B5wvo_mf.js";import"./Portal-nAdcOV7g.js";import"./useDescendant-Ba1YdJ3x.js";import"./useClientLayoutEffect-Bu_zjUv9.js";import"./DismissableLayer-X36McntI.js";import"./ChevronRight-BftgPppe.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
