import{r as i,j as e,d as l}from"./iframe-D_5AEIMH.js";import{E as s}from"./EndreArkivertStatusModal-o6XVndPw.js";import{A as a}from"./ActionMenu-DgXl4Fyj.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DgkAjCPv.js";import"./OrganisasjonsnummerAlert-DzpUV1dk.js";import"./VStack-CEl896nG.js";import"./BasePrimitive-Cj6A43Jo.js";import"./List-Df-2RfUP.js";import"./Link-An6lcgaA.js";import"./KandidatHendelseTag-D3sxRsCE.js";import"./Tag-B_Y7IwSp.js";import"./ChatExclamationmark-x7DRtAM1.js";import"./FileXMark-DCWFYXax.js";import"./Trash-C9wSIMeP.js";import"./HandShakeHeart-DG3Fclzn.js";import"./Calendar-5I-kaAQf.js";import"./ThumbUp-BqARjKJ8.js";import"./Table-B_EbQHny.js";import"./util-CGXHHsWZ.js";import"./parse-0NsPvgA2.js";import"./getDefaultOptions-DyzBGJcO.js";import"./parseISO-BCafnnqu.js";import"./index-ZbxCKysi.js";import"./index-B40KJ5b4.js";import"./isBefore-xToZcEr0.js";import"./util-Cr3UssFU.js";import"./Modal-DNvQH_Wy.js";import"./floating-ui.react-D6SvponM.js";import"./Date.Input-COm4SJml.js";import"./useFormField-BzwBfefe.js";import"./useControllableState-BSJWGsuF.js";import"./ChevronDown-CcdezDTh.js";import"./Modal.context-D728kc9W.js";import"./Portal-L3EL--qL.js";import"./useDescendant-CRcgWPAd.js";import"./useClientLayoutEffect-uCjqBNwN.js";import"./DismissableLayer-D30TSvf3.js";import"./Floating-CsOMTDFZ.js";import"./ChevronRight-BZnvS-mv.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
