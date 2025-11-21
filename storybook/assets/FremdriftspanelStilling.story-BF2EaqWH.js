import{aL as w,Q as I,j as t,w as k,S as j,cz as x,cH as b,cG as g,cA as u,W as y,cW as _}from"./iframe-DxqhZqaS.js";import{w as m,c as D}from"./ContextDecorators-CL3VoatP.js";import{F as N,A as v}from"./FullførtStilling-BZJ9WoK_.js";import{R as T}from"./GjenåpneStillingKnapp-Bue3PJFW.js";import{T as A}from"./TilgangskontrollForInnhold-B2hIGEyY.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CpPdQbLC.js";import"./OrganisasjonsnummerAlert-EjbENWph.js";import"./VStack-cvqccLrx.js";import"./BasePrimitive-DYSm7bwS.js";import"./List-lS0xLvoq.js";import"./Link-CVoPoDzX.js";import"./KandidatHendelseTag-upSNK5Co.js";import"./Tag-CUmrU5ZG.js";import"./ChatExclamationmark-Ch7xS30U.js";import"./FileXMark-hf6Mrp2o.js";import"./Trash-zC9MF7CA.js";import"./HandShakeHeart-CXCC8yfE.js";import"./Calendar-CKfqGBwO.js";import"./ThumbUp-vgw0btPN.js";import"./Table-NC_KmpTa.js";import"./dato-L-iJE9U7.js";import"./parse-D9TuSnDx.js";import"./getDefaultOptions-C5a0nyat.js";import"./parseISO-BFHsUEmE.js";import"./index-CqTTEDZl.js";import"./index-B40KJ5b4.js";import"./util-C0A9QH6B.js";import"./DatoVelger-suebQ8jz.js";import"./useDatepicker-gNLFloVN.js";import"./useControllableState-xYO-yVC9.js";import"./Modal-Bob3JG4_.js";import"./floating-ui.react-DysU3Eee.js";import"./Date.Input-BYJTTWbE.js";import"./useFormField-CyZnCl9A.js";import"./ChevronDown-CYQb3Cst.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-J_YqUB-h.js";import"./Modal.context-BijZIr-h.js";import"./Popover-BMR8J1_7.js";import"./DismissableLayer-DrAEeoje.js";import"./startOfMonth-CavkawlQ.js";import"./Select-D4dYJ9Vg.js";import"./endOfMonth-CpduVTBz.js";import"./ArrowLeft-Qz3HIFu7.js";import"./ArrowRight-DPv82Eqb.js";import"./isSameDay-C-zrkSVZ.js";import"./Checkbox-2aAmg91P.js";import"./Fieldset-XgfLV_Et.js";import"./accordion-DLdVeu5k.js";import"./index-DeOnXB6X.js";import"./index-BWaMt7TS.js";import"./index-edkUNc6L.js";import"./Box-CPq-vmN9.js";import"./Bell-BqQEQ3Pa.js";import"./PersonChat-ByyXUuOR.js";import"./Eye-Bd6_3WeA.js";import"./ProgressBar-BX5rsW4m.js";import"./useLatestRef-CBGCxzKE.js";import"./EyeSlash-nA3GLE7J.js";import"./CircleSlash-Cb1xK_mi.js";import"./Pencil-C1y_48-7.js";import"./FullførStillingModal-DZGyDeUu.js";import"./PersonbrukerTekst-Qx5Xs6es.js";import"./ClockDashed-CQgBiF88.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-Clw2qLQV.js";import"./ErrorBoundary-DoBJr3xG.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
