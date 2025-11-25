import{aw as w,U as I,j as t,y as k,S as j,cz as x,cH as b,cG as g,cA as u,Y as y,c$ as _}from"./iframe-k3RGaKPd.js";import{w as m,c as D}from"./ContextDecorators-Dr1Ym308.js";import{F as N,A as v}from"./FullførtStilling-cHB_HIUl.js";import{R as T}from"./GjenåpneStillingKnapp-Bh3aYMV-.js";import{T as A}from"./TilgangskontrollForInnhold-DfQNoX2A.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DZQaD31H.js";import"./OrganisasjonsnummerAlert-DdVrF-pr.js";import"./VStack-gaRuQisA.js";import"./BasePrimitive-oWqdiEpB.js";import"./List-DO6c7SaU.js";import"./Link-m72qJRKd.js";import"./KandidatHendelseTag-BrAO8gll.js";import"./Tag-D2EE5Q68.js";import"./ChatExclamationmark-DF0O3gg9.js";import"./FileXMark-l5PPGv7A.js";import"./Trash-Y-vpwXcT.js";import"./HandShakeHeart-B3fF5Ubu.js";import"./Calendar-BYpfA5n7.js";import"./ThumbUp-Btvsstwl.js";import"./Table-BKOBBStb.js";import"./index-X_-WxcWH.js";import"./index-B40KJ5b4.js";import"./util-By0TYWmq.js";import"./DatoVelger-D_R9uQSh.js";import"./useDatepicker-zHdcGV6D.js";import"./useControllableState-GOU9ZhGX.js";import"./Modal-DgdEZW2q.js";import"./floating-ui.react-BKoOdG6k.js";import"./Date.Input-D2Xin510.js";import"./useFormField-CBigW7mh.js";import"./ChevronDown-jAKfA1Ii.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CfmyerqT.js";import"./Modal.context-D1Ki8ylF.js";import"./Popover-CNJvrg3T.js";import"./DismissableLayer-DyUQ-l04.js";import"./startOfMonth-BecWtx0Y.js";import"./Select-DjkNVpEn.js";import"./endOfMonth-BenpL-nH.js";import"./ArrowLeft-DhBZAHOr.js";import"./ArrowRight-kCGbtLZd.js";import"./isSameDay-DMZgP1pq.js";import"./Checkbox-DjAKc28s.js";import"./Fieldset-BtD8jH1F.js";import"./accordion-BzLMxFHc.js";import"./index-Bhj39NAI.js";import"./index-C-wQ4-Ep.js";import"./index-B58GVGpe.js";import"./Box-BivCqWL2.js";import"./Bell-CEzY7Iyr.js";import"./PersonChat-Bl9isD4p.js";import"./Eye-BCsIhUKk.js";import"./ProgressBar-BdFGZUcA.js";import"./useLatestRef-BYT0Wjj3.js";import"./EyeSlash-DNIAta31.js";import"./CircleSlash-DM72WGCQ.js";import"./Pencil-BF6DDj5t.js";import"./FullførStillingModal-DZBPBIn2.js";import"./PersonbrukerTekst-BR3WAK6r.js";import"./ClockDashed-B9dbyvTm.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-C877LlaK.js";import"./ErrorBoundary-l81QJ2_Y.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const zt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,zt as default};
