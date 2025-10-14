import{r as i,j as e,e as p}from"./iframe-pQ4IQbGd.js";import{E as s}from"./EndreArkivertStatusModal-CUhsApGt.js";import{A as a}from"./ActionMenu-DqT_kNGK.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-QnKNStzm.js";import"./OrganisasjonsnummerAlert-7NDzGfnf.js";import"./VStack-DCwu5_pW.js";import"./BasePrimitive-Db3km7WY.js";import"./List-CRwxmV1Z.js";import"./Link-Cx_LZd61.js";import"./KandidatHendelseTag-DUUh8yuE.js";import"./Tag-D1pqY_tH.js";import"./FileXMark-B_5gfR1M.js";import"./Trash-BN6yFfVZ.js";import"./HandShakeHeart-BJ53oCDN.js";import"./Calendar-DuIFoI5R.js";import"./ThumbUp-DM0TdOgK.js";import"./Table-lIFth0jT.js";import"./util-D4CPxTyr.js";import"./format-B0ppLWNW.js";import"./match-C-7WFcLy.js";import"./parseISO-C-w9YAiP.js";import"./parse-Bt8DAopY.js";import"./getDefaultOptions-DwHW2o_l.js";import"./util-XB808C3G.js";import"./Modal-9VfEtu-c.js";import"./floating-ui.react-BD46vR57.js";import"./Date.Input-V8JeOMI_.js";import"./useFormField-Bw12XLYN.js";import"./useControllableState-CnnhnPcF.js";import"./ChevronDown-D6jbIK8C.js";import"./Modal.context-Cgn_yqR3.js";import"./Portal-CQosx2dy.js";import"./useDescendant-CMYAhBZ6.js";import"./useClientLayoutEffect-iBlswlz7.js";import"./DismissableLayer-Df30yIAZ.js";import"./Floating-BgVINauq.js";import"./ChevronRight-BOOhZb3-.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
