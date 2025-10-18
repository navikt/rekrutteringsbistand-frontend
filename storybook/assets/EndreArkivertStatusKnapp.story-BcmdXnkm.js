import{r as i,j as e,d as p}from"./iframe-Ck33ggOC.js";import{E as s}from"./EndreArkivertStatusModal-5sDt8jT_.js";import{A as a}from"./ActionMenu-CJITBMNq.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bc6BpKxw.js";import"./OrganisasjonsnummerAlert-Bz9aYUJx.js";import"./VStack-CwAdOiJC.js";import"./BasePrimitive-2YXnS0Vq.js";import"./List-CiVDev-F.js";import"./Link-Dhxk3pZY.js";import"./KandidatHendelseTag-Dutu81Gf.js";import"./Tag-CsNFT0pA.js";import"./FileXMark-Dep70K3x.js";import"./Trash-DDSdI9vd.js";import"./HandShakeHeart-DL1szVzF.js";import"./Calendar-kG32Vn-7.js";import"./ThumbUp-sZeUVaqB.js";import"./Table-D378Q1o2.js";import"./util-AkxYbrQx.js";import"./format-UiBtHa0D.js";import"./match-Cd8cmJ-v.js";import"./parse-Diyaa5jl.js";import"./getDefaultOptions-Din5M8Fd.js";import"./parseISO-Dq09H4BU.js";import"./util-DTcs0ln3.js";import"./Modal-BcQsDA8r.js";import"./floating-ui.react-BjZSQk9a.js";import"./Date.Input-XIuiiXeM.js";import"./useFormField-DKMLnyQg.js";import"./useControllableState-bKlpX_Tg.js";import"./ChevronDown-BXAsIZJi.js";import"./Modal.context-DFsOWbmP.js";import"./Portal--eVOjt5W.js";import"./useDescendant-zDNT2Woo.js";import"./useClientLayoutEffect-xGnZEZAY.js";import"./DismissableLayer-BrxepFl1.js";import"./Floating-BqflKCVG.js";import"./ChevronRight-f12gPHyj.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
