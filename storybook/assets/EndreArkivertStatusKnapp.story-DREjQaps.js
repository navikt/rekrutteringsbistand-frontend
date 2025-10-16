import{r as i,j as e,d as p}from"./iframe-Dztpy7FG.js";import{E as s}from"./EndreArkivertStatusModal-D9vUMyKZ.js";import{A as a}from"./ActionMenu-DQIAy5GM.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CIQvoNAt.js";import"./OrganisasjonsnummerAlert-B5xMY7sy.js";import"./VStack-HNw6XBKh.js";import"./BasePrimitive-_IOgqcZV.js";import"./List-C7JKrr3p.js";import"./Link-eQW3hoy3.js";import"./KandidatHendelseTag-DocFfSvE.js";import"./Tag-CXuRSAQ-.js";import"./FileXMark-jygYJjCP.js";import"./Trash-DATitZQq.js";import"./HandShakeHeart-B6A8Mj0o.js";import"./Calendar-B350-cZ5.js";import"./ThumbUp-C9MoaVk0.js";import"./Table-CsiZs3Xs.js";import"./util-BZe5o9jQ.js";import"./format-mY-HadcG.js";import"./match-BCVUXymx.js";import"./parse-DMRhBhLM.js";import"./getDefaultOptions-ENb9g62e.js";import"./parseISO-DoJZVqXh.js";import"./util-DfjJrChK.js";import"./Modal-CjeWp7Ef.js";import"./floating-ui.react-CvX8JUjW.js";import"./Date.Input-DH1XvPbb.js";import"./useFormField-avTKDxfH.js";import"./useControllableState-CeZ8CCVf.js";import"./ChevronDown-frGHGn0T.js";import"./Modal.context-Dr-JJuFN.js";import"./Portal-Cud0G-XY.js";import"./useDescendant-C9fzL1_w.js";import"./useClientLayoutEffect-SlhgU7E8.js";import"./DismissableLayer-q0hF5vdd.js";import"./Floating-hGamvnPA.js";import"./ChevronRight-4NO2sFOE.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
