import{aq as I,J as w,j as t,R as k,S as j,cA as x,cJ as b,cI as g,cB as u,O as y,d0 as _}from"./iframe-CQil8Ac-.js";import{w as m,c as D}from"./ContextDecorators-BDAw5V3z.js";import{F as N,A as v}from"./FullførtStilling-BfW3872n.js";import{R as T}from"./GjenåpneStillingKnapp-BNESxLJq.js";import{T as A}from"./TilgangskontrollForInnhold-C1ypfI_t.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-SkgljsBN.js";import"./OrganisasjonsnummerAlert-odXmaA76.js";import"./VStack-ClTC7-Qh.js";import"./BasePrimitive-DbEo0fjm.js";import"./List-CkRxobO3.js";import"./Link-D4LnQKIk.js";import"./KandidatHendelseTag-CCi1oh8O.js";import"./Tag-Bas5e0Nb.js";import"./ChatExclamationmark-BeuekrfM.js";import"./FileXMark-3YevlryT.js";import"./Trash-DzjGyRR4.js";import"./HandShakeHeart-CjMF1Meo.js";import"./Calendar-DjNLQ5xy.js";import"./ThumbUp-DvNucyaU.js";import"./ExclamationmarkTriangle-CZa1nyJG.js";import"./Table-DerwyLaa.js";import"./index-CAf5FEcx.js";import"./index-B40KJ5b4.js";import"./util-DvpZv3Av.js";import"./DatoVelger-F6tKC6qn.js";import"./useDatepicker-DLvSlz79.js";import"./useControllableState-DoktTe-G.js";import"./Modal-CJG4OmxT.js";import"./floating-ui.react-ByckfoFE.js";import"./Date.Input-FBhanq2N.js";import"./useFormField-CwsHIkrX.js";import"./ChevronDown-BQMQJvkf.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-kHAbcb-S.js";import"./Modal.context-C0GzMoCc.js";import"./Popover-Ct_rdUbH.js";import"./DismissableLayer-DBjrKVPw.js";import"./startOfMonth-BhnBjUy4.js";import"./Select-CQrJJ-u9.js";import"./endOfMonth-BKL6DCUC.js";import"./ArrowLeft-BXw8l9Ku.js";import"./ArrowRight-YvAj2MzQ.js";import"./isSameDay-BHX2F0dB.js";import"./Checkbox-dpeTEEAZ.js";import"./Fieldset-CkXtznwx.js";import"./accordion-DmKbRome.js";import"./index-Bo3zG9re.js";import"./index-CXbXR19z.js";import"./index-DrOTWqKr.js";import"./Box-DPtprSKn.js";import"./Bell-BpU-YJt1.js";import"./PersonChat-CpOKKHPw.js";import"./Eye-CrcGAA7p.js";import"./ProgressBar-BzkJywX6.js";import"./useLatestRef-BqQYaUi9.js";import"./ShieldLock-DyQz3siX.js";import"./PadlockLocked-Cwh9yoGq.js";import"./EyeSlash-BSHFUth_.js";import"./CircleSlash-kpr4N1zJ.js";import"./Pencil-DdO3ejUt.js";import"./FullførStillingModal-2XHbRuDY.js";import"./PersonbrukerTekst-B4djchrY.js";import"./ClockDashed-ybRL1gL0.js";import"./IkonNavnAvatar-CuAcTev_.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-t2yVLEWU.js";import"./ErrorBoundary-CT8AkpPK.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
