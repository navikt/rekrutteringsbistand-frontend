import{r as i,j as e,d as l}from"./iframe-BKRDZNXg.js";import{E as s}from"./EndreArkivertStatusModal-Dtj7Umhq.js";import{A as a}from"./ActionMenu-CozmutAH.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CqWqv4ei.js";import"./OrganisasjonsnummerAlert-CyVgjPMC.js";import"./VStack-Cor3lLjC.js";import"./BasePrimitive-D6wDJ1Ju.js";import"./List-DJ_cKB5i.js";import"./Link-6OQ1ZwSf.js";import"./KandidatHendelseTag-BQGCGSHc.js";import"./Tag-BbMdOwfh.js";import"./ChatExclamationmark-DZyMaN3C.js";import"./FileXMark-DjIko1xT.js";import"./Trash-DJ9JUCj0.js";import"./HandShakeHeart-BFfmkO36.js";import"./Calendar-BzBLnqNs.js";import"./ThumbUp-DfrVGyDU.js";import"./Table-BrhP77xf.js";import"./util-DK0JTtAX.js";import"./parse-B1i2XOHI.js";import"./getDefaultOptions-BzXjfZcs.js";import"./parseISO-ch9g0eF4.js";import"./index-o5hgtkri.js";import"./index-B40KJ5b4.js";import"./isBefore-DoIdCKq_.js";import"./util-Bjk0GmPL.js";import"./Modal-MPIOcSUE.js";import"./floating-ui.react-DpAS_Pzz.js";import"./Date.Input-V2iQ9WC9.js";import"./useFormField-CkZX8Hwz.js";import"./useControllableState-DcIjNWSg.js";import"./ChevronDown-C8FQsTIa.js";import"./Modal.context-7Ywpz0nY.js";import"./Portal-BpPdkYe3.js";import"./useDescendant-CZi4196E.js";import"./useClientLayoutEffect-DHaUvql3.js";import"./DismissableLayer-BD1inBY6.js";import"./Floating-C_tF88HL.js";import"./ChevronRight-BqehGXoA.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
