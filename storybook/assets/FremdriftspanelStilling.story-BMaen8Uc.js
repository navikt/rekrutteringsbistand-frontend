import{aq as I,J as w,j as t,R as k,S as j,cz as x,cI as b,cH as g,cA as u,O as y,c$ as _}from"./iframe-yXg8aEsL.js";import{w as m,c as D}from"./ContextDecorators-_ipd9bvG.js";import{F as N,A as v}from"./FullførtStilling-Bj2cy6kQ.js";import{R as T}from"./GjenåpneStillingKnapp-eAxw-BZG.js";import{T as A}from"./TilgangskontrollForInnhold-jp8h3Tpu.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BDyKeoaE.js";import"./OrganisasjonsnummerAlert-s4fW92DV.js";import"./VStack-Cxcn_djk.js";import"./BasePrimitive-Bdp6Kfrt.js";import"./List-Dq4QWm19.js";import"./Link-j0jrgpba.js";import"./KandidatHendelseTag-C-p0bX1_.js";import"./Tag-4Usza_qz.js";import"./ChatExclamationmark-CmbrZ5hr.js";import"./FileXMark-PuJkc4ng.js";import"./Trash-CyIGzQGq.js";import"./HandShakeHeart-DUqVn0Y2.js";import"./Calendar-Ct-DxQj0.js";import"./ThumbUp-C8bgAfyQ.js";import"./ExclamationmarkTriangle-DoAhAz0a.js";import"./Table-CEkJoP3c.js";import"./index-Cdb3ukf_.js";import"./index-B40KJ5b4.js";import"./util-DGJefGWE.js";import"./DatoVelger-gYlV5IPJ.js";import"./useDatepicker-p9eg2Fbq.js";import"./useControllableState-DktbU-4S.js";import"./Modal-0SB-MlR0.js";import"./floating-ui.react-gWPDQIqQ.js";import"./Date.Input-C9S36ulk.js";import"./useFormField-4LHn1pYA.js";import"./ChevronDown-h4edWzLe.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BajYG73Z.js";import"./Modal.context-BCDGvJ6o.js";import"./Popover-Dg8pA_Ed.js";import"./DismissableLayer-DuEJM6Bc.js";import"./startOfMonth-BgnbtCrc.js";import"./Select-CK55cUs_.js";import"./endOfMonth-CVuS9S6x.js";import"./ArrowLeft-Dp-ojYjr.js";import"./ArrowRight-CVL_Qk_s.js";import"./isSameDay-BdhcuSM4.js";import"./Checkbox-DmgvmDFI.js";import"./Fieldset-DUsTSiSM.js";import"./accordion-DwRTdjOa.js";import"./index-DTdC0Cxh.js";import"./index-DHd8xJth.js";import"./index-By_yiGhu.js";import"./Box-Ddg8qx2G.js";import"./Bell-Bv6d90Oj.js";import"./PersonChat-BUvg1pHK.js";import"./Eye-CZq95m5P.js";import"./ProgressBar-D6UBDK1m.js";import"./useLatestRef-DnPfkqAp.js";import"./ShieldLock-ycRjaZeR.js";import"./PadlockLocked-BJPdMG71.js";import"./EyeSlash-BFwgWHGp.js";import"./CircleSlash-DZtArsir.js";import"./Pencil-bhhIfHhV.js";import"./FullførStillingModal-jCsRBDxy.js";import"./PersonbrukerTekst-DfYPL7ID.js";import"./ClockDashed-C8f2BezV.js";import"./IkonNavnAvatar-CiHdONYc.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-C4-h8KMu.js";import"./ErrorBoundary-alrvFr4j.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Xt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
