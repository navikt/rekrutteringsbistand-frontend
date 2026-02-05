import{aw as I,I as w,j as t,R as k,S as j,ct as x,cC as b,cB as g,cu as u,N as y,cV as N}from"./iframe-BQn8oluG.js";import{w as m,c as D}from"./ContextDecorators-BGleOMF3.js";import{F as _,A as v}from"./FullførtStilling-BWvKjQnD.js";import{R as T}from"./GjenåpneStillingKnapp-DtfEw16y.js";import{T as A}from"./TilgangskontrollForInnhold-CS__xBWO.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CyhOc4oz.js";import"./OrganisasjonsnummerAlert-CYywNrcV.js";import"./VStack-CusJYT2i.js";import"./BasePrimitive-3X9LqDm9.js";import"./Box-DVLWXHQE.js";import"./List-CqxD3cjY.js";import"./Link-DWvxLqKl.js";import"./KandidatHendelseTag-B7uUE2XF.js";import"./Tag-BzqTsz9d.js";import"./ChatExclamationmark-DrTYDI0x.js";import"./FileXMark-Bi4WPtJY.js";import"./Trash-DGqxjYj7.js";import"./HandShakeHeart--0XvPa6w.js";import"./Calendar-BYG-Fmtl.js";import"./ThumbUp-IEtKGI8o.js";import"./ExclamationmarkTriangle-Cj19ZXv-.js";import"./Table-Cq7taEiR.js";import"./index-ufCrU90i.js";import"./index-B40KJ5b4.js";import"./util-CRfPFknI.js";import"./DatoVelger-DwoKHhd-.js";import"./useDatepicker-D8tHcUA-.js";import"./useControllableState-CCj747yy.js";import"./Modal-BbI0nr47.js";import"./floating-ui.react-DIZNPFob.js";import"./useFormField-QYCCEhIW.js";import"./ReadMore-BtbbZnCJ.js";import"./ChevronDown-0_y9Wyb-.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BACD_49t.js";import"./Modal.context-DNTgIFxy.js";import"./Popover-BAEE-vBK.js";import"./DismissableLayer-BdYCKIFL.js";import"./startOfMonth-BrFG_gj_.js";import"./Select-CSpy88kQ.js";import"./endOfMonth-BI4yYAKF.js";import"./ArrowLeft-5b92leOx.js";import"./ArrowRight-DZi2fwI9.js";import"./isSameDay-MPJHTsWR.js";import"./Checkbox-Cvk_KH4k.js";import"./Fieldset-BRdMWvyq.js";import"./accordion-CrAtbaic.js";import"./index-CtHIrWUu.js";import"./index-CsD-8_SF.js";import"./index-DZHC-nAt.js";import"./ProgressBar-BaevLEvD.js";import"./useValueAsRef-Kuu0acC8.js";import"./Bell-CAVtXBNd.js";import"./PersonChat-DOmJ_HVO.js";import"./Eye-Dk-0nZAN.js";import"./ShieldLock-DkU5hz-u.js";import"./PadlockLocked-CFJJuuHv.js";import"./EyeSlash-SKvO28SV.js";import"./CircleSlash-DYOFeomK.js";import"./Pencil-e2_-rxFO.js";import"./FullførStillingModal-KTvTMmao.js";import"./PersonbrukerTekst-B0XbPShO.js";import"./ClockDashed-govDpSS6.js";import"./IkonNavnAvatar-fQ5o5Sfp.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-DWH_7Y7Q.js";import"./ErrorBoundary-ChHFXJzJ.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
