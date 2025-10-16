import{r as i,j as e,e as p}from"./iframe-DSaqXt6k.js";import{E as s}from"./EndreArkivertStatusModal-BUaI6xrY.js";import{A as a}from"./ActionMenu-DTnE_FCo.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BOTRWqso.js";import"./OrganisasjonsnummerAlert-CGU6iCGJ.js";import"./VStack-BBGaAluN.js";import"./BasePrimitive-DScZ7IXW.js";import"./List-Kxgz1abr.js";import"./Link-BQw0wl5g.js";import"./KandidatHendelseTag-qSfigkV2.js";import"./Tag-DvfXdsyj.js";import"./FileXMark-emfGFE_I.js";import"./Trash-CvDx4G0h.js";import"./HandShakeHeart-P93Kh6Xn.js";import"./Calendar-CGNbwBba.js";import"./ThumbUp-qmo1UuoF.js";import"./Table-BG52D2qp.js";import"./util-CHnmxlZ0.js";import"./format-BmxTv3ea.js";import"./match-DiZcDwkp.js";import"./parseISO-BJ0UyFM2.js";import"./parse-DLRfWJcq.js";import"./getDefaultOptions-CQHWYkoJ.js";import"./util-CeHb-BPb.js";import"./Modal-Dkw8IqW-.js";import"./floating-ui.react-CSxZyN0A.js";import"./Date.Input-D98g2j24.js";import"./useFormField-DsNUz0eE.js";import"./useControllableState-DAjJj0hK.js";import"./ChevronDown-M_cBQkz2.js";import"./Modal.context-DfRJF0pN.js";import"./Portal-DDTzhLqT.js";import"./useDescendant-CdSSQXFb.js";import"./useClientLayoutEffect-CiKxysUG.js";import"./DismissableLayer-BWw-tESd.js";import"./Floating-D56SMUEM.js";import"./ChevronRight-Ct4U80BP.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
