import{r as i,j as e,d as p}from"./iframe-rNYAyblL.js";import{E as s}from"./EndreArkivertStatusModal-CKmMB6pr.js";import{A as a}from"./ActionMenu-iBc27BxO.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CO2ddy-5.js";import"./OrganisasjonsnummerAlert-CzgwYpbA.js";import"./VStack-WqRGF644.js";import"./BasePrimitive-COwr9NLk.js";import"./List-DRmwuA5i.js";import"./Link-CkTrfJ0n.js";import"./KandidatHendelseTag-DOyvrsmz.js";import"./Tag-DNkrPWyg.js";import"./ChatExclamationmark-CFF3Z5I6.js";import"./FileXMark-BFXbi50E.js";import"./Trash-PlHm6ZLG.js";import"./HandShakeHeart-BjvBEiNL.js";import"./Calendar-CE0uly1Q.js";import"./ThumbUp-CJVDHSEb.js";import"./ExclamationmarkTriangle-CzgBjDOA.js";import"./Table-Cw4Ncz0q.js";import"./index-C_IauyVk.js";import"./index-B40KJ5b4.js";import"./util-1Zl6MYV7.js";import"./Modal-CX3NPbml.js";import"./floating-ui.react-CEwq9UDB.js";import"./Date.Input-u30QZWYL.js";import"./useFormField-DO874rDX.js";import"./useControllableState-BIhpMQIW.js";import"./ChevronDown-DNHVLjgA.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-B9Y6M99n.js";import"./Modal.context-BOFYqOBv.js";import"./Portal-k63-yw1W.js";import"./useLatestRef-dCZ-jBnn.js";import"./useDescendant-D05-5IgL.js";import"./DismissableLayer-sCDQcEC2.js";import"./Floating-BI3ChyXY.js";import"./ChevronRight-BPZvkTXq.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
