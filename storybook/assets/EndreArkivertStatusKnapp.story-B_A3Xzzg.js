import{r as i,j as e,e as p}from"./iframe-B9qi-KGR.js";import{E as s}from"./EndreArkivertStatusModal-DXwVfYth.js";import{A as a}from"./ActionMenu-DbDqoTSM.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-t437p4ne.js";import"./OrganisasjonsnummerAlert-CpQm-D8c.js";import"./VStack-B_-iknN3.js";import"./BasePrimitive-3ttinvqw.js";import"./List-C3zLaTJK.js";import"./Link-8NZQ7ys1.js";import"./KandidatHendelseTag-BhFCRt7S.js";import"./Tag-C72TaRLw.js";import"./FileXMark-Qm86sBR-.js";import"./Trash-BMPleXSU.js";import"./HandShakeHeart-CIJpddoL.js";import"./Calendar-CMY7Z5Id.js";import"./ThumbUp-BIcAzq2P.js";import"./Table-BnVQs5kX.js";import"./util-Bz9xGlOD.js";import"./format-DWsGMAW-.js";import"./match-BvrA9PW9.js";import"./parseISO-DHGxqYBc.js";import"./parse-CaQ_bvNr.js";import"./getDefaultOptions-BMsDcF0o.js";import"./util-C7hLCw15.js";import"./Modal-DTKPtxyv.js";import"./floating-ui.react-B0Q1Z0Uj.js";import"./Date.Input-DJCEhbTs.js";import"./useFormField-BLSmHyXC.js";import"./useControllableState-Bzw8feKc.js";import"./ChevronDown-azIsXyJw.js";import"./Modal.context-B6t6lyUq.js";import"./Portal-BzAj7gyv.js";import"./useDescendant-CA4fFxGA.js";import"./useClientLayoutEffect-CeG6ANYV.js";import"./DismissableLayer-Dc7F9n5V.js";import"./Floating-BEcHfbYm.js";import"./ChevronRight-Bc__H4nP.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
