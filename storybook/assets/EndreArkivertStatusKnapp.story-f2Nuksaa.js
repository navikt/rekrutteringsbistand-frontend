import{r as i,j as e,e as p}from"./iframe-DLM5HJzs.js";import{E as s}from"./EndreArkivertStatusModal-qGvJ5xTI.js";import{A as a}from"./ActionMenu-C7iPWgDU.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-YgU3m7cz.js";import"./OrganisasjonsnummerAlert-B3pAlU6P.js";import"./VStack-BGMcW3gh.js";import"./BasePrimitive-BbO5zBL-.js";import"./List-0CaM_qXF.js";import"./Link-CPyfir6o.js";import"./KandidatHendelseTag-CbvSE9sM.js";import"./Tag-CEWxUoKE.js";import"./FileXMark-DGFl29ob.js";import"./Trash-BHi_HP9Z.js";import"./HandShakeHeart-CPmZF8O7.js";import"./Calendar-DoFa0WMX.js";import"./ThumbUp-BrAD5jWn.js";import"./Table-DUCgytHE.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-CbwIgSqV.js";import"./format-rNpLzPPb.js";import"./match-U-6S0i8L.js";import"./parseISO-DKDnExf9.js";import"./parse-BmrDh6pf.js";import"./getDefaultOptions-C7f7d1ek.js";import"./util-BszRo8_4.js";import"./Modal-BVeuo_EE.js";import"./floating-ui.react-B-KeMAa3.js";import"./Date.Input-qr4xnD1C.js";import"./useFormField-DfUHWxa8.js";import"./useControllableState-DwtBjsve.js";import"./ChevronDown-DT6wtO4m.js";import"./Modal.context-D3qE7DPQ.js";import"./Portal-CGo7qiXb.js";import"./useDescendant-Bwi08RzL.js";import"./useClientLayoutEffect-BJvFz5xc.js";import"./DismissableLayer-BqwErFhH.js";import"./ChevronRight-cB3acXqU.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
