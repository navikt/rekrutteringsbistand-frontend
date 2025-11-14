import{r as i,j as e,d as l}from"./iframe-ft6w6Wdm.js";import{E as s}from"./EndreArkivertStatusModal-TJ2IMsUd.js";import{A as a}from"./ActionMenu-BapJMevq.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-B1I5LHQm.js";import"./OrganisasjonsnummerAlert-Ciny46VT.js";import"./VStack-DNeHZhTP.js";import"./BasePrimitive-_eBTgk3A.js";import"./List-B_6gCJvD.js";import"./Link-Bjy5BopZ.js";import"./KandidatHendelseTag-BzevYHoG.js";import"./Tag-BlUIK-vn.js";import"./ChatExclamationmark-CbWzzwkU.js";import"./FileXMark-CapRqFxj.js";import"./Trash-BeWHCtV-.js";import"./HandShakeHeart-D9kNQldF.js";import"./Calendar-BBxBl6ki.js";import"./ThumbUp-D5VKUCEZ.js";import"./Table-wKUEyQsU.js";import"./util-Cb7eeMNc.js";import"./parse-PSqnlPmE.js";import"./getDefaultOptions-CTJLxZl4.js";import"./parseISO-Dhwx3Di0.js";import"./index-CEl6i_yI.js";import"./index-B40KJ5b4.js";import"./isBefore-FHSZ9UXM.js";import"./util-BGf-ull0.js";import"./Modal-DOeJNTlv.js";import"./floating-ui.react-Dms4syf-.js";import"./Date.Input-Bsl0jub-.js";import"./useFormField-D1Ch0Fnu.js";import"./useControllableState-BpidpNKQ.js";import"./ChevronDown-CIAFQB1t.js";import"./Modal.context-DA2sPsBB.js";import"./Portal-CaNhqyoA.js";import"./useDescendant-DiEit0FA.js";import"./useClientLayoutEffect-C0UqTwEf.js";import"./DismissableLayer-DhaTc8VR.js";import"./Floating-BAuSW_AD.js";import"./ChevronRight-ujJ_g6GZ.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
