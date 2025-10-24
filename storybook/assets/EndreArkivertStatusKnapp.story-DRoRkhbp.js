import{r as i,j as e,o as l}from"./iframe-Bmd04qoj.js";import{E as s}from"./EndreArkivertStatusModal-D1Z_ULy_.js";import{A as a}from"./ActionMenu-BLPy9eyv.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CILi37Ox.js";import"./OrganisasjonsnummerAlert-qG73dspB.js";import"./VStack-Bmjuwd_W.js";import"./BasePrimitive-CObubrVc.js";import"./List-CX9jJoyJ.js";import"./Link-Dq_6EONH.js";import"./KandidatHendelseTag-DHPlXU7s.js";import"./Tag-Cwnwrn3S.js";import"./ChatExclamationmark-vMNOebpR.js";import"./FileXMark-6G_R8yKn.js";import"./Trash-2kyLvZbY.js";import"./HandShakeHeart-CqxIf87G.js";import"./Calendar-BlxtcVi7.js";import"./ThumbUp-DzGKX53D.js";import"./Table-BLBNzfzr.js";import"./util-BFKdhQhL.js";import"./format-BVFeQIBq.js";import"./match-BYeHyply.js";import"./parse-BfVOmq8O.js";import"./getDefaultOptions-DDwblf9i.js";import"./parseISO-B_RBLHAP.js";import"./index-By3zFBwr.js";import"./index-B40KJ5b4.js";import"./isBefore-BXpbjGgC.js";import"./util-C80-radx.js";import"./Modal-BuCOX0ng.js";import"./floating-ui.react-Bc9TQ6nX.js";import"./Date.Input-Ck8k5Y1M.js";import"./useFormField-E1T9R7PV.js";import"./useControllableState-vvpRagwg.js";import"./ChevronDown-B7K84jA1.js";import"./Modal.context-D7HeWnaH.js";import"./Portal-Cw8T4M2j.js";import"./useDescendant-DCEOj9DG.js";import"./useClientLayoutEffect-Z7wWkAeT.js";import"./DismissableLayer-B3cVLoLu.js";import"./Floating-DiFsU2rn.js";import"./ChevronRight-B6YSpZY-.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,$ as default};
