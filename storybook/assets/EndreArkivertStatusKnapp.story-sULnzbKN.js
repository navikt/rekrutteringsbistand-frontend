import{j as e,c as d,r as p}from"./iframe-DFtwoTh_.js";import"./KandidatlisteContext-BVZFb7qF.js";import{A as i}from"./ActionMenu-yfmzzayy.js";import{S as m}from"./KandidatHendelseTag-CqvSDl7X.js";import{S as u}from"./Trash-B_Y4964l.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-DYmCj9GK.js";import"./VStack-BXRFfnuf.js";import"./BasePrimitive-CDiUHIiY.js";import"./Box-BdthdfsJ.js";import"./List-gA8PGlEK.js";import"./Link-DHYtyBSS.js";import"./dato-fXzLlyUY.js";import"./format-CfcYpSTP.js";import"./getTimezoneOffsetInMilliseconds-BBE5HC6h.js";import"./match-C6Ty43v9.js";import"./parseISO-B97Io5Ji.js";import"./parse-pScTYrPT.js";import"./getDefaultOptions-CV-Qyq1F.js";import"./isSameDay-BlXFn6_m.js";import"./index-uWxY8Wir.js";import"./index-CWbL8d4M.js";import"./util-BzTF6oNQ.js";import"./Modal.context-BnWAHEQc.js";import"./Portal-DDM1AoJr.js";import"./useDescendant-DLRNTQnQ.js";import"./DismissableLayer-WJLu7NM2.js";import"./Floating-DABi4o_9.js";import"./useOpenChangeAnimationComplete-C36Vzd1u.js";import"./useValueAsRef-9yFjITAR.js";import"./FocusBoundary-DifjHYCI.js";import"./useControllableState-b9V7-pUK.js";import"./ChevronRight-C2q2gpJB.js";import"./Tag-BIOIosZZ.js";import"./ChatExclamationmark-CcOau3A-.js";import"./FileXMark-CHULUM4y.js";import"./HandShakeHeart-jbq6MMqz.js";import"./Calendar-Cvtr8Wg5.js";import"./ThumbUp-BxTfKIw1.js";import"./ExclamationmarkTriangle-CL_LvRko.js";import"./Table-B43CwJIp.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
