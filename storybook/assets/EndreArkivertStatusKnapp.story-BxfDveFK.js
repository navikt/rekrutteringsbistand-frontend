import{r as i,j as e,d as l}from"./iframe-DbDViM4l.js";import{E as s}from"./EndreArkivertStatusModal-DDetRWx7.js";import{A as a}from"./ActionMenu-DWjOUoy_.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-z3eI-lmk.js";import"./OrganisasjonsnummerAlert-B9U-ZlbE.js";import"./VStack-BZGT8t60.js";import"./BasePrimitive-BhL9LeIE.js";import"./List-BcY1tyt6.js";import"./Link-Hv6LWAB6.js";import"./KandidatHendelseTag-BGPKM9wu.js";import"./Tag-DmEV5QJe.js";import"./ChatExclamationmark-DeYUKd0q.js";import"./FileXMark-G5KnS3ki.js";import"./Trash-UsxNWQOA.js";import"./HandShakeHeart-Bf-w_Pgz.js";import"./Calendar-3ZbYViuM.js";import"./ThumbUp-DFSV4bnS.js";import"./Table-Bxe2bAWn.js";import"./util-BeoRUcqO.js";import"./parse-ZJjrIIlr.js";import"./getDefaultOptions-C864TKn6.js";import"./parseISO-CV4nDh-T.js";import"./index-CcWw8rVT.js";import"./index-B40KJ5b4.js";import"./isBefore-CIn-mkna.js";import"./util-71l1qqje.js";import"./Modal-BxFjZTmn.js";import"./floating-ui.react-CtXMieRy.js";import"./Date.Input-CSJDI19P.js";import"./useFormField-CncQnEt9.js";import"./useControllableState-Be-GcjUX.js";import"./ChevronDown-eZR2a0Dl.js";import"./Modal.context-CNG-GA15.js";import"./Portal-D6q2iCU9.js";import"./useDescendant-DX-5F48J.js";import"./useClientLayoutEffect-DutT4olg.js";import"./DismissableLayer-rxJ3YbO8.js";import"./Floating-t_et8k0s.js";import"./ChevronRight-0jztHdZ8.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
