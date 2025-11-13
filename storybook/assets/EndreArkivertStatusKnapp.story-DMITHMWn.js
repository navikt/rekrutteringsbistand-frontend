import{r as i,j as e,d as l}from"./iframe-BNj3Trp7.js";import{E as s}from"./EndreArkivertStatusModal-B4D0X1Zi.js";import{A as a}from"./ActionMenu-D_xH3I_O.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-dJsyfxMF.js";import"./OrganisasjonsnummerAlert-DA6HqLLK.js";import"./VStack-DI5FtL9d.js";import"./BasePrimitive-Cu5t_Mba.js";import"./List-Cr7cy7SP.js";import"./Link-Bn5t7p2T.js";import"./KandidatHendelseTag-CD3_3PBM.js";import"./Tag-QE-oNjx8.js";import"./ChatExclamationmark-DzcHPT0m.js";import"./FileXMark-DzHm9-jj.js";import"./Trash-By5WJppC.js";import"./HandShakeHeart-DIGmqrBd.js";import"./Calendar-B98hgnWw.js";import"./ThumbUp-KmzGg11Q.js";import"./Table-DXLxzRW2.js";import"./util-DoihbPMg.js";import"./parse-D07axElW.js";import"./getDefaultOptions-Db9cQ1D8.js";import"./parseISO-Dgrq-wQz.js";import"./index-DXeB4KUX.js";import"./index-B40KJ5b4.js";import"./isBefore-CkOQlVm0.js";import"./util-BlQdQcUP.js";import"./Modal-7-gXuphO.js";import"./floating-ui.react-BgmN6yPa.js";import"./Date.Input-Gox3oCUD.js";import"./useFormField-Dq2bFYNe.js";import"./useControllableState-CDlVFmtE.js";import"./ChevronDown-za9Zk1IQ.js";import"./Modal.context-C8x_SuV6.js";import"./Portal-DdswNZPj.js";import"./useDescendant-C0oyiaZY.js";import"./useClientLayoutEffect-DH9bhr_K.js";import"./DismissableLayer-C4HytRU8.js";import"./Floating-CS6O9H3Y.js";import"./ChevronRight-DKRLMowy.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
