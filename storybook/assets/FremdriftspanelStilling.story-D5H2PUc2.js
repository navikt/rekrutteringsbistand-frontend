import{aq as I,J as w,j as t,R as k,S as j,cz as x,cI as b,cH as g,cA as u,O as y,c$ as _}from"./iframe-V8deF7AU.js";import{w as m,c as D}from"./ContextDecorators-CEn5GkJK.js";import{F as N,A as v}from"./FullførtStilling-CblfU4WJ.js";import{R as T}from"./GjenåpneStillingKnapp-BltfmRBu.js";import{T as A}from"./TilgangskontrollForInnhold-BgzRJSsi.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CKbhKpGW.js";import"./OrganisasjonsnummerAlert-DCAdZLhF.js";import"./VStack-4hphIx77.js";import"./BasePrimitive-DojJiNHv.js";import"./List-BMjmv9Dz.js";import"./Link-D4MbMoav.js";import"./KandidatHendelseTag-DJa--HJX.js";import"./Tag-t-mS956V.js";import"./ChatExclamationmark-D4jAP78d.js";import"./FileXMark-CyITHuIm.js";import"./Trash-Z3qgeSL3.js";import"./HandShakeHeart-CE085DT4.js";import"./Calendar-BGVAPjpH.js";import"./ThumbUp-CKqB7qDV.js";import"./ExclamationmarkTriangle-1XwdyIBw.js";import"./Table-bvu5gXu-.js";import"./index-WQZ1lYgR.js";import"./index-B40KJ5b4.js";import"./util-CZlB0KAF.js";import"./DatoVelger-BWecA_us.js";import"./useDatepicker-BpUib0Gc.js";import"./useControllableState-BrD3n7yG.js";import"./Modal-BdZR828k.js";import"./floating-ui.react-EAeme2qu.js";import"./Date.Input-B5CGs7IV.js";import"./useFormField-BI6hugGR.js";import"./ChevronDown-GlmJUWNv.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CubqqCOH.js";import"./Modal.context-CGw18QOf.js";import"./Popover-pXnfkEep.js";import"./DismissableLayer-Bcdf3wle.js";import"./startOfMonth-cYjV7MYs.js";import"./Select-D5euoHNw.js";import"./endOfMonth-D1zIuvlW.js";import"./ArrowLeft-BR1pr9KO.js";import"./ArrowRight-CCvbwbm_.js";import"./isSameDay-BBFT3GOA.js";import"./Checkbox-C5Z_n-Wo.js";import"./Fieldset-B9zjQqEP.js";import"./accordion-sdyZCm9W.js";import"./index-dmUyfUXY.js";import"./index-DzLrlhVs.js";import"./index-D7Uuz2H_.js";import"./Box-BTlDcf1h.js";import"./Bell-D4WG9tU9.js";import"./PersonChat-BHl-zk8U.js";import"./Eye-Bk2ChW5a.js";import"./ProgressBar-Dxg_xlUc.js";import"./useLatestRef-Ux7Gc1MN.js";import"./ShieldLock-B_VBFtF9.js";import"./PadlockLocked-dYzgzMmb.js";import"./EyeSlash-mTDElld2.js";import"./CircleSlash-zYCb7v28.js";import"./Pencil-DCwaRQZg.js";import"./FullførStillingModal-R1nmdCRe.js";import"./PersonbrukerTekst-BERHwmfv.js";import"./ClockDashed-C9Pl0edn.js";import"./IkonNavnAvatar-Dxy5rfq_.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-DPTFAyoh.js";import"./ErrorBoundary-CT4pc005.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Xt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
