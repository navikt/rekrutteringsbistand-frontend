import{j as e,a as d,r as p}from"./iframe-BZVnfrYv.js";import"./KandidatlisteContext-CprgBpgy.js";import{A as i}from"./ActionMenu-A9TrGJXc.js";import{S as m}from"./KandidatHendelseTag-DMRZiYfP.js";import{S as u}from"./Trash-Wy95G7FD.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-YeZhsJNc.js";import"./VStack-DRl8vrOc.js";import"./BasePrimitive-e3pbX_Cv.js";import"./Box-DlstKKvA.js";import"./List-DR3ji4ww.js";import"./Link-BccQ5OtO.js";import"./dato-DGRfIYWU.js";import"./format-D0OOekqm.js";import"./en-US-CcvIPWQU.js";import"./match-DFPR2ZC7.js";import"./parseISO-CADi8uXe.js";import"./parse-D5-LkPQY.js";import"./getDefaultOptions-z7q4JSD4.js";import"./isSameDay-Dng7j_kr.js";import"./index-D6axwwO9.js";import"./index-CWbL8d4M.js";import"./util-CA_G4S8e.js";import"./Modal.context-DdxXfQQV.js";import"./Portal-C5FvaPgs.js";import"./useDescendant-W9w55j2l.js";import"./DismissableLayer-5Vs7lMa5.js";import"./Floating-DI14oNVQ.js";import"./useOpenChangeAnimationComplete-ClCEXJ0_.js";import"./useValueAsRef-C7B-depF.js";import"./FocusBoundary-CjQ5-NDM.js";import"./useControllableState-4LOe-ma9.js";import"./ChevronRight-CFeQqwBT.js";import"./Tag-DVH-2L1c.js";import"./ChatExclamationmark-DlqHd3jQ.js";import"./FileXMark-DTWtn4i7.js";import"./HandShakeHeart-6U4EeBLh.js";import"./Calendar-GHjKS8cp.js";import"./ThumbUp-NB_Ue0Uc.js";import"./ExclamationmarkTriangle-BUyqgGYk.js";import"./Table-DG68d3NJ.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
