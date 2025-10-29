import{r as i,j as e,d as l}from"./iframe-CnM7RT4h.js";import{E as s}from"./EndreArkivertStatusModal-Cu3U1aqF.js";import{A as a}from"./ActionMenu-B-jgfd6u.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DyOfJxEG.js";import"./OrganisasjonsnummerAlert-CIyafJD8.js";import"./VStack-q_qdqDEK.js";import"./BasePrimitive-BcRt1gCV.js";import"./List-C38Qf_at.js";import"./Link-B4LcRRHa.js";import"./KandidatHendelseTag-mSc9II9L.js";import"./Tag-BGgcBDkO.js";import"./ChatExclamationmark-NytTTLa3.js";import"./FileXMark-DPgsERTd.js";import"./Trash-FsJZeVDl.js";import"./HandShakeHeart-BFpOtlHB.js";import"./Calendar-D9k6rPRi.js";import"./ThumbUp-C_2BI2ud.js";import"./Table-Dvx6_-ke.js";import"./util-BJ4TtLU-.js";import"./parse-DTRzWOAH.js";import"./getDefaultOptions-FxIfy1dz.js";import"./parseISO-Bt1F7znG.js";import"./index-r9hVGdVq.js";import"./index-B40KJ5b4.js";import"./isBefore-DmiPH2e_.js";import"./util-CEOuGiz7.js";import"./Modal-EGw49zjI.js";import"./floating-ui.react-pnL2__Kf.js";import"./Date.Input-ZulnjPi4.js";import"./useFormField-DKGrE0Rs.js";import"./useControllableState-Cn-1utpz.js";import"./ChevronDown-DNt8Y1Vb.js";import"./Modal.context-vVkaDHEy.js";import"./Portal-HtHARWFn.js";import"./useDescendant-CRShSGYi.js";import"./useClientLayoutEffect-CgR7ggQ6.js";import"./DismissableLayer-BfJi0g9l.js";import"./Floating-BE35QyMY.js";import"./ChevronRight-B1FVo_uA.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
