import{r as i,j as e,d as l}from"./iframe-YU0gJw2_.js";import{E as s}from"./EndreArkivertStatusModal-BfHOYXkV.js";import{A as a}from"./ActionMenu-B_bPzF1s.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-vXZ7kztJ.js";import"./OrganisasjonsnummerAlert-D-DxXPkH.js";import"./VStack-CjJaDInz.js";import"./BasePrimitive-Byl2zsu_.js";import"./List-Bj2jn7SK.js";import"./Link-Ccy4hlVd.js";import"./KandidatHendelseTag--Je9UtK3.js";import"./Tag-Bfc_NhQs.js";import"./ChatExclamationmark-Dq4Mbf-P.js";import"./FileXMark-DrbwU584.js";import"./Trash-BSo73oLS.js";import"./HandShakeHeart-DYHu2acl.js";import"./Calendar-Cc_h6ZHR.js";import"./ThumbUp-DAA6TZWC.js";import"./Table-Buifw8cO.js";import"./util-BZYWqHW1.js";import"./format-ByhkG4B0.js";import"./match-BiwrJVmm.js";import"./parse-Bq6Gunlw.js";import"./getDefaultOptions-YSejoEQ9.js";import"./parseISO-CT8HtoSq.js";import"./index-B4eQgjN8.js";import"./index-B40KJ5b4.js";import"./isBefore-BqSNINgW.js";import"./util-DTO6kuK0.js";import"./Modal-D-5sWnQR.js";import"./floating-ui.react-B-ydokDH.js";import"./Date.Input-BkqaKlYr.js";import"./ReadOnlyIcon-D_aSptLZ.js";import"./useFormField-DFqPKRWn.js";import"./useControllableState-CZk7ILKn.js";import"./ChevronDown-DPjIL07A.js";import"./Modal.context-DZ6x1Rgu.js";import"./Portal-DDuTG0Sp.js";import"./useDescendant-DsPvMWAh.js";import"./useClientLayoutEffect-vqMtOR5G.js";import"./DismissableLayer-Jcvx6REd.js";import"./Floating-voo9OTXB.js";import"./ChevronRight-BcvIcDvj.js";const ee={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,ee as default};
