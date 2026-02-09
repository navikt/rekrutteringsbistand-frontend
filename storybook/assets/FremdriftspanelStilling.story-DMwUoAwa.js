import{aw as I,I as w,j as t,R as k,S as j,cu as x,cD as b,cC as g,cv as u,N as y,cW as N}from"./iframe-BA8NGl8Z.js";import{w as m,c as A}from"./ContextDecorators-ChcCfxsU.js";import{F as _,A as v}from"./FullførtStilling-0jX0oOFU.js";import{R as T}from"./GjenåpneStillingKnapp-XASAf70o.js";import{T as D}from"./TilgangskontrollForInnhold-uCmXYVpo.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CxoF-fzq.js";import"./OrganisasjonsnummerAlert-Dkf9eg_y.js";import"./VStack-Kc3uDync.js";import"./BasePrimitive-DVQzxbgB.js";import"./Box-QiYsNTYh.js";import"./List-BLBE283a.js";import"./Link-DuDyUj0y.js";import"./KandidatHendelseTag-Dxvy0j_v.js";import"./Tag-DJO1ZEnS.js";import"./ChatExclamationmark-CIA0LWMm.js";import"./FileXMark-BF3VFzMY.js";import"./Trash-D5CVVktL.js";import"./HandShakeHeart-BbCuuX07.js";import"./Calendar-BtfCCLae.js";import"./ThumbUp-Bu5VGlTV.js";import"./ExclamationmarkTriangle-DTZLN61C.js";import"./Table-b9WZVWIS.js";import"./index-DC2vRRA7.js";import"./index-B40KJ5b4.js";import"./util-Cn0sHhFJ.js";import"./DatoVelger-joo__duc.js";import"./useDatepicker-B2cKbVpu.js";import"./useControllableState-BKzc71DB.js";import"./Modal-owe8sJ8N.js";import"./floating-ui.react-6WPeK0Ep.js";import"./useFormField-C2zx6Vke.js";import"./ReadMore-evtPe4OF.js";import"./ChevronDown-CzujMlO1.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CiWpgXLp.js";import"./Modal.context-Cgdz-tcK.js";import"./Popover-D8rwaXd8.js";import"./DismissableLayer-hP1yz2kw.js";import"./startOfMonth-Dsj-Zmnp.js";import"./Select-ClKS6K9b.js";import"./endOfMonth-1rg2ySqA.js";import"./ArrowLeft-PFDBl7Cg.js";import"./ArrowRight-Boeq9_sm.js";import"./isSameDay-B3xvRh5M.js";import"./Checkbox-CNQRR0dN.js";import"./Fieldset-Dng_cqEy.js";import"./accordion-DGUlZVlp.js";import"./index-CGRE4R_L.js";import"./index-gUCdLGFV.js";import"./index-DQrPXybH.js";import"./ProgressBar-BwKr_2JR.js";import"./useValueAsRef-O8V3Mha_.js";import"./Bell-8EOt5JVJ.js";import"./PersonChat-DlI5QIzh.js";import"./Eye-keNB3RAP.js";import"./ShieldLock-Ck6rKt9W.js";import"./PadlockLocked-hEM943XN.js";import"./EyeSlash-CN42IrMe.js";import"./CircleSlash-hr5OEWLL.js";import"./Pencil-CZYzuOZO.js";import"./FullførStillingModal-D4GSQq7J.js";import"./PersonbrukerTekst-H3zMBUFH.js";import"./ClockDashed-iE92oQuj.js";import"./IkonNavnAvatar-DwC2JBt7.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-CpfRDiCI.js";import"./ErrorBoundary-BcTHhzRi.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
