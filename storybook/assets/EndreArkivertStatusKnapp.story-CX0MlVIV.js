import{r as i,j as e,e as l}from"./iframe-BAewwkeG.js";import{E as s}from"./EndreArkivertStatusModal-CuisQ-Tm.js";import{A as a}from"./ActionMenu-lDZfrKuE.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Bn92wMOu.js";import"./OrganisasjonsnummerAlert-BH8Lhl2-.js";import"./VStack-CXI2svzi.js";import"./BasePrimitive-4knkzmP5.js";import"./List-BxHSDXvl.js";import"./Link-CPqVa9BH.js";import"./KandidatHendelseTag-CDB_MZMJ.js";import"./Tag-ft2zgNkX.js";import"./ChatExclamationmark-CiEunF_E.js";import"./FileXMark-BMJk6nUx.js";import"./Trash-ZbXVgxpa.js";import"./HandShakeHeart-Uxce-0Ck.js";import"./Calendar-C2wH3ZKH.js";import"./ThumbUp-breDGNtp.js";import"./Table-BN-ar8bS.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-DWsJO9vX.js";import"./format-C3LjDUB4.js";import"./match-BwSFFpFi.js";import"./parseISO-Do-jGKA2.js";import"./parse-7oeilopQ.js";import"./getDefaultOptions-BGnhS9gy.js";import"./util-iUGWdSys.js";import"./Modal-CIrWHa0R.js";import"./floating-ui.react-D1PTwaoy.js";import"./Date.Input-D0t2X3FR.js";import"./useFormField-BJTd7Cub.js";import"./useControllableState-Cqtxf3VW.js";import"./ChevronDown-BxKDu35T.js";import"./Modal.context-DrU834AP.js";import"./Portal-BcH9D_JD.js";import"./useDescendant-C00DRe1V.js";import"./useClientLayoutEffect-BcavQbKr.js";import"./DismissableLayer-CN0GulJB.js";import"./ChevronRight-DyK6A4wh.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
