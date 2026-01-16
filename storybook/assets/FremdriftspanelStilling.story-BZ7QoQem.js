import{aq as w,J as I,j as t,R as k,S as j,cn as x,cw as b,cv as g,co as u,O as y,cP as _}from"./iframe-Ik8kw4Ju.js";import{w as m,c as D}from"./ContextDecorators-BVYv83kG.js";import{F as N,A as v}from"./FullførtStilling-DlGgXnFX.js";import{R as T}from"./GjenåpneStillingKnapp-BgMRALXI.js";import{T as A}from"./TilgangskontrollForInnhold-B-ZPYVI7.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DQ_rsbH0.js";import"./OrganisasjonsnummerAlert-BVUVbGru.js";import"./VStack-DtMoho4C.js";import"./BasePrimitive-CspwQbfs.js";import"./List-U0SSBVNs.js";import"./Link-Cau-CVIv.js";import"./KandidatHendelseTag-BlAh3-Nj.js";import"./Tag-DY7FqA44.js";import"./ChatExclamationmark-pwY1T5Ym.js";import"./FileXMark-vBOOE6wq.js";import"./Trash-BTctDNVN.js";import"./HandShakeHeart-BFdjLwtT.js";import"./Calendar-CdKvi8Wq.js";import"./ThumbUp-BdureR0h.js";import"./ExclamationmarkTriangle-iP216GN2.js";import"./Table-CZR_oYYA.js";import"./index-UR0OcfYb.js";import"./index-B40KJ5b4.js";import"./util-CPxhl3rq.js";import"./DatoVelger-BtToX6Mj.js";import"./useDatepicker-D_msJE9O.js";import"./useControllableState-p63OqQmu.js";import"./Modal-B8Jp1lwE.js";import"./floating-ui.react-CfN5WK7s.js";import"./Date.Input-CItyK-0t.js";import"./useFormField-C9ee2YVq.js";import"./ChevronDown-C5cV2XA7.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CPiUCbX0.js";import"./Modal.context-paBkLDd3.js";import"./Popover-00KpZIRV.js";import"./DismissableLayer-OgsdA99v.js";import"./startOfMonth-BSk-GP81.js";import"./Select-D-QpA3rR.js";import"./endOfMonth-u0mhyDUJ.js";import"./ArrowLeft-B6XiErEA.js";import"./ArrowRight-DNTx13oy.js";import"./isSameDay-CBu46qlP.js";import"./Checkbox-nE8PMs-p.js";import"./Fieldset-CILIGRRo.js";import"./accordion-DwrMw1IK.js";import"./index-CL3b_Dqj.js";import"./index--J-mvXji.js";import"./index-D13zZy1_.js";import"./Box-BWZ25AKe.js";import"./Bell-XdhZ4Wmj.js";import"./PersonChat-CMMDqnJX.js";import"./Eye-DDC3sn_r.js";import"./ProgressBar-lu_GW5_2.js";import"./useLatestRef-C0uG3_ei.js";import"./ShieldLock-DxARFnC_.js";import"./PadlockLocked-uBOe8i3C.js";import"./EyeSlash-CKyYSOGF.js";import"./CircleSlash-BrgUNtHo.js";import"./Pencil-CtHNJSS0.js";import"./FullførStillingModal-BXXwvM-t.js";import"./PersonbrukerTekst-BG7DeB3s.js";import"./ClockDashed-BGTgZxTv.js";import"./IkonNavnAvatar-tc-NkB_V.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-Dna7cAER.js";import"./ErrorBoundary-CK2Ufzf8.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
