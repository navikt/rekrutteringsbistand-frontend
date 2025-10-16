import{r as i,j as e,e as p}from"./iframe-BjHUBmX4.js";import{E as s}from"./EndreArkivertStatusModal-HI0VP8E-.js";import{A as a}from"./ActionMenu-Cj6LiKLf.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DF_utew7.js";import"./OrganisasjonsnummerAlert-BnLZ4rcb.js";import"./VStack-BK0ELjpD.js";import"./BasePrimitive-BYSphrt3.js";import"./List-DThvJkRM.js";import"./Link-Dle1PRY7.js";import"./KandidatHendelseTag-BcSGIywJ.js";import"./Tag-CAplgxW9.js";import"./FileXMark-CHsP7GTj.js";import"./Trash-zcYvc2Ft.js";import"./HandShakeHeart-BHcDKPN3.js";import"./Calendar-B1aBhGpE.js";import"./ThumbUp-BVzuf8X0.js";import"./Table-IZ5HbG_Z.js";import"./util-RxryBtRb.js";import"./format-CEnvRZey.js";import"./match-Dw11ZSP6.js";import"./parseISO-BIccb9Iy.js";import"./parse-D5XBI5ZB.js";import"./getDefaultOptions-BwZq2dmU.js";import"./util-oy-2ETrN.js";import"./Modal-nT3A2Dfs.js";import"./floating-ui.react-3KoqlXCl.js";import"./Date.Input-CtMaRWbp.js";import"./useFormField-D2XQg2fU.js";import"./useControllableState-Co_ihWoO.js";import"./ChevronDown-BkMDEC1C.js";import"./Modal.context-BPs9_y3Y.js";import"./Portal-GnIiBHrC.js";import"./useDescendant-CZdqCo1y.js";import"./useClientLayoutEffect-C1IG9L-k.js";import"./DismissableLayer-UMsxYec2.js";import"./Floating-D8oa9Esk.js";import"./ChevronRight-4GeIVaw2.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
