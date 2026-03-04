import{j as e,c as d,r as p}from"./iframe-CC6VL7_i.js";import"./KandidatlisteContext-BRl1YiDg.js";import{A as i}from"./ActionMenu-Ds3sPi4J.js";import{S as m}from"./KandidatHendelseTag-Djt1Ib9t.js";import{S as u}from"./Trash-B24tHuwu.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-DRsKbQ3p.js";import"./VStack-JqhHne0b.js";import"./BasePrimitive-BAiSlWT1.js";import"./Box-TsO214b1.js";import"./List-BBgAeE9_.js";import"./Link-D1X3YaTk.js";import"./dato-CbpBeoBb.js";import"./format-BifkSCbE.js";import"./getTimezoneOffsetInMilliseconds-WjsRqsAD.js";import"./match-D08DcZY-.js";import"./parseISO-CIljvHn6.js";import"./parse-D5c0wGwL.js";import"./getDefaultOptions-COXxqqSZ.js";import"./isSameDay-CC7ir-aX.js";import"./index-Ctdpazjt.js";import"./index-CWbL8d4M.js";import"./util-DBtYKr8r.js";import"./Modal.context-B9dQfTWE.js";import"./Portal-CtmUbKL1.js";import"./useDescendant-QvI7K5q0.js";import"./DismissableLayer-CxyKYVhC.js";import"./Floating-B07Va_c0.js";import"./useOpenChangeAnimationComplete-BcXwMThl.js";import"./useValueAsRef-BzpWTQjf.js";import"./FocusBoundary-BuywbhIY.js";import"./useControllableState-WjbrG42K.js";import"./ChevronRight-Be0CdRdy.js";import"./Tag-Cx_gqqJG.js";import"./ChatExclamationmark-6ubbdgfO.js";import"./FileXMark-BHMJYhjp.js";import"./HandShakeHeart-C-fpM3MJ.js";import"./Calendar-doAPuZb7.js";import"./ThumbUp-BLwrXsZ2.js";import"./ExclamationmarkTriangle-BqkFwsM0.js";import"./Table-DU3VfrlI.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
