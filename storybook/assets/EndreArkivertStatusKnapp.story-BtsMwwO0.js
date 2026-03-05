import{j as e,a as d,r as p}from"./iframe-_cKBTLnw.js";import"./KandidatlisteContext-C0leyilK.js";import{A as i}from"./ActionMenu-DcKksWbd.js";import{S as m}from"./KandidatHendelseTag-Dz1xBEV8.js";import{S as u}from"./Trash-tcnp0hgy.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-gteE0JkH.js";import"./VStack-BtbW7w57.js";import"./BasePrimitive-C5jwIYOF.js";import"./Box-DvTYyxHp.js";import"./List-DWt7NmUM.js";import"./Link-zB-Lhc-F.js";import"./dato-BtRV7oEY.js";import"./format-D0HpuGDJ.js";import"./getTimezoneOffsetInMilliseconds-DSQFW4v8.js";import"./match-CGt28Yrq.js";import"./parseISO-C5QHaKFY.js";import"./parse-p_9Fxx5z.js";import"./getDefaultOptions-kvERS8Mm.js";import"./isSameDay-CoqLCJxk.js";import"./index-zvKbqp8n.js";import"./index-CWbL8d4M.js";import"./util-FFbot6Rn.js";import"./Modal.context-DgbU6aMT.js";import"./Portal-sHmli58Y.js";import"./useDescendant-D-PJKYt_.js";import"./DismissableLayer-DQElNf2B.js";import"./Floating-Cs-V50Od.js";import"./useOpenChangeAnimationComplete-HBZaEbr6.js";import"./useValueAsRef-4XVcJrcm.js";import"./FocusBoundary-Dv-R6VOZ.js";import"./useControllableState-DuwAMkuq.js";import"./ChevronRight-Ct-Avnze.js";import"./Tag-D4kabPfr.js";import"./ChatExclamationmark-CRCmR7vL.js";import"./FileXMark-DzkbVzxK.js";import"./HandShakeHeart-BNVPUKoX.js";import"./Calendar-Dfwht0_c.js";import"./ThumbUp-D5gCLZ-x.js";import"./ExclamationmarkTriangle-CED4CJLM.js";import"./Table-thjYa1jp.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};export{a as IHandlingMeny,o as SomKnapp,ee as default};
