import{r as i,j as e,d as l}from"./iframe-cNvDYj7l.js";import{E as s}from"./EndreArkivertStatusModal-CMcSjlGb.js";import{A as a}from"./ActionMenu-BesGlere.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BAmXRz36.js";import"./OrganisasjonsnummerAlert-CpiVSjWb.js";import"./VStack-JibsGnmS.js";import"./BasePrimitive-DqmNEQu9.js";import"./List-DK1xahuz.js";import"./Link-AVBwjNvc.js";import"./KandidatHendelseTag-fFhFrEHY.js";import"./Tag-03263A3p.js";import"./ChatExclamationmark-Ca2PnbLB.js";import"./FileXMark-BZXi7hvX.js";import"./Trash-B01mwerR.js";import"./HandShakeHeart-C9POw-OF.js";import"./Calendar-CznEWYh4.js";import"./ThumbUp-BP06I1RD.js";import"./Table-C2dyBnAB.js";import"./util-BO8dQ6Pu.js";import"./parse-CHnOHq9q.js";import"./getDefaultOptions-DaEqWaoo.js";import"./parseISO-D1PtcTHl.js";import"./index-jQi9f5my.js";import"./index-B40KJ5b4.js";import"./isBefore-LeIH_LgQ.js";import"./util-DTlxcMph.js";import"./Modal-BFIseiIB.js";import"./floating-ui.react-BjwHDxaJ.js";import"./Date.Input-DtOJxiwF.js";import"./useFormField-Bz9GijUD.js";import"./useControllableState-Daldu6V6.js";import"./ChevronDown-Dm9kwURF.js";import"./Modal.context-C7s7PBJK.js";import"./Portal-D16QqQVS.js";import"./useDescendant-0IKEmXuu.js";import"./useClientLayoutEffect-CsayHDtQ.js";import"./DismissableLayer-BGf_Rf18.js";import"./Floating-BH6rc7aD.js";import"./ChevronRight-DX3DNo0e.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
