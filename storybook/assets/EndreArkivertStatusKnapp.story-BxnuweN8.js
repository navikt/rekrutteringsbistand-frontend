import{r as i,j as e,e as l}from"./iframe-CswQ52iW.js";import{E as s}from"./EndreArkivertStatusModal-KhVEqpN7.js";import{A as a}from"./ActionMenu-Btv-LHBj.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DdJJOJES.js";import"./OrganisasjonsnummerAlert-C_dZuz5h.js";import"./VStack-CO02QYJ4.js";import"./BasePrimitive-DOkvrNwr.js";import"./List-y9Ivl-nr.js";import"./Link-C1U-NoKr.js";import"./KandidatHendelseTag-jlYFG7kK.js";import"./Tag-BEaU4_W2.js";import"./ChatExclamationmark-C9qPXWWl.js";import"./FileXMark-CC-TW-0x.js";import"./Trash-N2sZKuep.js";import"./HandShakeHeart-DlVbhZHH.js";import"./Calendar-CIo7mz4I.js";import"./ThumbUp-DIlX0079.js";import"./Table-e71y4keD.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-Da6d0B2L.js";import"./format-DnOgx47x.js";import"./match-DWQd-a6q.js";import"./parseISO-Cj7Hn8SS.js";import"./parse-axsS0z-T.js";import"./getDefaultOptions-B62WXdzl.js";import"./util-CNA8c2BR.js";import"./Modal-JZXnKh6K.js";import"./floating-ui.react-Bdf2hTEs.js";import"./Date.Input-BFwAK_Mx.js";import"./useFormField-D5mSIokf.js";import"./useControllableState-B4VxQDDJ.js";import"./ChevronDown-UH5ZcIpy.js";import"./Modal.context-0hUha6_y.js";import"./Portal--F_JZSVn.js";import"./useDescendant-D1w92PvF.js";import"./useClientLayoutEffect-u65BGA3s.js";import"./DismissableLayer-lLsfQj_U.js";import"./ChevronRight-DvmG4KK_.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Y as default};
