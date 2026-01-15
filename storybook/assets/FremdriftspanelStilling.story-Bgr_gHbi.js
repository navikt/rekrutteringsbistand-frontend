import{aq as w,J as I,j as t,R as k,S as j,cn as x,cw as b,cv as g,co as u,O as y,cP as _}from"./iframe-CYkqDpFQ.js";import{w as m,c as D}from"./ContextDecorators-yYqDkXwl.js";import{F as N,A as v}from"./FullførtStilling-BJXvnERh.js";import{R as T}from"./GjenåpneStillingKnapp-BgY88-G1.js";import{T as A}from"./TilgangskontrollForInnhold-CTTsB5uP.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C7pqAoBp.js";import"./OrganisasjonsnummerAlert-B5Idb2Qi.js";import"./VStack-DJPKcU1m.js";import"./BasePrimitive-reuNz4pH.js";import"./List-Bn67-Uss.js";import"./Link-u8POiQZ8.js";import"./KandidatHendelseTag-mKIRRdOJ.js";import"./Tag-7IOW6zyS.js";import"./ChatExclamationmark-D3KvHGNT.js";import"./FileXMark-DVxLpWk-.js";import"./Trash-DqiEXXW0.js";import"./HandShakeHeart-BsIlKUhK.js";import"./Calendar-DQWarZPl.js";import"./ThumbUp-Cq2dP2O9.js";import"./ExclamationmarkTriangle-BMG1JPPl.js";import"./Table-Bb6xp3ny.js";import"./index-DaGfPweS.js";import"./index-B40KJ5b4.js";import"./util-B1_8Nu4i.js";import"./DatoVelger-BoTcmZqT.js";import"./useDatepicker-BLm7c2Ui.js";import"./useControllableState-BXn8QYgD.js";import"./Modal-BNEw6w1L.js";import"./floating-ui.react-BxzS63wE.js";import"./Date.Input-XWqrZOCJ.js";import"./useFormField-z3l0fHsz.js";import"./ChevronDown-B-VMQ9SL.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-uErDUp0f.js";import"./Modal.context-DUSEIPc7.js";import"./Popover-BF1lCYJs.js";import"./DismissableLayer-BuyAlXxU.js";import"./startOfMonth-BXDf4PfH.js";import"./Select-CLWJniM9.js";import"./endOfMonth-CR7QpgXW.js";import"./ArrowLeft-D4oQh7KP.js";import"./ArrowRight-Dqr5TPT1.js";import"./isSameDay-BX6qDyLN.js";import"./Checkbox-DBImj8i4.js";import"./Fieldset-CLWMjcBV.js";import"./accordion-BkW_BfrT.js";import"./index-ZkKhesg-.js";import"./index-BIctG5RN.js";import"./index-E5uod8nT.js";import"./Box-uSWVGXgO.js";import"./Bell-BYLMrQS3.js";import"./PersonChat-Dr0qRlr-.js";import"./Eye-BY2NqvAA.js";import"./ProgressBar-BUKEOatz.js";import"./useLatestRef-D5tJv1x2.js";import"./ShieldLock-D1sZURyI.js";import"./PadlockLocked-DKalafBV.js";import"./EyeSlash-BvEWGcOk.js";import"./CircleSlash-D3swFlZL.js";import"./Pencil-Cq7YJcUb.js";import"./FullførStillingModal-Dw7rkUuj.js";import"./PersonbrukerTekst-DAfI9SrC.js";import"./ClockDashed-D02HQ6jX.js";import"./IkonNavnAvatar-P3Nm5Irb.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-Bro1M8Ew.js";import"./ErrorBoundary-DPjK9H56.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};
