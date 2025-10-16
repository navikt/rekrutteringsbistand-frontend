import{r as i,j as e,e as l}from"./iframe-dGv2OqX7.js";import{E as s}from"./EndreArkivertStatusModal-BzMqypgB.js";import{A as a}from"./ActionMenu--1jLbLgA.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CH5HuuKx.js";import"./OrganisasjonsnummerAlert-n2dV-P-v.js";import"./VStack-CjJi4I4a.js";import"./BasePrimitive-BWtsHynz.js";import"./List-D5cAhRDP.js";import"./Link-CwO_djth.js";import"./KandidatHendelseTag-B0mmGHV7.js";import"./Tag-CgfBMYwD.js";import"./ChatExclamationmark-Bvsy52tL.js";import"./FileXMark-B6kYZGpK.js";import"./Trash-DMPYbM-l.js";import"./HandShakeHeart-Clc80Ve9.js";import"./Calendar-ZQMAGjm7.js";import"./ThumbUp-B3N30VxE.js";import"./Table-Ghjcd_Wj.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-Dg3Yiv4F.js";import"./format-CtIKURVf.js";import"./match-DS7-xQIv.js";import"./parseISO-BhPVCY7_.js";import"./parse-v2VrHbDj.js";import"./getDefaultOptions-EcdeV_1b.js";import"./util-BvOI1xe7.js";import"./Modal-CBWGKu2d.js";import"./floating-ui.react-C24_lbML.js";import"./Date.Input-Dx75IMGX.js";import"./useFormField-LfchmHsG.js";import"./useControllableState-QlpvQoL3.js";import"./ChevronDown-CnuRnvxx.js";import"./Modal.context-BVpHri-9.js";import"./Portal-DtzqjDKf.js";import"./useDescendant-l4rE7gIp.js";import"./useClientLayoutEffect-WHkWpX14.js";import"./DismissableLayer-DakBz1QQ.js";import"./ChevronRight-DjbmWlp8.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
