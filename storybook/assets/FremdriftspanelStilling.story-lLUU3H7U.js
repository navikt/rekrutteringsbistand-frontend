import{aL as I,Q as w,j as t,w as k,S as j,cA as x,cI as b,cH as g,cB as u,W as y,cX as _}from"./iframe-rYPfMBZN.js";import{w as m,c as D}from"./ContextDecorators-BmLgTRAj.js";import{F as N,A as v}from"./FullførtStilling-CcqxPCxb.js";import{R as T}from"./GjenåpneStillingKnapp-C_nLPEEx.js";import{T as A}from"./TilgangskontrollForInnhold-CoTA01pm.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CRs4GM_E.js";import"./OrganisasjonsnummerAlert-5FZV-rbs.js";import"./VStack-Dz8JjFOb.js";import"./BasePrimitive-BjjeF53e.js";import"./List-RRGcFP05.js";import"./Link-C4T7rFE7.js";import"./KandidatHendelseTag-DhnFAsz8.js";import"./Tag-D1HC3pBs.js";import"./ChatExclamationmark-BbdR5dOM.js";import"./FileXMark-wIvuJboS.js";import"./Trash-Rii4rBtB.js";import"./HandShakeHeart-BWHURL8t.js";import"./Calendar-D_VD61zK.js";import"./ThumbUp-BptVK7Yp.js";import"./Table-Du570W8P.js";import"./dato-SoR29OEJ.js";import"./parse-Cl8XmbO4.js";import"./getDefaultOptions-D9iGir7p.js";import"./parseISO-BbVHBu92.js";import"./index-C65XzgtL.js";import"./index-B40KJ5b4.js";import"./util-BOIkYAu6.js";import"./DatoVelger-CttmtxMt.js";import"./useDatepicker-3k7NVkvM.js";import"./useControllableState-mFgUgRJs.js";import"./Modal-CfdjlllU.js";import"./floating-ui.react-BmyHG_a9.js";import"./Date.Input-BERDNUCe.js";import"./useFormField-BMrBnHTm.js";import"./ChevronDown-HMna1nBJ.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DZErODHj.js";import"./Modal.context-B4QjZZ9Z.js";import"./Popover-B7eiM7Ev.js";import"./DismissableLayer-C3TXeR6u.js";import"./startOfMonth-lLA2z23Z.js";import"./Select-DoN0bM54.js";import"./endOfMonth-BkdB3jpG.js";import"./ArrowLeft-pt6xPYCg.js";import"./ArrowRight-CX-hmoOC.js";import"./isSameDay-DHlZXgo5.js";import"./Checkbox-DNCy0HYq.js";import"./Fieldset-DApd9fd6.js";import"./accordion-CB8gX5DN.js";import"./index-4JI_JamW.js";import"./index-BoQnMEwM.js";import"./index-Bqt1eVee.js";import"./Box-DIyig4mL.js";import"./Bell-SzlE1QID.js";import"./PersonChat-C5YC_rIz.js";import"./Eye-BLKR_ua0.js";import"./ProgressBar-CaXlFk2E.js";import"./useLatestRef-BWexI1Gs.js";import"./EyeSlash-D3lyoMXb.js";import"./CircleSlash-CVacucUB.js";import"./Pencil-BbKj2ThV.js";import"./FullførStillingModal-BxNVPWpH.js";import"./PersonbrukerTekst-CST7lO37.js";import"./ClockDashed-z1kXElry.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-DvvVjELh.js";import"./ErrorBoundary-dd8edXFP.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
