import{aq as I,J as w,j as t,R as k,S as j,cA as x,cJ as b,cI as g,cB as u,O as y,d0 as _}from"./iframe-8sML1qxS.js";import{w as m,c as D}from"./ContextDecorators-BovREMEs.js";import{F as N,A as v}from"./FullførtStilling-SYmI_L7y.js";import{R as T}from"./GjenåpneStillingKnapp-BwUzcako.js";import{T as A}from"./TilgangskontrollForInnhold-DXW42CRm.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DRigmI8a.js";import"./OrganisasjonsnummerAlert-BkRpSSfw.js";import"./VStack-DRwdmI3-.js";import"./BasePrimitive-BmqLDMuc.js";import"./List-BflqGauY.js";import"./Link-CS_39ATQ.js";import"./KandidatHendelseTag-DuddxgxS.js";import"./Tag-Cx8h0QcD.js";import"./ChatExclamationmark-DaCv-sla.js";import"./FileXMark-DT43kFyy.js";import"./Trash-DtE42QsC.js";import"./HandShakeHeart-DLBEN19F.js";import"./Calendar-CO5LFH_s.js";import"./ThumbUp-C2NOdUm1.js";import"./ExclamationmarkTriangle-4tCFwl3B.js";import"./Table-DhjErmmF.js";import"./index-DPXZmGOL.js";import"./index-B40KJ5b4.js";import"./util-B1cpXv4o.js";import"./DatoVelger-GmZqt4jG.js";import"./useDatepicker-SR-pd9Xf.js";import"./useControllableState-C6Xv7p8h.js";import"./Modal-pMute4gH.js";import"./floating-ui.react-OMGuPjdp.js";import"./Date.Input-VTQIO55Q.js";import"./useFormField-U6a8lsCF.js";import"./ChevronDown-Ba2f5nE9.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CVhQb8QH.js";import"./Modal.context-DE6FvpHB.js";import"./Popover-DuKik7fa.js";import"./DismissableLayer-Bl2AF_UL.js";import"./startOfMonth-6AJTV8aH.js";import"./Select-DxkaSACb.js";import"./endOfMonth-DVVR8Mcg.js";import"./ArrowLeft-DjnIFbXq.js";import"./ArrowRight-ByCS1gfH.js";import"./isSameDay-B2Y-ysq8.js";import"./Checkbox-DbfyoACS.js";import"./Fieldset-BOAdrffR.js";import"./accordion-aI2H-Bnn.js";import"./index-CMnoNsaT.js";import"./index-Ba6N7Afz.js";import"./index-DA1dPdxn.js";import"./Box-D4ffITnj.js";import"./Bell-aqdgQ2QP.js";import"./PersonChat-CLOXZH5Z.js";import"./Eye-BKYyfj90.js";import"./ProgressBar-Be2XKJFk.js";import"./useLatestRef-Bc6puf5m.js";import"./ShieldLock-B4l8djla.js";import"./PadlockLocked-pBwoGAXl.js";import"./EyeSlash-DeLtYgZW.js";import"./CircleSlash-BeN51Jme.js";import"./Pencil-DPsrTn0G.js";import"./FullførStillingModal-qBMhOb84.js";import"./PersonbrukerTekst-BajhitiB.js";import"./ClockDashed-C7g6KhCI.js";import"./IkonNavnAvatar-ByTd015x.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-BSxfmMun.js";import"./ErrorBoundary-HKCBm9Ve.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
