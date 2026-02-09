import{r as i,j as e,d as l}from"./iframe-DBllXDE6.js";import{E as s}from"./EndreArkivertStatusModal-DAEKoDR0.js";import{A as a}from"./ActionMenu-B5xM15AW.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-kXblc7I7.js";import"./OrganisasjonsnummerAlert-ChauTF1b.js";import"./VStack-BD7vwMWP.js";import"./BasePrimitive-Dy27TjR7.js";import"./Box-B8ditvDu.js";import"./List-BHSGpnq6.js";import"./Link-X5_nQ1b-.js";import"./KandidatHendelseTag-BPulh5dW.js";import"./Tag-ppAPxM7K.js";import"./ChatExclamationmark-DwgjDjfq.js";import"./FileXMark-CS2GvD_8.js";import"./Trash-CPjP9X6q.js";import"./HandShakeHeart-YFQvRBxE.js";import"./Calendar-DtsvWMGM.js";import"./ThumbUp-BujwmZbZ.js";import"./ExclamationmarkTriangle-DgAc2FcK.js";import"./Table-DftGWK19.js";import"./index-DjVoES3y.js";import"./index-B40KJ5b4.js";import"./util-BOT7NFvd.js";import"./Modal-DmtKZm1R.js";import"./floating-ui.react-nbAYDEcq.js";import"./useFormField-BLMEPMTS.js";import"./ReadMore-C7EYz7MB.js";import"./useControllableState-DZW3T6vT.js";import"./ChevronDown-CbQ61Nkw.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-XU4krQMi.js";import"./Modal.context-BeoIJEhX.js";import"./Portal-B_orueXy.js";import"./useValueAsRef-0W2mGnKO.js";import"./Floating-BaO_8kfF.js";import"./useDescendant-BRehYYFD.js";import"./DismissableLayer-BqVzK-jb.js";import"./ChevronRight-DoDr1Psl.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
