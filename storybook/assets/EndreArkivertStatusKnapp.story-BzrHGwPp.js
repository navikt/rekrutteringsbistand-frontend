import{r as i,j as e,d as l}from"./iframe-C0grz2Wo.js";import{E as s}from"./EndreArkivertStatusModal-cUtn1PAu.js";import{A as a}from"./ActionMenu-BnOzzQXQ.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CuatCgAP.js";import"./OrganisasjonsnummerAlert-BSPi1WiT.js";import"./VStack-iwEBrvXU.js";import"./BasePrimitive-YYZHIQKP.js";import"./List-Crl8BSVz.js";import"./Link-DostjHct.js";import"./KandidatHendelseTag-4Zvjjh9a.js";import"./Tag-D0ozGcTA.js";import"./ChatExclamationmark-BpPx1dnv.js";import"./FileXMark-C5WGqYyK.js";import"./Trash-BAy9I17o.js";import"./HandShakeHeart--RsNg5xC.js";import"./Calendar-B1UDYawr.js";import"./ThumbUp-CNdSxRt5.js";import"./Table-CDqAcG_J.js";import"./util-Ctc1EFpw.js";import"./parse-BNQC4k6h.js";import"./getDefaultOptions-B0HTFzI0.js";import"./parseISO-Du2aHfBC.js";import"./index-CBObkYOP.js";import"./index-B40KJ5b4.js";import"./isBefore-OXYI8Ltq.js";import"./util-CPaU3JU5.js";import"./Modal-CbC9uLc_.js";import"./floating-ui.react-DeVAIk4J.js";import"./Date.Input-CVFQR35B.js";import"./useFormField-BJjBkOln.js";import"./useControllableState-B8wREkvX.js";import"./ChevronDown-DjL2dQ1d.js";import"./Modal.context-DE4oVxi7.js";import"./Portal-CRtarQnA.js";import"./useDescendant-DKfYsh9H.js";import"./useClientLayoutEffect-CtS8pgi2.js";import"./DismissableLayer-BJgHtaOA.js";import"./Floating-CoeisEbe.js";import"./ChevronRight-DnIlbbje.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
