import{r as s,j as e,d as p}from"./iframe-CIT3DOWc.js";import{E as i}from"./EndreArkivertStatusModal-DFY1CotL.js";import{A as a}from"./ActionMenu-Zz9leaTy.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-gxtO-ZJa.js";import"./OrganisasjonsnummerAlert-ByXAit9o.js";import"./VStack-DN1B3Ttz.js";import"./BasePrimitive-DCWy4zSg.js";import"./List-p9AHeWui.js";import"./Link-DuFyBj-D.js";import"./KandidatHendelseTag-Bjmrx7hf.js";import"./Tag-C1zXWBwF.js";import"./ChatExclamationmark-B-bsV1Hm.js";import"./FileXMark-B5eS1K0W.js";import"./Trash-D2WhF6M1.js";import"./HandShakeHeart-DHGWgA55.js";import"./Calendar-Czl3AQgB.js";import"./ThumbUp-Cej_gCOM.js";import"./Table-Wq5rUUcx.js";import"./index-BR14ZwBD.js";import"./index-B40KJ5b4.js";import"./util-zX2xrv_1.js";import"./Modal-D2WHDTqo.js";import"./floating-ui.react-Bj85ERGC.js";import"./Date.Input-B1f3hjBg.js";import"./useFormField-BmSNLWfL.js";import"./useControllableState-CvPQYz3G.js";import"./ChevronDown-Be8Qb0zv.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CT6DomzI.js";import"./Modal.context-gu5GaKCS.js";import"./Portal-w1lwmPEL.js";import"./useLatestRef-T07qqzGv.js";import"./useDescendant-Dq2jijsQ.js";import"./DismissableLayer-CQrPSSY1.js";import"./Floating-yAFVvfE2.js";import"./ChevronRight-D8bOMrP5.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,W as default};
