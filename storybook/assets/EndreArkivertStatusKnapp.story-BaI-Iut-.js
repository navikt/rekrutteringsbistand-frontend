import{j as e,a as d,r as p}from"./iframe-Cngrpa0B.js";import"./KandidatlisteContext-CNVADSCp.js";import{A as i}from"./ActionMenu-DyaYkjnu.js";import{S as m}from"./KandidatHendelseTag-CmD02y5a.js";import{S as u}from"./Trash-CN1_i1Sq.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-DUcoGvxf.js";import"./VStack-BFBL45fh.js";import"./BasePrimitive-CGU5BbqL.js";import"./Box-BW3nG8Jf.js";import"./List-CyvmAVZj.js";import"./Link-o44YGFGr.js";import"./dato-CpkWzOJY.js";import"./format-3IHPRRWg.js";import"./en-US-B-0rQnz0.js";import"./match-OPoBeP1h.js";import"./parseISO-xTwo21f6.js";import"./parse-C3RwyexH.js";import"./getDefaultOptions-Ji22CbKk.js";import"./isSameDay-DD94dVMd.js";import"./index-BKy-G9Eu.js";import"./index-CWbL8d4M.js";import"./util-s8rubUNi.js";import"./Modal.context-CTgmsW8v.js";import"./Portal-UyaMQaKL.js";import"./useDescendant-Dp74wGN1.js";import"./DismissableLayer-1ihfafDX.js";import"./Floating-CqnWAst8.js";import"./useOpenChangeAnimationComplete-8NFBIGWT.js";import"./useValueAsRef-DNRNONUl.js";import"./FocusBoundary-DRzfo263.js";import"./useControllableState-CGZKPh8n.js";import"./ChevronRight-BWzptS3a.js";import"./Tag--IBSZNj-.js";import"./ChatExclamationmark-DeeI9_wa.js";import"./FileXMark-DVbVR_aZ.js";import"./HandShakeHeart-GEnnHbv3.js";import"./Calendar-DCk_FjSR.js";import"./ThumbUp-DSAzQ4Kq.js";import"./ExclamationmarkTriangle-jdbAdb9o.js";import"./Table-ZPtYIC8D.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
