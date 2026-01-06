import{aq as I,J as w,j as t,R as k,S as j,cA as x,cJ as b,cI as g,cB as u,O as y,d0 as _}from"./iframe-BYISswbs.js";import{w as m,c as D}from"./ContextDecorators-B5GHDvbu.js";import{F as N,A as v}from"./FullførtStilling-D6PFzMtl.js";import{R as T}from"./GjenåpneStillingKnapp-BPJ91oIq.js";import{T as A}from"./TilgangskontrollForInnhold-BaueffuH.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BaZtCo5m.js";import"./OrganisasjonsnummerAlert-CqzePRBy.js";import"./VStack-CFJ3tPOL.js";import"./BasePrimitive-CtkwkOJy.js";import"./List-BzdgGNSZ.js";import"./Link-CbujZ1sb.js";import"./KandidatHendelseTag-nra8tFi-.js";import"./Tag-D22eWKzC.js";import"./ChatExclamationmark-DFvXRn5F.js";import"./FileXMark-B5wZpbyl.js";import"./Trash-9nM6IHnp.js";import"./HandShakeHeart-DPnFj-9F.js";import"./Calendar-d4CBC7_P.js";import"./ThumbUp-DlM8UKEn.js";import"./ExclamationmarkTriangle-DszJHhmG.js";import"./Table-4YP9nRVg.js";import"./index-BEl2lAyJ.js";import"./index-B40KJ5b4.js";import"./util-BeZJZ_MM.js";import"./DatoVelger-CCE0rh8o.js";import"./useDatepicker-DQm9n4RI.js";import"./useControllableState-C4jTtRT3.js";import"./Modal-BXSPKmam.js";import"./floating-ui.react-DcW5Mqvr.js";import"./Date.Input-DsBuwcal.js";import"./useFormField-XJ0gedfQ.js";import"./ChevronDown-Cu0PDR1P.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CKwr79zC.js";import"./Modal.context-B2PCIQn6.js";import"./Popover-DZ8cLWws.js";import"./DismissableLayer-C7ReiRv2.js";import"./startOfMonth-5MSar6do.js";import"./Select-B0x4ajyI.js";import"./endOfMonth-B0r8_fnu.js";import"./ArrowLeft-nYPLtOI6.js";import"./ArrowRight-D-ZqzBqG.js";import"./isSameDay-THvNKQra.js";import"./Checkbox-jZTBCxw8.js";import"./Fieldset-qYMvMyEQ.js";import"./accordion-AmEIXahD.js";import"./index-DhbJ-5dM.js";import"./index-usx6n2XT.js";import"./index-DjE7Gi8L.js";import"./Box-DW-VY5Ou.js";import"./Bell-DKQrKKQp.js";import"./PersonChat-DMSAQzKb.js";import"./Eye-_M9N0P0a.js";import"./ProgressBar-B4r_dBNZ.js";import"./useLatestRef-CppwV8Wq.js";import"./ShieldLock-BaswfpSR.js";import"./PadlockLocked-C_LpCU8p.js";import"./EyeSlash-BwayUw2P.js";import"./CircleSlash-B342U9jj.js";import"./Pencil-q73ghBtx.js";import"./FullførStillingModal-TV5LruJB.js";import"./PersonbrukerTekst-mzNtqZ86.js";import"./ClockDashed-BclYe55A.js";import"./IkonNavnAvatar-Bdw_Xqhr.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-DM7ztcPq.js";import"./ErrorBoundary-C1uzv3iB.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
