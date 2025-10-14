import{r as i,j as e,e as l}from"./iframe-CUkABeAB.js";import{E as s}from"./EndreArkivertStatusModal-BjMldQ3P.js";import{A as a}from"./ActionMenu-PV4AR2F7.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CM6BiwiG.js";import"./OrganisasjonsnummerAlert-C-Pqbviv.js";import"./VStack-8d2bOsTl.js";import"./BasePrimitive-Cpq11D6F.js";import"./List-3dklzM8K.js";import"./Link-CAbsed6V.js";import"./KandidatHendelseTag-DNFfyJYB.js";import"./Tag-D-m_iWzx.js";import"./ChatExclamationmark-JBygFkCd.js";import"./FileXMark-D63Q1V8W.js";import"./Trash-CzSjrRUn.js";import"./HandShakeHeart-BrZJHtMd.js";import"./Calendar-BLD0T8W7.js";import"./ThumbUp-DTlY_Wwa.js";import"./Table-Cix3Up-E.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-BvWtTNp-.js";import"./format-BnamQXY9.js";import"./match-ou6qwCdC.js";import"./parseISO-DURtih-t.js";import"./parse-Dh-iiOwK.js";import"./getDefaultOptions-DI-qYsVf.js";import"./util-BG9ROYVH.js";import"./Modal-D_9YSfle.js";import"./floating-ui.react-DSapQsXw.js";import"./Date.Input-D5wMcc1z.js";import"./useFormField-EMReCnbG.js";import"./useControllableState-CupVUa9T.js";import"./ChevronDown-WXoNBOJo.js";import"./Modal.context-D39eZ3rC.js";import"./Portal-BP9HCePh.js";import"./useDescendant-Dw3c8EE5.js";import"./useClientLayoutEffect-Ded7RHbC.js";import"./DismissableLayer-28uNBaum.js";import"./ChevronRight-CQpOtTkp.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
