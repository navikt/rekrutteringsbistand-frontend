import{r as i,j as e,e as l}from"./iframe-BF2JjRIb.js";import{E as s}from"./EndreArkivertStatusModal-BBoaSC9W.js";import{A as a}from"./ActionMenu-DHje6XR_.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Ls8_CSUn.js";import"./OrganisasjonsnummerAlert-BC-J7ELt.js";import"./VStack-D2XpToW5.js";import"./BasePrimitive-B6ClAo5W.js";import"./List-D7FX1_Zl.js";import"./Link-3Il0mwDB.js";import"./KandidatHendelseTag-DlsHvl9D.js";import"./Tag-JhnKerj0.js";import"./ChatExclamationmark-3HEIeY3v.js";import"./FileXMark-CvRmtUPg.js";import"./Trash-Cy4qb-vW.js";import"./HandShakeHeart-IRZ9u8wk.js";import"./Calendar-CaNwtQxw.js";import"./ThumbUp-CBCfZ5PK.js";import"./Table-DCR9Yfuc.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-CzdySwzD.js";import"./format-DsqYtoP1.js";import"./match-BAXhuaJs.js";import"./parseISO-DkEUh7B8.js";import"./parse-CR3DJKNM.js";import"./getDefaultOptions-DGDAbzfX.js";import"./util-8MzKMgXQ.js";import"./Modal-CwW-hqK0.js";import"./floating-ui.react-CSL5G9Y5.js";import"./Date.Input-Bz3DyjbI.js";import"./useFormField-Dx9hcS2D.js";import"./useControllableState-B-FHnd1b.js";import"./ChevronDown-mfKrmcvR.js";import"./Modal.context-DpGguQ45.js";import"./Portal-B_nOMbfS.js";import"./useDescendant-BERfhhMr.js";import"./useClientLayoutEffect-B5R4AxUQ.js";import"./DismissableLayer-BKunmu82.js";import"./ChevronRight-Cbl36OAg.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
