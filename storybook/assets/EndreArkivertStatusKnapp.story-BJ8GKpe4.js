import{r as i,j as e,e as p}from"./iframe-BBDbIFjR.js";import{E as s}from"./EndreArkivertStatusModal-z_GFV3lm.js";import{A as a}from"./ActionMenu-kxLo-bZP.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-B_vzGjRw.js";import"./OrganisasjonsnummerAlert-Cb7JRevL.js";import"./VStack-DdDM8iLd.js";import"./BasePrimitive-Xk6F7ow-.js";import"./List-Dy10NIAt.js";import"./Link-CRWTseRM.js";import"./KandidatHendelseTag-DbjD_UcX.js";import"./Tag-Chl9ZaGi.js";import"./FileXMark-BGZJic3P.js";import"./Trash-BY8CB64_.js";import"./HandShakeHeart-DqXBBy4B.js";import"./Calendar-ncQZlya2.js";import"./ThumbUp-CwueX98e.js";import"./Table-BEi9r9ck.js";import"./util-r0BUv_b9.js";import"./format-Dvm4FpV7.js";import"./match-BbABV3H0.js";import"./parseISO-DpxG9qW5.js";import"./parse-CFDYvMeN.js";import"./getDefaultOptions-6sAuUIcW.js";import"./util-Cp2yv8N7.js";import"./Modal-IduDv7Cn.js";import"./floating-ui.react-Db9XEqj9.js";import"./Date.Input-CsGM4pxy.js";import"./useFormField-BcwoBhJn.js";import"./useControllableState-BWhluZK-.js";import"./ChevronDown-BsY05VRN.js";import"./Modal.context-74hVkHzZ.js";import"./Portal-Cd-Vlf5s.js";import"./useDescendant-bNYqRo_D.js";import"./useClientLayoutEffect-VWKh4fsS.js";import"./DismissableLayer-CHweKlIR.js";import"./Floating-DFxJJPog.js";import"./ChevronRight-B7wrvTwB.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
