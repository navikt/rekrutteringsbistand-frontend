import{aq as I,J as w,j as t,R as k,S as j,cA as x,cJ as b,cI as g,cB as u,O as y,d0 as _}from"./iframe-rNYAyblL.js";import{w as m,c as D}from"./ContextDecorators-BPqfRnt5.js";import{F as N,A as v}from"./FullførtStilling-S9VhXSQY.js";import{R as T}from"./GjenåpneStillingKnapp-D4pb_iaY.js";import{T as A}from"./TilgangskontrollForInnhold-BudWRz5I.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CO2ddy-5.js";import"./OrganisasjonsnummerAlert-CzgwYpbA.js";import"./VStack-WqRGF644.js";import"./BasePrimitive-COwr9NLk.js";import"./List-DRmwuA5i.js";import"./Link-CkTrfJ0n.js";import"./KandidatHendelseTag-DOyvrsmz.js";import"./Tag-DNkrPWyg.js";import"./ChatExclamationmark-CFF3Z5I6.js";import"./FileXMark-BFXbi50E.js";import"./Trash-PlHm6ZLG.js";import"./HandShakeHeart-BjvBEiNL.js";import"./Calendar-CE0uly1Q.js";import"./ThumbUp-CJVDHSEb.js";import"./ExclamationmarkTriangle-CzgBjDOA.js";import"./Table-Cw4Ncz0q.js";import"./index-C_IauyVk.js";import"./index-B40KJ5b4.js";import"./util-1Zl6MYV7.js";import"./DatoVelger-BH5STSZc.js";import"./useDatepicker-DFzhmQfR.js";import"./useControllableState-BIhpMQIW.js";import"./Modal-CX3NPbml.js";import"./floating-ui.react-CEwq9UDB.js";import"./Date.Input-u30QZWYL.js";import"./useFormField-DO874rDX.js";import"./ChevronDown-DNHVLjgA.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-B9Y6M99n.js";import"./Modal.context-BOFYqOBv.js";import"./Popover-CzVy6RM6.js";import"./DismissableLayer-sCDQcEC2.js";import"./startOfMonth-C_hqGl4Z.js";import"./Select-C8Ixh9DQ.js";import"./endOfMonth-B5Gvep3Y.js";import"./ArrowLeft-EqkDINrE.js";import"./ArrowRight-DojUzIXw.js";import"./isSameDay-CiZU7qFl.js";import"./Checkbox-DyrwUE0j.js";import"./Fieldset-GnCchGOw.js";import"./accordion-DfCFt6fk.js";import"./index-BsG5VHZn.js";import"./index-DycO6mWS.js";import"./index-B2nnkxwF.js";import"./Box-BdpzK20L.js";import"./Bell-BtHxaTGt.js";import"./PersonChat-QmsuIko-.js";import"./Eye-BJxYtmQp.js";import"./ProgressBar-IEmC_jdW.js";import"./useLatestRef-dCZ-jBnn.js";import"./ShieldLock-8zlrOZQB.js";import"./PadlockLocked-4BnLkpsG.js";import"./EyeSlash-BU_AYCuz.js";import"./CircleSlash-r14Ixkrr.js";import"./Pencil-CliO7El6.js";import"./FullførStillingModal-CBeDv8Ui.js";import"./PersonbrukerTekst-BOb671Wf.js";import"./ClockDashed-Cf4WzUjV.js";import"./IkonNavnAvatar-BV7XOBNi.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-DhypHUTi.js";import"./ErrorBoundary-BnVIHDgt.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
