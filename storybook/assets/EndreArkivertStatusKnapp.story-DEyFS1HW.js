import{r as i,j as e,d as p}from"./iframe-DkqQV0Vp.js";import{E as s}from"./EndreArkivertStatusModal-D7w2xF7q.js";import{A as a}from"./ActionMenu-CzZShDCR.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-LJmcUknT.js";import"./OrganisasjonsnummerAlert-B-0GhKkG.js";import"./VStack-Br_bVmDS.js";import"./BasePrimitive-CTvonWwE.js";import"./List-DgeHneII.js";import"./Link-BMo8M5FD.js";import"./KandidatHendelseTag-3mtqR6ne.js";import"./Tag-OQKFFpN6.js";import"./FileXMark-G79II5l8.js";import"./Trash-CvGRU7xH.js";import"./HandShakeHeart-P-Q9hIaQ.js";import"./Calendar-G_W6zy3n.js";import"./ThumbUp-n6Eb3EYf.js";import"./Table-_jt-Wkdf.js";import"./util-BKVFyWR_.js";import"./format-DbRpKZZT.js";import"./match-Bcqr4xsr.js";import"./parse-C-cVUR9H.js";import"./getDefaultOptions-CDCFXLmF.js";import"./parseISO-DB_v1pEI.js";import"./util-B1vQ7Ub3.js";import"./Modal-CNKsmz6h.js";import"./floating-ui.react-AbRo5KDr.js";import"./Date.Input-DKgCjNm_.js";import"./useFormField-C_wy9RA2.js";import"./useControllableState-CktX_T5O.js";import"./ChevronDown-D9cxegDX.js";import"./Modal.context-BxvMIN3L.js";import"./Portal-DWD3yKQ1.js";import"./useDescendant-DiNnri6c.js";import"./useClientLayoutEffect-qPOaCdZX.js";import"./DismissableLayer-Ddn59H5u.js";import"./Floating-BUArIiqv.js";import"./ChevronRight-ClYDWPVu.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
