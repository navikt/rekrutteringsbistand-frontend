import{r as i,j as e,e as p}from"./iframe-BUQyu22L.js";import{E as s}from"./EndreArkivertStatusModal-BjtbOE60.js";import{A as a}from"./ActionMenu-Dx404dHn.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Oc2YEQYr.js";import"./OrganisasjonsnummerAlert-HgfTLFF3.js";import"./VStack-CGn3D2ul.js";import"./BasePrimitive-FFlifB9L.js";import"./List-D1fXqFcu.js";import"./Link-7-Oyqc8P.js";import"./KandidatHendelseTag-CAErOFug.js";import"./Tag-DKWFjTWP.js";import"./FileXMark-Ba31hRg_.js";import"./Trash-DWqto8FP.js";import"./HandShakeHeart-DtmDZ5Om.js";import"./Calendar-DPzQKUJ3.js";import"./ThumbUp-CVt-YD8L.js";import"./Table-BeAuNowr.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-CsSeV2vQ.js";import"./format-BPuRaoZf.js";import"./match-OW4j9hbd.js";import"./parseISO-KKd5I4hj.js";import"./parse-DTWVFV5V.js";import"./getDefaultOptions-CUeIb0d6.js";import"./util-AmAm__yB.js";import"./Modal-BhRDrGLS.js";import"./floating-ui.react-D0JeriZz.js";import"./Date.Input-ptuSiYm_.js";import"./useFormField-B836Dc7y.js";import"./useControllableState-wse2apKA.js";import"./ChevronDown-Pb-PecvL.js";import"./Modal.context-CRMP9zga.js";import"./Portal-D8uNj5X1.js";import"./useDescendant-CwAHvFGr.js";import"./useClientLayoutEffect-ocmB1PHi.js";import"./DismissableLayer-CrF6BzgS.js";import"./ChevronRight-vgI2zzvX.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
