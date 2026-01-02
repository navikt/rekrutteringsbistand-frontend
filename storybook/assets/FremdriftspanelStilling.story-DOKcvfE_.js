import{aq as I,J as w,j as t,R as k,S as j,cz as x,cI as b,cH as g,cA as u,O as y,c$ as _}from"./iframe-BCPU83ju.js";import{w as m,c as D}from"./ContextDecorators-C32Uu8nB.js";import{F as N,A as v}from"./FullførtStilling-DRZp0mzw.js";import{R as T}from"./GjenåpneStillingKnapp-wFIsAi4R.js";import{T as A}from"./TilgangskontrollForInnhold-bW4Utizl.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-SWJxKa3q.js";import"./OrganisasjonsnummerAlert-B9fdaAF-.js";import"./VStack-BIz_V_1H.js";import"./BasePrimitive-C43Zdv_H.js";import"./List-DE7Xqmfm.js";import"./Link-BsYdxGte.js";import"./KandidatHendelseTag-CepaBxAT.js";import"./Tag-BRiTi-pB.js";import"./ChatExclamationmark-z02UnKbf.js";import"./FileXMark-DpM3u4VL.js";import"./Trash-Cta86JYs.js";import"./HandShakeHeart-BjjfjrpZ.js";import"./Calendar-CrUnjqKD.js";import"./ThumbUp-DJ19LnAF.js";import"./ExclamationmarkTriangle-BA7dsrnv.js";import"./Table-DXeSb6gu.js";import"./index-iHPVhBfh.js";import"./index-B40KJ5b4.js";import"./util-DoVIJkK9.js";import"./DatoVelger-C9-rVb3N.js";import"./useDatepicker-C73WfcDp.js";import"./useControllableState-BmfeGQkw.js";import"./Modal-BBM7lRpi.js";import"./floating-ui.react-CkmWww4U.js";import"./Date.Input-DKZMtCa6.js";import"./useFormField-CPCdGz6D.js";import"./ChevronDown-j4ejZ-3f.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C0hqye8N.js";import"./Modal.context-WcZRHucM.js";import"./Popover-DGBcDy_L.js";import"./DismissableLayer-CPHSRetD.js";import"./startOfMonth-BKdMGcsG.js";import"./Select-NERykBze.js";import"./endOfMonth-5XmdmB2G.js";import"./ArrowLeft-Bvx2aS9J.js";import"./ArrowRight-CMqp9dJ0.js";import"./isSameDay-Bq_BJ_Dw.js";import"./Checkbox-DXH8f1NQ.js";import"./Fieldset-DnHNv9sU.js";import"./accordion-DNsdjMHn.js";import"./index-iSDjZFJI.js";import"./index-C2bVYmdU.js";import"./index-Dnvx_gIu.js";import"./Box-8WIwS4-z.js";import"./Bell-DN0MtTU7.js";import"./PersonChat-B0Ou65XE.js";import"./Eye-zdfWdiVn.js";import"./ProgressBar-C5qb7c81.js";import"./useLatestRef-93o6EXzC.js";import"./ShieldLock-BHiOvoUh.js";import"./PadlockLocked-LpCR6Gwj.js";import"./EyeSlash-Cf09Ds6b.js";import"./CircleSlash-nt1b4HFI.js";import"./Pencil-DxLkemFI.js";import"./FullførStillingModal-BoMgJ9Nw.js";import"./PersonbrukerTekst-BaRwS4QP.js";import"./ClockDashed-C_XdSu93.js";import"./IkonNavnAvatar-1rZlKTMI.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-DmZT6r9T.js";import"./ErrorBoundary-CxDmIjJ-.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Xt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Xt as default};
