import{r as i,j as e,d as l}from"./iframe-DSdiPFC4.js";import{E as s}from"./EndreArkivertStatusModal-RoDcuWVN.js";import{A as a}from"./ActionMenu-3fwY5VBN.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CgGB5biJ.js";import"./OrganisasjonsnummerAlert-CMVFtpnf.js";import"./VStack-BKWn7tAl.js";import"./BasePrimitive-Cc8_GDs4.js";import"./List-D_w4sZva.js";import"./Link-CrwxxI2t.js";import"./KandidatHendelseTag-Da4GVXSl.js";import"./Tag-BKjvMUME.js";import"./ChatExclamationmark-CGmhGL4Y.js";import"./FileXMark-B2tyAkuC.js";import"./Trash-D0HP6bXj.js";import"./HandShakeHeart-D1Qn10_8.js";import"./Calendar-BQUt9BSr.js";import"./ThumbUp-CH6u07Mi.js";import"./Table-DY_fPu8p.js";import"./util-BarDoa7A.js";import"./parse-C7Wk-VNn.js";import"./getDefaultOptions-qYycqK5j.js";import"./parseISO-CPzjlZB_.js";import"./index-CgRHCvDs.js";import"./index-B40KJ5b4.js";import"./isBefore-zdELsJL0.js";import"./util-Boj8vsL6.js";import"./Modal-Dr9Gnqvb.js";import"./floating-ui.react-IxecFUMB.js";import"./Date.Input-Ba7efxI3.js";import"./useFormField-B6f4Ik1o.js";import"./useControllableState-CrxLrzqj.js";import"./ChevronDown-ScfmwSwc.js";import"./Modal.context-qHNJI2Qp.js";import"./Portal-Cjh34YZx.js";import"./useDescendant-CnVxbVRh.js";import"./useClientLayoutEffect-kMRoI8rq.js";import"./DismissableLayer-CxvVRpgD.js";import"./Floating-C0L3SinS.js";import"./ChevronRight--bXIQmbK.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
