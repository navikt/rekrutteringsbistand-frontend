import{aq as w,J as I,j as t,R as k,S as j,cn as x,cw as b,cv as g,co as u,O as y,cP as _}from"./iframe-CRqPxp4c.js";import{w as m,c as D}from"./ContextDecorators-Dinx1zvi.js";import{F as N,A as v}from"./FullførtStilling-DJEuT-IZ.js";import{R as T}from"./GjenåpneStillingKnapp-DAq7Qoh9.js";import{T as A}from"./TilgangskontrollForInnhold-DtEsGH0i.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CVDxtMOc.js";import"./OrganisasjonsnummerAlert-4egePmqO.js";import"./VStack-8laNy6VZ.js";import"./BasePrimitive-DvHygoSy.js";import"./List-YyaVop-Q.js";import"./Link-CAniOPY2.js";import"./KandidatHendelseTag-DT02Bzbe.js";import"./Tag-BFrqR_IL.js";import"./ChatExclamationmark-k3SjiZ8B.js";import"./FileXMark-BsJB8mGI.js";import"./Trash-Dew1RFZr.js";import"./HandShakeHeart-BXBye7V1.js";import"./Calendar-Tt61gXfq.js";import"./ThumbUp-DcV-0-R1.js";import"./ExclamationmarkTriangle-D9ApQaQm.js";import"./Table-BDHm5sZI.js";import"./index-CyJSIw2Q.js";import"./index-B40KJ5b4.js";import"./util-B7_srA5m.js";import"./DatoVelger-a9w3guEQ.js";import"./useDatepicker-BdWtHVN4.js";import"./useControllableState-Ciifist9.js";import"./Modal-DVYTvZJK.js";import"./floating-ui.react-BAFwGOOf.js";import"./Date.Input-Cq3oe4Uu.js";import"./useFormField-DBVEuA_2.js";import"./ChevronDown-BI71OKS5.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DeH1onQT.js";import"./Modal.context-hrHc4u5t.js";import"./Popover-BpD41cX2.js";import"./DismissableLayer-AMGQ8mwJ.js";import"./startOfMonth-DxfAhjHG.js";import"./Select-P1pXfv8c.js";import"./endOfMonth-BPcRyqx7.js";import"./ArrowLeft-C-3LECHd.js";import"./ArrowRight-Q-ZaUBVX.js";import"./isSameDay-CyG-FCpE.js";import"./Checkbox--X-PNH98.js";import"./Fieldset-Bd2ZPuwD.js";import"./accordion-CsQyzO0M.js";import"./index-Dw60PXEa.js";import"./index-CH1ZVItt.js";import"./index-D7euW-yi.js";import"./Box-C8Sn3O_o.js";import"./Bell-DOzD5P5W.js";import"./PersonChat-C31zmiPS.js";import"./Eye-D5MJI81x.js";import"./ProgressBar-CAzHfi8y.js";import"./useLatestRef-CrblMTmW.js";import"./ShieldLock-DJpOOfyH.js";import"./PadlockLocked-D0Y-cdwq.js";import"./EyeSlash-PGHLhUgw.js";import"./CircleSlash-BiCwzCN1.js";import"./Pencil-Du_KOvtu.js";import"./FullførStillingModal-COz4whq_.js";import"./PersonbrukerTekst-D2GO5y47.js";import"./ClockDashed-arcq4n_k.js";import"./IkonNavnAvatar-BZMT7V4G.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-BlZYjrlq.js";import"./ErrorBoundary-DBvBvELC.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
