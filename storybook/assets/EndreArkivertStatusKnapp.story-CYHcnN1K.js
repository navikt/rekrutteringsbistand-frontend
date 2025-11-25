import{r as s,j as e,d as p}from"./iframe-BQ1incyN.js";import{E as i}from"./EndreArkivertStatusModal-BQeet3Xj.js";import{A as a}from"./ActionMenu-9kP9ris4.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DoO6N6oX.js";import"./OrganisasjonsnummerAlert-Cs86EzpO.js";import"./VStack-CvGDILKu.js";import"./BasePrimitive-Dp_sZ_R1.js";import"./List-D5JbiyOp.js";import"./Link-Cat3nivg.js";import"./KandidatHendelseTag-Ao-jlGQL.js";import"./Tag-gSVS37K-.js";import"./ChatExclamationmark-BNLsPpWq.js";import"./FileXMark-TcpzfMVv.js";import"./Trash-DsI7uFmt.js";import"./HandShakeHeart-BhbsEHFh.js";import"./Calendar-BuzM5afZ.js";import"./ThumbUp-n9uTjeI6.js";import"./Table-CgI_5wIF.js";import"./index-CVFFzUnD.js";import"./index-B40KJ5b4.js";import"./util-DeXtxzd9.js";import"./Modal-Basqz_A0.js";import"./floating-ui.react-Db4ep1Lb.js";import"./Date.Input-Clh3TNqh.js";import"./useFormField-BJ9N13rj.js";import"./useControllableState-BQTyOv-Y.js";import"./ChevronDown-DFqnftke.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BWyBD_to.js";import"./Modal.context-BQ3LJgn_.js";import"./Portal-DPf-KDVH.js";import"./useLatestRef-DNBUtRbr.js";import"./useDescendant-Ctj0Kd4c.js";import"./DismissableLayer-CujSqPxa.js";import"./Floating-B77ht9HN.js";import"./ChevronRight-CyRhvWcJ.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,W as default};
