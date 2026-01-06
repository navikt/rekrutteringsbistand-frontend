import{r as i,j as e,d as p}from"./iframe-yXg8aEsL.js";import{E as s}from"./EndreArkivertStatusModal-DLCjLbgw.js";import{A as a}from"./ActionMenu-DTdLXnYr.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BDyKeoaE.js";import"./OrganisasjonsnummerAlert-s4fW92DV.js";import"./VStack-Cxcn_djk.js";import"./BasePrimitive-Bdp6Kfrt.js";import"./List-Dq4QWm19.js";import"./Link-j0jrgpba.js";import"./KandidatHendelseTag-C-p0bX1_.js";import"./Tag-4Usza_qz.js";import"./ChatExclamationmark-CmbrZ5hr.js";import"./FileXMark-PuJkc4ng.js";import"./Trash-CyIGzQGq.js";import"./HandShakeHeart-DUqVn0Y2.js";import"./Calendar-Ct-DxQj0.js";import"./ThumbUp-C8bgAfyQ.js";import"./ExclamationmarkTriangle-DoAhAz0a.js";import"./Table-CEkJoP3c.js";import"./index-Cdb3ukf_.js";import"./index-B40KJ5b4.js";import"./util-DGJefGWE.js";import"./Modal-0SB-MlR0.js";import"./floating-ui.react-gWPDQIqQ.js";import"./Date.Input-C9S36ulk.js";import"./useFormField-4LHn1pYA.js";import"./useControllableState-DktbU-4S.js";import"./ChevronDown-h4edWzLe.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BajYG73Z.js";import"./Modal.context-BCDGvJ6o.js";import"./Portal-D0nb71Pi.js";import"./useLatestRef-DnPfkqAp.js";import"./useDescendant-Dx-uD8OD.js";import"./DismissableLayer-DuEJM6Bc.js";import"./Floating-CqLzZQa9.js";import"./ChevronRight-mCbV9QOe.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
