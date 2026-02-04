import{aw as I,I as w,j as t,R as k,S as j,ct as x,cC as b,cB as g,cu as u,N as y,cV as N}from"./iframe-BjEgG8Bz.js";import{w as m,c as D}from"./ContextDecorators-D_NaaITc.js";import{F as _,A as v}from"./FullførtStilling-BO69wcUJ.js";import{R as T}from"./GjenåpneStillingKnapp-CQc9dCsM.js";import{T as A}from"./TilgangskontrollForInnhold-BhhmmzRu.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CqAnCG-y.js";import"./OrganisasjonsnummerAlert-DF_RoieK.js";import"./VStack-DIKon2VT.js";import"./BasePrimitive-B0t64DbI.js";import"./Box-ByEKtJEc.js";import"./List-RFuLUqQ4.js";import"./Link-ChdFwBS1.js";import"./KandidatHendelseTag-B54LIVIK.js";import"./Tag-BQZGLJBi.js";import"./ChatExclamationmark-LdK6mvnt.js";import"./FileXMark-DBbj60vg.js";import"./Trash-CzOzhYhB.js";import"./HandShakeHeart-B-lHUtgJ.js";import"./Calendar-wRSe2NZ1.js";import"./ThumbUp-B2nMwgVw.js";import"./ExclamationmarkTriangle-D-jj1427.js";import"./Table-CqOTa5Ih.js";import"./index-C2glyhwD.js";import"./index-B40KJ5b4.js";import"./util-Cf5Ur_0N.js";import"./DatoVelger-CHLcgxP5.js";import"./useDatepicker-DiZj6UXw.js";import"./useControllableState-C98CIYum.js";import"./Modal-DfFPtuN9.js";import"./floating-ui.react-B2Z9rU6x.js";import"./useFormField-PRfv3Od9.js";import"./ReadMore-DOJ4P9sL.js";import"./ChevronDown-BgT3NBPr.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BNLWoC8N.js";import"./Modal.context-C6v3fOVZ.js";import"./Popover-qj8UGUCK.js";import"./DismissableLayer-C6zBdjV7.js";import"./startOfMonth-B6V9bX3m.js";import"./Select-Ow5cAqYV.js";import"./endOfMonth-fx3sokTU.js";import"./ArrowLeft-Ctb0A3zx.js";import"./ArrowRight-7RxWRpWZ.js";import"./isSameDay-CJmntGNf.js";import"./Checkbox-C-M-aqeG.js";import"./Fieldset-zNBqTEpu.js";import"./accordion-Cx1uTGwF.js";import"./index-CW-GlC2z.js";import"./index-gFqGN2bV.js";import"./index-DjNO_pP7.js";import"./ProgressBar-CpNFKsMK.js";import"./useValueAsRef-Z-j3zBaU.js";import"./Bell-B9AJ_4gb.js";import"./PersonChat-BOSiHkvU.js";import"./Eye-DoFQTXuw.js";import"./ShieldLock-Bzc_mrZd.js";import"./PadlockLocked-BMp3J0B7.js";import"./EyeSlash-B_7xDnRq.js";import"./CircleSlash-DeVmcSHM.js";import"./Pencil-D23ixREo.js";import"./FullførStillingModal-CYhIKgav.js";import"./PersonbrukerTekst-Dg5WARsC.js";import"./ClockDashed-QQVhCsgJ.js";import"./IkonNavnAvatar-Dn5Gqhxu.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-B9nsspDw.js";import"./ErrorBoundary-BhxDbTpW.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
