import{r as i,j as e,d as l}from"./iframe-cL8k691U.js";import{E as s}from"./EndreArkivertStatusModal-DTtFhMo2.js";import{A as a}from"./ActionMenu-BiYXmP5q.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BG5hZA_D.js";import"./OrganisasjonsnummerAlert-NrQAbFYq.js";import"./VStack-D6jQNN7_.js";import"./BasePrimitive-CIPF40MM.js";import"./List-DTLTVjrE.js";import"./Link-BHJm8HGk.js";import"./KandidatHendelseTag-CvrfWkPD.js";import"./Tag-CTjVIrDR.js";import"./ChatExclamationmark-jLeRVtqi.js";import"./FileXMark-BrsEB1Ls.js";import"./Trash-Cz3qXP6k.js";import"./HandShakeHeart-BHN2WbX7.js";import"./Calendar-hrUqvLah.js";import"./ThumbUp-Da4_9b7o.js";import"./Table-CEVrlXgH.js";import"./util-G5pIvmc4.js";import"./parse-CiIzdRuc.js";import"./getDefaultOptions-BrAag-BB.js";import"./parseISO-D2I8ust4.js";import"./index-U826ktB1.js";import"./index-B40KJ5b4.js";import"./isBefore-CwK-2bUN.js";import"./util-CkGQiHDj.js";import"./Modal-BSzL7ywl.js";import"./floating-ui.react-DfESSBbJ.js";import"./Date.Input-jPYHkUOs.js";import"./useFormField-CGY7xPma.js";import"./useControllableState-DTJY2lFz.js";import"./ChevronDown-6zbRKb5v.js";import"./Modal.context-BJG8Br9n.js";import"./Portal-C8Tuvinc.js";import"./useDescendant-Cn-T47ra.js";import"./useClientLayoutEffect-DUQJUa8d.js";import"./DismissableLayer-CAZiRAZF.js";import"./Floating-CREScj0O.js";import"./ChevronRight-Cy4DCmwH.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
