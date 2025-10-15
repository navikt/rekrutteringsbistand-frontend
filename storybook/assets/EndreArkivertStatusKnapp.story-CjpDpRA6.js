import{r as i,j as e,e as p}from"./iframe-vr_vckGk.js";import{E as s}from"./EndreArkivertStatusModal-D4GWTAbQ.js";import{A as a}from"./ActionMenu-XVbY8PVX.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DU2FV14N.js";import"./OrganisasjonsnummerAlert-Qw1WU52J.js";import"./VStack-Ids80tda.js";import"./BasePrimitive-ExeXI_SP.js";import"./List-CiVt3XBZ.js";import"./Link-k3aQI0r3.js";import"./KandidatHendelseTag-CPz9oTVw.js";import"./Tag-Cq5UuXvY.js";import"./FileXMark-CWV7r_z-.js";import"./Trash-CnXQhLYY.js";import"./HandShakeHeart-Djq4CAR-.js";import"./Calendar-Chg5Ppxx.js";import"./ThumbUp-DVF4cc9d.js";import"./Table-gSzwElD0.js";import"./util-DBcg3zLe.js";import"./format-C67-2JLM.js";import"./match-Ce7tQTkY.js";import"./parseISO-D2AKsVns.js";import"./parse-4IUJS7Td.js";import"./getDefaultOptions-B0vCFA6N.js";import"./util-C22SUHcZ.js";import"./Modal-xZlbM4lC.js";import"./floating-ui.react-D3dI4Bwq.js";import"./Date.Input-DP84DOjr.js";import"./useFormField-BLHpsu6M.js";import"./useControllableState-PzA6H3Er.js";import"./ChevronDown-DivzrKGZ.js";import"./Modal.context-DClbNTny.js";import"./Portal-9ykSqoGZ.js";import"./useDescendant-BTw5M-8w.js";import"./useClientLayoutEffect-CQEZGfii.js";import"./DismissableLayer-CmdCdQXi.js";import"./Floating-CJh4MF6u.js";import"./ChevronRight-C8j484Bp.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
