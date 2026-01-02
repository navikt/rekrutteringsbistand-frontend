import{aq as I,J as w,j as t,R as k,S as j,cz as x,cI as b,cH as g,cA as u,O as y,c$ as _}from"./iframe-DTWfjzwK.js";import{w as m,c as D}from"./ContextDecorators-CR5LBCab.js";import{F as N,A as v}from"./FullførtStilling-C5B-Vh4w.js";import{R as T}from"./GjenåpneStillingKnapp-DNgAM8tn.js";import{T as A}from"./TilgangskontrollForInnhold-Eh9wPjIt.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-9j-nByJE.js";import"./OrganisasjonsnummerAlert-DfnnZe-v.js";import"./VStack-CgsrATa5.js";import"./BasePrimitive-DX-eT6RC.js";import"./List-zhRu0RbV.js";import"./Link-oXj3dChs.js";import"./KandidatHendelseTag-UtpQnf23.js";import"./Tag-C2vE6uVe.js";import"./ChatExclamationmark-BF8UDRml.js";import"./FileXMark-DE2jpYqu.js";import"./Trash-C5fcFxY8.js";import"./HandShakeHeart-A_sscZWx.js";import"./Calendar-CISQ762P.js";import"./ThumbUp-BsT8VM0L.js";import"./ExclamationmarkTriangle-DxdM0ej0.js";import"./Table-ChAt4vgz.js";import"./index-CWG33-hS.js";import"./index-B40KJ5b4.js";import"./util-DERHMG49.js";import"./DatoVelger-BTV_9xqw.js";import"./useDatepicker-DPMlpYdp.js";import"./useControllableState-Dgkk00OW.js";import"./Modal-BSa8CYsD.js";import"./floating-ui.react-BkZ-r5Fb.js";import"./Date.Input-D2qZQohQ.js";import"./useFormField-BCrrrB5u.js";import"./ChevronDown-CUL-96TG.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BA3EwM4r.js";import"./Modal.context-CC0zqPZ_.js";import"./Popover-CXvi6a9y.js";import"./DismissableLayer-Ee6nghZx.js";import"./startOfMonth-CgpRB7hT.js";import"./Select-ChVByL2b.js";import"./endOfMonth-C8bUAQN0.js";import"./ArrowLeft-BWeRNsJz.js";import"./ArrowRight-BppKIWNb.js";import"./isSameDay-5aNDI2Tq.js";import"./Checkbox-C0EJUuz5.js";import"./Fieldset-HwlstN03.js";import"./accordion-CZB21azX.js";import"./index-DdiOfBQV.js";import"./index-DCsGedTe.js";import"./index-XrsIR5aN.js";import"./Box-C5XCdQTp.js";import"./Bell-CixnG5fu.js";import"./PersonChat-sAFYVqXE.js";import"./Eye-BozTjU4c.js";import"./ProgressBar-a9r2dqjc.js";import"./useLatestRef-CoB66Ct7.js";import"./ShieldLock-BtqgxpJ1.js";import"./PadlockLocked-T7QDMTwF.js";import"./EyeSlash-8cPgca-W.js";import"./CircleSlash-D74EwBnN.js";import"./Pencil-Bd9Nxbvs.js";import"./FullførStillingModal-idYDZtWH.js";import"./PersonbrukerTekst-iT2P6Dbz.js";import"./ClockDashed-CHr-nsmh.js";import"./IkonNavnAvatar-C7Ou4a7G.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-d4Gvyt_T.js";import"./ErrorBoundary-CnVh3vKP.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Xt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
