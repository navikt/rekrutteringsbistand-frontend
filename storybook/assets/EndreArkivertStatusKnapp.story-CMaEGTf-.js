import{r as i,j as e,d as l}from"./iframe-CwJGDDxU.js";import{E as s}from"./EndreArkivertStatusModal-6ssO9AEQ.js";import{A as a}from"./ActionMenu-oPiYTsj_.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-0s43dc-A.js";import"./OrganisasjonsnummerAlert-DshxqxgC.js";import"./VStack-CNDCiyu4.js";import"./BasePrimitive-C0K8S5OZ.js";import"./List-DSOB5wxT.js";import"./Link-C4zblZwC.js";import"./KandidatHendelseTag-CU2V8uNt.js";import"./Tag-DvpnlsWL.js";import"./ChatExclamationmark-TCExgNZD.js";import"./FileXMark-ByaH1a5R.js";import"./Trash-I6-I8uBv.js";import"./HandShakeHeart-B86EDAGA.js";import"./Calendar-DYNUBx1J.js";import"./ThumbUp-1hm_RCSo.js";import"./Table-CYqCPUqO.js";import"./util-BzMn3h64.js";import"./parse-C9xB9BVk.js";import"./getDefaultOptions-CZVpCRBO.js";import"./parseISO-B0hZ3Rqn.js";import"./index-xK0OEAgp.js";import"./index-B40KJ5b4.js";import"./isBefore-Bx_RfGFc.js";import"./util-Bhmt96ml.js";import"./Modal-BEGSRuC4.js";import"./floating-ui.react-Fg2d4LGG.js";import"./Date.Input-D9c1Nuk5.js";import"./useFormField-Cb_KudRA.js";import"./useControllableState-DPtKYuyy.js";import"./ChevronDown-CfpJJ6Yq.js";import"./Modal.context-DhgkVBla.js";import"./Portal-DdXogW1w.js";import"./useDescendant-Bvg2tBbK.js";import"./useClientLayoutEffect-aDhQwCtz.js";import"./DismissableLayer-40Fxxc10.js";import"./Floating-CkgeMRlA.js";import"./ChevronRight-DASVH0JD.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
