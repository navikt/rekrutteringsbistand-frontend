import{r as i,j as e,d as l}from"./iframe-BFw6Y54_.js";import{E as s}from"./EndreArkivertStatusModal-DjIga6jx.js";import{A as a}from"./ActionMenu-2WJzY79Z.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bp-TzhYA.js";import"./OrganisasjonsnummerAlert-mmxG7-15.js";import"./VStack-B9u6Resu.js";import"./BasePrimitive-iQxW9vIq.js";import"./List-DVrQCTc0.js";import"./Link-Zp9U8sJf.js";import"./KandidatHendelseTag-B5at6uhU.js";import"./Tag-BeUliE51.js";import"./ChatExclamationmark-NslFaVM3.js";import"./FileXMark-DBtoqCfu.js";import"./Trash-B33bdc92.js";import"./HandShakeHeart-DgYqNuSd.js";import"./Calendar-BcACRogC.js";import"./ThumbUp-9isVQgxg.js";import"./Table-DHSEGGah.js";import"./util-BBbqSAOi.js";import"./format-yhhj1YHs.js";import"./match-BbxCpORa.js";import"./parse-TUzDeo8x.js";import"./getDefaultOptions-BvQZfsqJ.js";import"./parseISO-CQGNEfmV.js";import"./index-CGMsUO1L.js";import"./index-B40KJ5b4.js";import"./isBefore-BiTNg5qO.js";import"./util-B_whZKfY.js";import"./Modal-CR-KPvZK.js";import"./floating-ui.react-CzAqc4TG.js";import"./Date.Input-BMAxxrnk.js";import"./useFormField-DPmE2r1w.js";import"./useControllableState-CMcPgaqx.js";import"./ChevronDown-B-ng3SfS.js";import"./Modal.context-CM0EOp7U.js";import"./Portal-DZQDbMh5.js";import"./useDescendant-Bq6m2cMW.js";import"./useClientLayoutEffect-CHDvLUxV.js";import"./DismissableLayer-e3KR-YK_.js";import"./Floating-DnFeU_CE.js";import"./ChevronRight-CC52nqo3.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
