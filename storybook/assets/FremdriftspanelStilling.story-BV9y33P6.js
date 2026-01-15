import{aq as w,J as I,j as t,R as k,S as j,cn as x,cw as b,cv as g,co as u,O as y,cP as _}from"./iframe-CIDC3Z6q.js";import{w as m,c as D}from"./ContextDecorators-BCci1QKh.js";import{F as N,A as v}from"./FullførtStilling-DyoivmBt.js";import{R as T}from"./GjenåpneStillingKnapp-CRTg3Lfj.js";import{T as A}from"./TilgangskontrollForInnhold-DD1P_g94.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-watgMLoN.js";import"./OrganisasjonsnummerAlert-BaynNlkq.js";import"./VStack-B9vhOXzh.js";import"./BasePrimitive-BenqU5Ny.js";import"./List-DrNKfggA.js";import"./Link-CGl9Recr.js";import"./KandidatHendelseTag-DKzSSGOG.js";import"./Tag-bdB-v9K4.js";import"./ChatExclamationmark-B8sPg0st.js";import"./FileXMark-Cx41xJB4.js";import"./Trash-BIJDRe3Q.js";import"./HandShakeHeart-D8LWJ5fd.js";import"./Calendar-U8EZjtNx.js";import"./ThumbUp-DD_qpRFb.js";import"./ExclamationmarkTriangle-DGtk2zqK.js";import"./Table-BsDh2VfC.js";import"./index-B71oAnfL.js";import"./index-B40KJ5b4.js";import"./util-CPo_B2nz.js";import"./DatoVelger-CvEnWWZI.js";import"./useDatepicker-DtH410im.js";import"./useControllableState-zwJkXhKO.js";import"./Modal-Do1NnOqH.js";import"./floating-ui.react-Bn_hf3YY.js";import"./Date.Input-C_TK-f3Y.js";import"./useFormField-TVXsso69.js";import"./ChevronDown-BdFEv6NO.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DVrPlUWd.js";import"./Modal.context-BU5Stcmk.js";import"./Popover-F30jyWkN.js";import"./DismissableLayer-BMWwLBet.js";import"./startOfMonth-qKwQbLeD.js";import"./Select-BBWIGXCy.js";import"./endOfMonth-B1F4McCY.js";import"./ArrowLeft-BhqKbk8x.js";import"./ArrowRight-ChCd9-LX.js";import"./isSameDay-fsrRvabK.js";import"./Checkbox-CKgqiYGJ.js";import"./Fieldset-Bg58z1g1.js";import"./accordion-CbOFYhrt.js";import"./index-D-UpBSDG.js";import"./index-BcKU3Gbs.js";import"./index-Y8ga7zgx.js";import"./Box-BZYUJFe2.js";import"./Bell-Dvl5kXEn.js";import"./PersonChat-DWalmx70.js";import"./Eye-6Q4-LbaB.js";import"./ProgressBar-DT77SL7K.js";import"./useLatestRef-DLTJIpGN.js";import"./ShieldLock-C4HlNzer.js";import"./PadlockLocked-DVFkJPL8.js";import"./EyeSlash-BVuUe9kl.js";import"./CircleSlash-CdyY8-bi.js";import"./Pencil-DPUfBzm6.js";import"./FullførStillingModal-DpI0i-N2.js";import"./PersonbrukerTekst-B0hbLv7D.js";import"./ClockDashed-DRAvPVLv.js";import"./IkonNavnAvatar-DbRALfBb.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-BpDSaOiE.js";import"./ErrorBoundary--JG_4Ym2.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
