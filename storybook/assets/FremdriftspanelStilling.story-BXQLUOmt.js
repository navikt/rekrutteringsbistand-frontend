import{aw as I,I as w,j as t,R as k,S as j,cu as x,cD as b,cC as g,cv as u,N as y,cW as N}from"./iframe-DBllXDE6.js";import{w as m,c as A}from"./ContextDecorators-B_BK9iNO.js";import{F as _,A as v}from"./FullførtStilling-CTu3xS7Q.js";import{R as T}from"./GjenåpneStillingKnapp-ClBlYsp8.js";import{T as D}from"./TilgangskontrollForInnhold-DH0aBv_S.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-kXblc7I7.js";import"./OrganisasjonsnummerAlert-ChauTF1b.js";import"./VStack-BD7vwMWP.js";import"./BasePrimitive-Dy27TjR7.js";import"./Box-B8ditvDu.js";import"./List-BHSGpnq6.js";import"./Link-X5_nQ1b-.js";import"./KandidatHendelseTag-BPulh5dW.js";import"./Tag-ppAPxM7K.js";import"./ChatExclamationmark-DwgjDjfq.js";import"./FileXMark-CS2GvD_8.js";import"./Trash-CPjP9X6q.js";import"./HandShakeHeart-YFQvRBxE.js";import"./Calendar-DtsvWMGM.js";import"./ThumbUp-BujwmZbZ.js";import"./ExclamationmarkTriangle-DgAc2FcK.js";import"./Table-DftGWK19.js";import"./index-DjVoES3y.js";import"./index-B40KJ5b4.js";import"./util-BOT7NFvd.js";import"./DatoVelger-CTyF01G0.js";import"./useDatepicker-DnBCo2GM.js";import"./useControllableState-DZW3T6vT.js";import"./Modal-DmtKZm1R.js";import"./floating-ui.react-nbAYDEcq.js";import"./useFormField-BLMEPMTS.js";import"./ReadMore-C7EYz7MB.js";import"./ChevronDown-CbQ61Nkw.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-XU4krQMi.js";import"./Modal.context-BeoIJEhX.js";import"./Popover-s67kx-HJ.js";import"./DismissableLayer-BqVzK-jb.js";import"./startOfMonth-CB6TPC31.js";import"./Select-BhXfbRVQ.js";import"./endOfMonth-B879teru.js";import"./ArrowLeft-_s_Y0DCh.js";import"./ArrowRight-BBFrPJDM.js";import"./isSameDay-BaNpmZQw.js";import"./Checkbox-Dgk0Xp9D.js";import"./Fieldset-CmKamos6.js";import"./accordion-Bp15wbe_.js";import"./index-N0notj_8.js";import"./index-C6aXPbPA.js";import"./index-tJRvMJAB.js";import"./ProgressBar-BzrSNAMa.js";import"./useValueAsRef-0W2mGnKO.js";import"./Bell-DA_9wT0w.js";import"./PersonChat-BE-pDjoc.js";import"./Eye-DtE8arco.js";import"./ShieldLock-rFo86pMI.js";import"./PadlockLocked-DJcynjAo.js";import"./EyeSlash-C0z7COp8.js";import"./CircleSlash-BFeQ1KgF.js";import"./Pencil-UV_U6fYC.js";import"./FullførStillingModal-CUY4wh2m.js";import"./PersonbrukerTekst-CJ9RokcU.js";import"./ClockDashed-crbn74Et.js";import"./IkonNavnAvatar-BE1d69Qy.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-hXMZlfti.js";import"./ErrorBoundary-Bhq-JYZB.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
